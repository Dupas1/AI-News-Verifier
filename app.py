from flask import Flask, request, jsonify
from dotenv import load_dotenv
from database import db_connection
from psycopg2.extras import DictCursor
import psycopg2
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    conn = db_connection()
    cur = conn.cursor(cursor_factory=DictCursor)

    query = (
        
        '''
        SELECT username, password
        FROM users

        '''
    )
    cur.execute(query,(username))
    user = cur.fetchone()

    if user and user['password'] == password:

        return jsonify({"message": "Login bem-sucedido", "status": 'success'})
    else:
        return jsonify({"message": "Nome de usuário ou senha inválidos", "status": 'error'})


if __name__ =='__main__':
    app.run(debug=True, host="0.0.0.0")