# backend/src/repositories/search_history_repository.py
from src.database import db_connection

class SearchHistoryRepository:
    def add_search_entry(self, user_id, search_query, classification):
        conn = db_connection()
        if not conn: return False
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO search_history (user_id, search_query, classification) VALUES (%s, %s, %s)",
                (user_id, search_query, classification)
            )
            conn.commit()
            return True
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()

    def get_history_by_user(self, user_id):
        conn = db_connection()
        if not conn: return []
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT search_query, classification, search_date FROM search_history WHERE user_id = %s ORDER BY search_date DESC",
                (user_id,)
            )
            return cursor.fetchall()
        finally:
            conn.close()

    # Adicione este método para buscar o total de pesquisas por usuário, usado no perfil
    def get_total_searches_by_user(self, user_id):
        conn = db_connection()
        if not conn: return 0
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT COUNT(*) FROM search_history WHERE user_id = %s",
                (user_id,)
            )
            return cursor.fetchone()[0]
        finally:
            conn.close()