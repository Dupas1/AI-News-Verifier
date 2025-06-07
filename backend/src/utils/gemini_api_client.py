# backend/src/utils/gemini_api_client.py
import requests
import json
import os # Importar os para pegar a API_KEY do .env

class GeminiAPIClient:
    def __init__(self):
        # A API_KEY será carregada do .env via os.getenv
        self.api_key = os.getenv("GOOGLE_API_KEY")
        self.api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={self.api_key}"

    def evaluate_news(self, text_news):
        headers = {"Content-Type": "application/json"}
        prompt = (
            "Analise esta notícia e responda somente com 'fake' ou 'real', "
            "sem explicações adicionais. Use informações atualizadas da web para sua análise:\n\n"
            f"Notícia: {text_news}\n\nResposta:"
        )
        payload = {
            "contents": [
                {"parts": [{"text": prompt}]}
            ],
            "tools": [{"googleSearch": {}}]
        }

        try:
            response = requests.post(self.api_url, headers=headers, data=json.dumps(payload))
            response.raise_for_status()
            response_json = response.json()

            if 'candidates' in response_json and len(response_json['candidates']) > 0 and \
               'content' in response_json['candidates'][0] and \
               'parts' in response_json['candidates'][0]['content'] and \
               len(response_json['candidates'][0]['content']['parts']) > 0:
                response_text = response_json['candidates'][0]['content']['parts'][0]['text'].strip().lower()
                if "fake" in response_text:
                    return "fake"
                elif "real" in response_text:
                    return "real"
                else:
                    return "indefinido"
            else:
                raise Exception(f"Estrutura de resposta inesperada da API Gemini: {response_json}")

        except requests.exceptions.HTTPError as e:
            raise Exception(f"Erro HTTP da API Gemini ({e.response.status_code}): {e.response.text}")
        except requests.exceptions.RequestException as e:
            raise Exception(f"Erro ao se comunicar com a API Gemini: {e}")
        except json.JSONDecodeError as e:
            raise Exception(f"Erro ao decodificar JSON da resposta da API Gemini: {e}. Resposta bruta: {response.text if 'response' in locals() else 'N/A'}")
        except Exception as e:
            raise Exception(f"Erro inesperado ao avaliar notícia: {e}")