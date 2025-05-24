from flask import Flask, request, jsonify
from database import db_connection # Assumindo que 'database.py' e 'db_connection' existem
from flask_cors import CORS
import requests
import json
import traceback # Importação adicionada para rastreamento de pilha

app = Flask(__name__)
CORS(app)  # Permitir CORS para acessar a API de qualquer origem

# === Configuração da API Gemini ===
# É crucial que sua chave de API seja mantida segura e não exposta em código de produção.
# Considere usar variáveis de ambiente para armazenar chaves de API.
API_KEY = "AIzaSyCDkz2P0VMO1O_3ovroxV-wHxcasiO0zUI"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

def avaliar_noticia_gemini(texto_noticia):
    headers = {
        "Content-Type": "application/json"
    }

    prompt = (
        "Analise esta notícia e responda somente com 'fake' ou 'real', "
        "sem explicações adicionais. Use informações atualizadas da web para sua análise:\n\n"
        f"Notícia: {texto_noticia}\n\nResposta:"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        # === Adicionando Grounding com Google Search ===
        # CORRIGIDO: de "googleSearchRetrieval" para "googleSearch"
        "tools": [
            {
                "googleSearch": {} 
            }
        ]
    }

    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
        response.raise_for_status() # Lança uma exceção para erros HTTP (4xx ou 5xx)

        resposta_json = response.json()
        
        # Verificando se a estrutura da resposta é a esperada
        if 'candidates' in resposta_json and len(resposta_json['candidates']) > 0 and \
           'content' in resposta_json['candidates'][0] and \
           'parts' in resposta_json['candidates'][0]['content'] and \
           len(resposta_json['candidates'][0]['content']['parts']) > 0:
            
            resposta_texto = resposta_json['candidates'][0]['content']['parts'][0]['text'].strip().lower()

            if "fake" in resposta_texto:
                return "fake"
            elif "real" in resposta_texto:
                return "real"
            else:
                return "indefinido"
        else:
            print(f"Estrutura de resposta inesperada da API Gemini: {resposta_json}")
            raise Exception(f"Estrutura de resposta inesperada da API Gemini: {resposta_json}") # Levanta exceção aqui
            
    except requests.exceptions.HTTPError as e: # Captura erros HTTP específicos da Gemini API
        error_message = f"Erro HTTP da API Gemini ({e.response.status_code}): {e.response.text}"
        print(error_message)
        raise Exception(error_message)
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API Gemini: {e}")
        raise Exception(f"Erro ao se comunicar com a API Gemini: {e}")
    except json.JSONDecodeError as e:
        # Se a Gemini API retornar algo que não é JSON
        error_message = f"Erro ao decodificar JSON da resposta da API Gemini: {e}. Resposta bruta: {response.text if 'response' in locals() else 'N/A'}"
        print(error_message)
        raise Exception(error_message)
    except Exception as e:
        print(f"Erro inesperado ao avaliar notícia: {e}")
        raise Exception(f"Erro inesperado ao avaliar notícia: {e}")


# === ROTA PARA LOGIN EXISTENTE ===
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    conn = db_connection()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT id, name, username, email FROM users WHERE email = %s AND password = %s",
                (email, password)
            )
            user = cursor.fetchone()
            conn.close()

            if user:
                return jsonify({
                    "message": "Login bem-sucedido",
                    "user": {
                        "id": user[0],
                        "name": user[1],
                        "username": user[2],
                        "email": user[3]
                    }
                }), 200
            else:
                return jsonify({"error": "Credenciais inválidas"}), 401
        except Exception as e:
            conn.close()
            print(f"Erro ao consultar o banco de dados para login: {e}")
            return jsonify({"error": "Erro interno do servidor ao tentar login"}), 500
    return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500


# === NOVA ROTA PARA VERIFICAR NOTÍCIA COM GEMINI ===
@app.route('/api/v1/verificar', methods=['POST'])
def verificar_noticia():
    data = request.get_json()
    title = data.get('title')

    if not title:
        print("Erro: O campo 'title' é obrigatório.") # Loga a falta do título no servidor
        return jsonify({"error": "O campo 'title' é obrigatório."}), 400

    try:
        resultado = avaliar_noticia_gemini(title)
        return jsonify({
            "message": f"A notícia foi classificada como: {resultado.upper()}",
            "classificacao": resultado
        }), 200
    except Exception as e:
        # Loga o rastreamento de pilha completo para depuração no servidor
        traceback.print_exc()
        error_response = {
            "error": "Erro ao verificar notícia com a IA",
            "details": str(e) # Detalhes da exceção para o frontend
        }
        # Loga a resposta de erro exata que está sendo enviada ao cliente
        print(f"Retornando erro ao cliente: {json.dumps(error_response)}") 
        return jsonify(error_response), 500


if __name__ == '__main__':
    app.run(debug=True)