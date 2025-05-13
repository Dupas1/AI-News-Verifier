from flask import Flask, request, jsonify
from database import db_connection
from noticia import Noticia
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def check_fake_news(url):
    try:
        # Aqui você pode adicionar a lógica de IA ou chamar uma API de verificação de fake news
        # Para o exemplo, vamos fazer uma simples verificação:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Exemplo simples de verificação: verificar se a palavra "fake" está na página
        if "fake" in soup.get_text().lower():
            return True  # Considera como fake
        return False  # Considera como verdadeira
    except Exception as e:
        return False  # Se houver erro, assume que não é fake

@app.route('/verificar', methods=['POST'])
def verificar_noticia():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'URL não fornecida!'}), 400

    # Verificar se a notícia é falsa ou não
    is_fake = check_fake_news(url)

    # Salvar no banco de dados
    noticia = Noticia(id=None, url=url, is_fake=is_fake)
    noticia.save()

    # Resposta para o usuário
    return jsonify({'url': url, 'is_fake': is_fake}), 200

if __name__ == '__main__':
    app.run(debug=True)
