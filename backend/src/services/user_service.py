# backend/src/services/user_service.py
from src.repositories.user_repository import UserRepository
from src.repositories.search_history_repository import SearchHistoryRepository
from src.utils.security import hash_password, check_password

class UserService:
    def __init__(self, user_repo: UserRepository, history_repo: SearchHistoryRepository):
        self.user_repo = user_repo
        self.history_repo = history_repo

    def register_user(self, name, username, email, password):
        existing_user = self.user_repo.get_by_email_or_username(email, username)
        if existing_user:
            # Retorna 409 Conflict se o email ou username já existirem
            return {"error": "Email ou nome de usuário já registrado"}, 409

        hashed_pw = hash_password(password)
        try:
            new_user_data = self.user_repo.create_user(name, username, email, hashed_pw)
            if new_user_data:
                return {
                    "message": "Registro bem-sucedido",
                    "user": {
                        "id": new_user_data[0],
                        "name": new_user_data[1],
                        "username": new_user_data[2],
                        "email": new_user_data[3]
                    }
                }, 201 # 201 Created para sucesso no registro
            else:
                # Caso o repositório retorne None por alguma razão não capturada
                return {"error": "Falha ao criar usuário. Tente novamente mais tarde."}, 500
        except Exception as e:
            # Captura exceções do repositório (ex: problemas de DB)
            return {"error": "Erro interno ao registrar usuário", "details": str(e)}, 500


    def login_user(self, email, password):
        user_data = self.user_repo.get_by_email(email)
        if user_data:
            stored_hashed_password = user_data[4] # A senha hashed está na 5ª coluna
            if check_password(password, stored_hashed_password):
                return {
                    "message": "Login bem-sucedido",
                    "user": {
                        "id": user_data[0],
                        "name": user_data[1],
                        "username": user_data[2],
                        "email": user_data[3]
                    }
                }, 200 # 200 OK para login bem-sucedido
            else:
                # Senha incorreta
                return {"error": "Credenciais inválidas"}, 401
        else:
            # Usuário não encontrado
            return {"error": "Credenciais inválidas"}, 401


    def get_user_profile(self, user_id):
        user_profile_data = self.user_repo.get_user_profile_data(user_id)
        if not user_profile_data:
            return {"error": "Usuário não encontrado"}, 404 # 404 Not Found

        # Busca o total de pesquisas para este usuário
        total_searches = self.history_repo.get_total_searches_by_user(user_id)

        user_profile = {
            "id": user_profile_data[0],
            "name": user_profile_data[1],
            "username": user_profile_data[2],
            "email": user_profile_data[3],
            "total_searches": total_searches
        }
        return {"user": user_profile}, 200 # 200 OK para sucesso