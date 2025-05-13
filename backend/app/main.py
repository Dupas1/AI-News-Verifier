from fastapi import FastAPI, HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configuração do middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],  # URLs do frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

# Modelo para os dados enviados pelo frontend
class NewsVerificationRequest(BaseModel):
    title: str  # Apenas o título é necessário

# Rota para verificar a notícia
@app.post("/api/v1/verificar")
def verificar_noticia(request: NewsVerificationRequest):
    # Verificar se o título foi enviado
    if not request.title:
        raise HTTPException(status_code=400, detail="O título é obrigatório.")

    # Exemplo de resposta simulada
    return {
        "title": request.title,
        "confidence": 85,  # Exemplo de nível de confiança
        "analysis": {
            "source_reliability": "Alta",
            "language_patterns": "Consistentes",
            "fact_check": "Nenhuma inconsistência encontrada",
        },
        "message": "Notícia analisada com sucesso."
    }

# Incluindo o roteador existente
@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API!"}