# backend/src/api/profile_routes.py
from flask import Blueprint, request, jsonify
from src.services.user_service import UserService
from src.repositories.user_repository import UserRepository
from src.repositories.search_history_repository import SearchHistoryRepository
import traceback

profile_bp = Blueprint('profile', __name__)

# Instanciação das dependências
user_repo = UserRepository()
history_repo = SearchHistoryRepository()
user_service = UserService(user_repo, history_repo)

@profile_bp.route('/profile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    try:
        response, status_code = user_service.get_user_profile(user_id)
        return jsonify(response), status_code
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Erro ao buscar perfil do usuário", "details": str(e)}), 500