# backend/src/services/news_service.py
from src.utils.gemini_api_client import GeminiAPIClient
from src.repositories.search_history_repository import SearchHistoryRepository

class NewsService:
    def __init__(self, gemini_client: GeminiAPIClient, history_repo: SearchHistoryRepository):
        self.gemini_client = gemini_client
        self.history_repo = history_repo

    def evaluate_and_save_news(self, title, user_id):
        try:
            classification = self.gemini_client.evaluate_news(title)

            if user_id is not None:
                self.history_repo.add_search_entry(user_id, title, classification)

            return {
                "message": f"A notícia foi classificada como: {classification.upper()}",
                "classificacao": classification
            }, 200
        except Exception as e:
            # O traceback será tratado na camada de API
            raise Exception(f"Erro ao verificar notícia com a IA: {str(e)}")

    def get_user_search_history(self, user_id):
        records = self.history_repo.get_history_by_user(user_id)
        history = []
        for record in records:
            history.append({
                "query": record[0],
                "classification": record[1],
                "date": record[2].isoformat()
            })
        return {"history": history}, 200