from flask import Flask, request, jsonify
from database import db_connection  # Aqui você importará a função de conexão com o banco de dados
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir CORS para acessar a API de qualquer origem

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')  # Agora estamos esperando email no campo "username"
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    # Conectando ao banco de dados
    conn = db_connection()
    if conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, name, username, email FROM users WHERE email = %s AND password = %s",  # Alterado para usar email
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

if __name__ == '__main__':
    app.run(debug=True)
