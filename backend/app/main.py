import requests
from fastapi import FastAPI, HTTPException
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

# Rota para verificar a notícia usando a API do Google
@app.post("/api/v1/verificar")
def verificar_noticia(request: NewsVerificationRequest):
    # Verificar se o título foi enviado
    if not request.title:
        raise HTTPException(status_code=400, detail="O título é obrigatório.")

    # Configurações da API do Google
    GOOGLE_API_KEY = "AIzaSyBugox9DEdXBud0sNeaXvC4szYp9QjS-Vc"
    GOOGLE_CSE_ID = "e300f1aad2deb48c2"
    GOOGLE_API_URL = "https://www.googleapis.com/customsearch/v1"

    # Fazer a requisição para a API do Google
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": request.title,  # Título da notícia como termo de busca
    }

    try:
        response = requests.get(GOOGLE_API_URL, params=params)
        response.raise_for_status()  # Levantar exceção para erros HTTP
        data = response.json()

        # Retornar os resultados da busca
        return {
            "title": request.title,
            "results": data.get("items", []),  # Lista de resultados da busca
            "message": "Busca realizada com sucesso.",
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados no Google: {str(e)}")

# Incluindo o roteador existente
@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API!"}