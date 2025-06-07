# backend/src/api/auth_routes.py
from flask import Blueprint, request, jsonify
from src.services.user_service import UserService
from src.repositories.user_repository import UserRepository
from src.repositories.search_history_repository import SearchHistoryRepository
import traceback # Para log de erros detalhado

auth_bp = Blueprint('auth', __name__)

# Instanciação das dependências (Pode ser melhorado com um DI Container no futuro)
user_repo = UserRepository()
history_repo = SearchHistoryRepository()
user_service = UserService(user_repo, history_repo)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([name, username, email, password]):
        return jsonify({"error": "Todos os campos (nome, nome de usuário, email, senha) são obrigatórios"}), 400

    try:
        response, status_code = user_service.register_user(name, username, email, password)
        return jsonify(response), status_code
    except Exception as e:
        traceback.print_exc() # Loga o erro
        return jsonify({"error": "Erro ao registrar usuário", "details": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    try:
        response, status_code = user_service.login_user(email, password)
        return jsonify(response), status_code
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Erro interno do servidor ao tentar login", "details": str(e)}), 500