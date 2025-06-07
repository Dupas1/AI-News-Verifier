# backend/app.py
from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv # Importar para carregar o .env
from pathlib import Path

# Carregar as variáveis de ambiente do .env na raiz do backend
load_dotenv(dotenv_path=Path(__file__).resolve().parent / '.env')

# Importa os blueprints
from src.api.auth_routes import auth_bp
from src.api.news_routes import news_bp
from src.api.profile_routes import profile_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Registro dos Blueprints
    # Use um prefixo para cada grupo de rotas se desejar, ex: /auth, /api/v1
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(news_bp, url_prefix='/api/v1') # /api/v1/verificar, /api/v1/history
    app.register_blueprint(profile_bp, url_prefix='/api/v1') # /api/v1/profile

    return app

if __name__ == '__main__':
    app = create_app()
    # Porta padrão para o Flask é 5000. Seu frontend espera 8000.
    # Ajuste o .env do backend com FLASK_PORT=8000 ou configure o frontend para 5000.
    # Exemplo: app.run(debug=os.getenv('DEBUG', 'true').lower() == 'true', port=os.getenv('FLASK_PORT', 5000))
    # Se você usa 8000, coloque FLASK_PORT=8000 no backend/.env
    app.run(debug=os.getenv('DEBUG', 'True').lower() == 'true', port=int(os.getenv('FLASK_PORT', 5000)))