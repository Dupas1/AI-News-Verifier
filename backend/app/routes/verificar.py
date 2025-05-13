from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import subprocess
import json

router = APIRouter()

class Noticia(BaseModel):
    title: str

@router.post("/verificar_llama")
async def verificar_noticia_llama(noticia: Noticia):
    try:
        prompt = (
            f"Avalie a veracidade da seguinte manchete de notícia brasileira:\n\n"
            f"\"{noticia.title}\"\n\n"
            "Responda com 'Verdadeira', 'Falsa' ou 'Não é possível determinar' e explique brevemente o motivo."
        )

        # Envia para o modelo llama3 via CLI do Ollama
        process = subprocess.run(
            ["ollama", "run", "llama3", prompt],
            capture_output=True,
            text=True,
            timeout=60  # adiciona limite de tempo
        )

        resposta = process.stdout.strip()

        if not resposta:
            raise HTTPException(status_code=500, detail="O modelo não retornou nenhuma resposta.")

        return {
            "success": True,
            "title": noticia.title,
            "analise": resposta
        }

    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="Tempo de resposta do modelo excedido.")
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao chamar o modelo: {e.stderr}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro inesperado: {str(e)}")