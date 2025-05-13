from flask import Flask, request, jsonify
from database import db_connection  # Aqui você importará a função de conexão com o banco de dados
from noticia import verificar_fake_news

app = Flask(__name__)

@app.route('/verificar', methods=['POST'])
def verificar_noticia():
    # Pegando a URL da notícia passada no corpo da requisição
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL não fornecida"}), 400

    # Verifica se a URL já está na base de dados
    conn = db_connection()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM noticia WHERE url = %s", (url,))
        noticia = cursor.fetchone()

        if noticia:
            # Caso já exista, retorna o resultado da verificação
            return jsonify({
                "url": noticia[1],
                "is_fake": noticia[2]
            }), 200

        # Se não existir, faz a verificação de fake news (Aqui você coloca a sua IA)
        is_fake = verificar_fake_news(url)  # Função de verificação que você irá definir

        # Insere o resultado na base de dados
        cursor.execute(
            "INSERT INTO noticia (url, is_fake) VALUES (%s, %s)",
            (url, is_fake)
        )
        conn.commit()
        conn.close()

        return jsonify({
            "url": url,
            "is_fake": is_fake
        }), 201

    return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

def verificar_fake_news(url):
    # Aqui você implementa a lógica para verificar se a notícia é falsa.
    # Pode ser com um modelo de IA ou uma API externa. Por exemplo:
    # Se você tiver uma lógica de IA, ela deve ser aplicada aqui.
    # Vamos simular com uma simples verificação.
    
    if "fake" in url.lower():
        return True
    else:
        return False

if __name__ == '__main__':
    app.run(debug=True)
