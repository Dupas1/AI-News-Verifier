from transformers import pipeline
import requests
from bs4 import BeautifulSoup

def extrair_texto_da_noticia(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Aqui você ajustaria para pegar o conteúdo principal da notícia
    # Exemplo: pegar o texto de todos os parágrafos da página
    parrafos = soup.find_all('p')
    texto = " ".join([p.get_text() for p in parrafos])
    return texto

# Carregar o modelo de detecção de Fake News do Hugging Face
model = pipeline('text-classification', model='mohammadpourfarid/fake-news-detection', tokenizer='mohammadpourfarid/fake-news-detection')

def verificar_fake_news(url):
    # Extrair o texto real da URL
    noticia_texto = extrair_texto_da_noticia(url)
    
    # Usar o modelo para classificar se a notícia é falsa ou não
    resultado = model(noticia_texto)
    
    if resultado[0]['label'] == 'FAKE':
        return True
    else:
        return False

# Exemplo de chamada para a função
print(verificar_fake_news("https://exemplo.com/noticia"))
