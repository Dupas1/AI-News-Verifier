from flask import Flask, request, jsonify
from database import db_connection
from flask_cors import CORS
import requests
import json
import traceback
import bcrypt # <-- Importação adicionada

app = Flask(__name__)
CORS(app)

# === Configuração da API Gemini ===
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
        "tools": [
            {
                "googleSearch": {}
            }
        ]
    }

    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
        response.raise_for_status()

        resposta_json = response.json()
        
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
            raise Exception(f"Estrutura de resposta inesperada da API Gemini: {resposta_json}")
            
    except requests.exceptions.HTTPError as e:
        error_message = f"Erro HTTP da API Gemini ({e.response.status_code}): {e.response.text}"
        print(error_message)
        raise Exception(error_message)
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição à API Gemini: {e}")
        raise Exception(f"Erro ao se comunicar com a API Gemini: {e}")
    except json.JSONDecodeError as e:
        error_message = f"Erro ao decodificar JSON da resposta da API Gemini: {e}. Resposta bruta: {response.text if 'response' in locals() else 'N/A'}"
        print(error_message)
        raise Exception(error_message)
    except Exception as e:
        print(f"Erro inesperado ao avaliar notícia: {e}")
        raise Exception(f"Erro inesperado ao avaliar notícia: {e}")


# === Funções auxiliares para hash e verificação de senha ===
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password, hashed_password):
    # Retorna True se a senha corresponde ao hash, False caso contrário
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


# === NOVA ROTA PARA REGISTRO DE NOVO USUÁRIO ===
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([name, username, email, password]):
        return jsonify({"error": "Todos os campos (nome, nome de usuário, email, senha) são obrigatórios"}), 400

    conn = db_connection()
    if conn:
        cursor = conn.cursor()
        try:
            # Verifica se o email ou username já existem
            cursor.execute("SELECT id FROM users WHERE email = %s OR username = %s", (email, username))
            if cursor.fetchone():
                conn.close()
                return jsonify({"error": "Email ou nome de usuário já registrado"}), 409 # Conflict

            hashed_pw = hash_password(password) # Faz o hash da senha!

            cursor.execute(
                "INSERT INTO users (name, username, email, password) VALUES (%s, %s, %s, %s) RETURNING id, name, username, email",
                (name, username, email, hashed_pw)
            )
            new_user = cursor.fetchone()
            conn.commit() # Confirma a transação
            conn.close()

            return jsonify({
                "message": "Registro bem-sucedido",
                "user": {
                    "id": new_user[0],
                    "name": new_user[1],
                    "username": new_user[2],
                    "email": new_user[3]
                }
            }), 201 # Created
        except Exception as e:
            if conn: conn.rollback() # Reverte em caso de erro
            if conn: conn.close()
            traceback.print_exc()
            return jsonify({"error": "Erro ao registrar usuário", "details": str(e)}), 500
    return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500


# === ROTA PARA LOGIN EXISTENTE (MODIFICADA) ===
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
            # Busque o usuário pelo email e obtenha a senha hashed
            cursor.execute(
                "SELECT id, name, username, email, password FROM users WHERE email = %s",
                (email,) # Apenas o email é usado para buscar
            )
            user_data = cursor.fetchone()
            conn.close()

            if user_data:
                stored_hashed_password = user_data[4] # A senha hashed está na 5ª coluna (id, name, username, email, password)
                # Verifique a senha
                if check_password(password, stored_hashed_password):
                    return jsonify({
                        "message": "Login bem-sucedido",
                        "user": {
                            "id": user_data[0],
                            "name": user_data[1],
                            "username": user_data[2],
                            "email": user_data[3]
                        }
                    }), 200
                else:
                    return jsonify({"error": "Credenciais inválidas"}), 401 # Senha incorreta
            else:
                return jsonify({"error": "Credenciais inválidas"}), 401 # Usuário não encontrado
        except Exception as e:
            if conn: conn.close()
            traceback.print_exc()
            print(f"Erro ao consultar o banco de dados para login: {e}")
            return jsonify({"error": "Erro interno do servidor ao tentar login", "details": str(e)}), 500
    return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

@app.route('/api/v1/profile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    conn = db_connection()
    if not conn:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    cursor = conn.cursor()
    try:
        # Busca informações do usuário
        cursor.execute(
            "SELECT id, name, username, email FROM users WHERE id = %s",
            (user_id,)
        )
        user_data = cursor.fetchone()

        if user_data:
            # === NOVO: Busca o total de pesquisas para este usuário ===
            cursor.execute(
                "SELECT COUNT(*) FROM search_history WHERE user_id = %s",
                (user_id,)
            )
            total_searches = cursor.fetchone()[0] # Pega o valor da contagem
            # ========================================================

            conn.close() # Fechar conexão após todas as consultas

            user_profile = {
                "id": user_data[0],
                "name": user_data[1],
                "username": user_data[2],
                "email": user_data[3],
                "total_searches": total_searches # Inclui o total de pesquisas
            }
            return jsonify({"user": user_profile}), 200
        else:
            conn.close()
            return jsonify({"error": "Usuário não encontrado"}), 404
    except Exception as e:
        if conn: conn.close()
        traceback.print_exc()
        return jsonify({"error": "Erro ao buscar perfil do usuário", "details": str(e)}), 500

# === ROTA PARA VERIFICAR NOTÍCIA COM GEMINI (MODIFICADA PARA SALVAR HISTÓRICO) ===
@app.route('/api/v1/verificar', methods=['POST'])
def verificar_noticia():
    data = request.get_json()
    title = data.get('title')
    user_id = data.get('userId') # <-- Pegamos o userId da requisição

    if not title:
        print("Erro: O campo 'title' é obrigatório.")
        return jsonify({"error": "O campo 'title' é obrigatório."}), 400

    conn = None # Inicializa conn fora do try para garantir que esteja acessível no finally

    try:
        resultado = avaliar_noticia_gemini(title)

        # === Registrar no histórico se userId for fornecido ===
        if user_id is not None:
            conn = db_connection() # Abre a conexão aqui
            if conn:
                cursor = conn.cursor()
                try:
                    # Inserir na tabela search_history (ajustado para o nome correto)
                    cursor.execute(
                        "INSERT INTO search_history (user_id, search_query, classification) VALUES (%s, %s, %s)",
                        (user_id, title, resultado)
                    )
                    conn.commit()
                except Exception as db_e:
                    if conn: conn.rollback()
                    print(f"Erro ao salvar histórico de pesquisa para user_id {user_id}: {db_e}")
                    traceback.print_exc() # Loga o erro do DB
                finally:
                    if conn: conn.close() # Fecha a conexão aqui
        # ======================================================

        return jsonify({
            "message": f"A notícia foi classificada como: {resultado.upper()}",
            "classificacao": resultado
        }), 200
    except Exception as e:
        traceback.print_exc()
        error_response = {
            "error": "Erro ao verificar notícia com a IA",
            "details": str(e)
        }
        print(f"Retornando erro ao cliente: {json.dumps(error_response)}")
        return jsonify(error_response), 500


# === NOVA ROTA PARA PEGAR O HISTÓRICO DE PESQUISAS DO USUÁRIO ===
@app.route('/api/v1/history/<int:user_id>', methods=['GET'])
def get_history(user_id):
    conn = db_connection()
    if not conn:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    cursor = conn.cursor()
    try:
        cursor.execute(
            "SELECT search_query, classification, search_date FROM search_history WHERE user_id = %s ORDER BY search_date DESC",
            (user_id,)
        )
        history_records = cursor.fetchall()
        conn.close()

        # Formatar os resultados para JSON
        history = []
        for record in history_records:
            history.append({
                "query": record[0],
                "classification": record[1],
                "date": record[2].isoformat() # Converte datetime para string ISO
            })

        return jsonify({"history": history}), 200
    except Exception as e:
        if conn: conn.close()
        traceback.print_exc()
        return jsonify({"error": "Erro ao buscar histórico de pesquisas", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)