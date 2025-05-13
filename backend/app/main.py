from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import sys
from routes import verificar

# Carrega variáveis do .env
root_path = Path(__file__).resolve()
while root_path.name != "AI-News-Verifier":
    root_path = root_path.parent
load_dotenv(dotenv_path=root_path / ".env")

# Adiciona o diretório atual ao sys.path
sys.path.append(str(Path(__file__).resolve().parent))

# Instancia o FastAPI
app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui as rotas do módulo "verificar"
app.include_router(verificar.router, prefix="/api/v1")

# Rota base de teste
@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API!"}
