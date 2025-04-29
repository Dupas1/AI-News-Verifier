from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import ping

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],  # URL do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluindo o roteador existente
app.include_router(ping.router, prefix="/api/v1")

# Definindo a rota raiz
@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API!"}