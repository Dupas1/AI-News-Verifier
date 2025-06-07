# backend/src/api/news_routes.py
from flask import Blueprint, request, jsonify
from src.services.news_service import NewsService
from src.repositories.search_history_repository import SearchHistoryRepository
from src.utils.gemini_api_client import GeminiAPIClient
import traceback

news_bp = Blueprint('news', __name__)

# Instanciação das dependências
gemini_client = GeminiAPIClient()
history_repo = SearchHistoryRepository()
news_service = NewsService(gemini_client, history_repo)

@news_bp.route('/verificar', methods=['POST'])
def verificar_noticia():
    data = request.get_json()
    title = data.get('title')
    user_id = data.get('userId')

    if not title:
        return jsonify({"error": "O campo 'title' é obrigatório."}), 400

    try:
        response, status_code = news_service.evaluate_and_save_news(title, user_id)
        return jsonify(response), status_code
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Erro ao verificar notícia com a IA", "details": str(e)}), 500

@news_bp.route('/history/<int:user_id>', methods=['GET'])
def get_history(user_id):
    try:
        # Reutiliza o news_service para o histórico, já que ele tem acesso ao history_repo
        # Ou, se quiser mais purismo SRP, pode ter um HistoryService dedicado e importar aqui.
        response, status_code = news_service.get_user_search_history(user_id)
        return jsonify(response), status_code
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Erro ao buscar histórico de pesquisas", "details": str(e)}), 500