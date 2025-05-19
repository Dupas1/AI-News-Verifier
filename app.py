from flask import Flask, request, jsonify
from database import db_connection
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)  # Permitir CORS para acessar a API de qualquer origem

# === Configuração da API Gemini ===
API_KEY = "AIzaSyCDkz2P0VMO1O_3ovroxV-wHxcasiO0zUI"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

def avaliar_noticia_gemini(texto_noticia):
    headers = {
        "Content-Type": "application/json"
    }

    prompt = (
        "Analise esta notícia e responda somente com 'fake' ou 'real', "
        "sem explicações adicionais:\n\n"
        f"Notícia: {texto_noticia}\n\nResposta:"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    response = requests.post(API_URL, headers=headers, data=json.dumps(payload))

    if response.status_code == 200:
        resposta_json = response.json()
        resposta_texto = resposta_json['candidates'][0]['content']['parts'][0]['text'].strip().lower()

        if "fake" in resposta_texto:
            return "fake"
        elif "real" in resposta_texto:
            return "real"
        else:
            return "indefinido"
    else:
        raise Exception(f"Erro {response.status_code}: {response.text}")


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

    return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500


# === NOVA ROTA PARA VERIFICAR NOTÍCIA COM GEMINI ===
@app.route('/api/v1/verificar', methods=['POST'])
def verificar_noticia():
    data = request.get_json()
    title = data.get('title')

    if not title:
        return jsonify({"error": "O campo 'title' é obrigatório."}), 400

    try:
        resultado = avaliar_noticia_gemini(title)
        return jsonify({
            "message": f"A notícia foi classificada como: {resultado.upper()}",
            "classificacao": resultado
        }), 200
    except Exception as e:
        return jsonify({"error": "Erro ao verificar notícia com a IA", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
