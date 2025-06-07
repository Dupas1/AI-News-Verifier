# backend/src/repositories/user_repository.py
from src.database import db_connection

class UserRepository:
    def get_by_email_or_username(self, email, username):
        conn = db_connection()
        if not conn: return None
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT id, name, username, email, password FROM users WHERE email = %s OR username = %s", (email, username))
            return cursor.fetchone()
        finally:
            conn.close()

    def get_by_email(self, email):
        conn = db_connection()
        if not conn: return None
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT id, name, username, email, password FROM users WHERE email = %s", (email,))
            return cursor.fetchone()
        finally:
            conn.close()

    # ESTA É A ÚNICA E CORRETA DEFINIÇÃO DE create_user
    def create_user(self, name, username, email, hashed_password): # <-- O parâmetro correto é hashed_password
        conn = db_connection()
        if not conn: return None
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (name, username, email, password) VALUES (%s, %s, %s, %s) RETURNING id, name, username, email",
                (name, username, email, hashed_password) # <-- Use o parâmetro 'hashed_password' que vem do serviço
            )
            new_user = cursor.fetchone()
            conn.commit()
            return new_user
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()

    def get_user_profile_data(self, user_id):
        conn = db_connection()
        if not conn: return None
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT id, name, username, email FROM users WHERE id = %s", (user_id,))
            return cursor.fetchone()
        finally:
            conn.close()