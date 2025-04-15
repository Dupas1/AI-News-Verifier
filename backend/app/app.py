from flask import Flask, request, jsonify
from dotenv import load_dotenv
from database import db_connection
from psycopg2.extras import DictCursor
import psycopg2


app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    conn = db_connection
    cur = conn.cursor(cursor_factory=DictCursor)

    query = (
        
        '''
        SELECT username, password
        FROM user

        '''
    )
    cur.execute(query,(username))
    user = cur.fetchone()

    if user and user['senha'] == password:

        return jsonify({"message": "Login bem-sucedido", "status": 'success'})
    else:
        return jsonify({"message": "Nome de usuário ou senha inválidos", "status": 'error'})


if __name__ =='__main__':
    app.run(debug=True, host="0.0.0.0")