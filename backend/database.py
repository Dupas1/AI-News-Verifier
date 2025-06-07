import os
import psycopg2
from dotenv import load_dotenv
from pathlib import Path
load_dotenv(dotenv_path=Path(__file__).resolve().parent / '.env')


def db_connection():
     try:
        conn = psycopg2.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT'),
            #  options=f"-c search_path={os.getenv('DB_SCHEMA')}",
            client_encoding='UTF8'
        )
        return conn
     except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None
    
def test_connection():
    conn = db_connection()
    if conn:
        print("Conexão bem-sucedida!")
        try:
            # Realizando uma consulta simples para testar a conexão
            with conn.cursor() as cursor:
                cursor.execute("SELECT 1;")
                result = cursor.fetchone()
                if result:
                    print("Teste de consulta bem-sucedido! Resultado:", result)
        except Exception as e:
            print(f"Erro ao executar a consulta: {e}")
        finally:
            conn.close()
    else:
        print("Não foi possível estabelecer a conexão.")

# Testando a conexão
test_connection()