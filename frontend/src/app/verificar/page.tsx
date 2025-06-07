// app/verificar/page.tsx
'use client';

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertTriangle, FileText, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react"; // <-- Importe useEffect
import { useRouter } from 'next/navigation'; // <-- Importe useRouter

export default function VerificarPage() {
  const router = useRouter(); // Inicialize o useRouter
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState<null | { success: boolean; message: string; classificacao?: string }>(null);
  const [userId, setUserId] = useState<string | null>(null); // Estado para armazenar o userId
  const [history, setHistory] = useState<any[]>([]); // Estado para o histórico
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Novo estado para verificar se é ambiente de cliente

  // === Adicionado: Redirecionar se não estiver logado ao carregar a página ===
  useEffect(() => {
    setIsClient(true); // Marca que o código está rodando no cliente
    if (typeof window !== 'undefined') { // Garante que estamos no navegador
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        // Se não há userId, redireciona para a página de login
        router.push('/login');
      }
    }
  }, [router]); // Dependência em router para garantir que o redirecionamento funcione

  // Função para buscar o histórico (já tínhamos, mas revisado com useEffect)
  const fetchHistory = async () => {
    if (!userId) {
      setHistoryError("ID de usuário não disponível para buscar histórico.");
      return;
    }

    setLoadingHistory(true);
    setHistoryError(null);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/v1/history/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Opcional: Para cenários mais seguros, você enviaria um token de autenticação aqui
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.details || "Erro ao carregar histórico.");
      }

      const data = await res.json();
      setHistory(data.history);
    } catch (err: any) {
      console.error("Erro ao carregar histórico:", err);
      setHistoryError(err.message || "Não foi possível carregar o histórico.");
    } finally {
      setLoadingHistory(false);
    }
  };

  // Chama fetchHistory quando o componente monta E o userId se torna disponível
  useEffect(() => {
    if (userId && isClient) { // Só busca histórico se userId e estiver no cliente
      fetchHistory();
    }
  }, [userId, isClient]); // Dependência em userId e isClient

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      // Se o usuário não está logado, alertar e talvez redirecionar
      alert("Você precisa estar logado para verificar e salvar seu histórico.");
      router.push('/login'); // Redireciona para login
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, userId }), // Enviando userId com a requisição
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.details || errorData.error || errorData.message || "Erro desconhecido ao verificar a notícia.";
        throw new Error(errorMessage);
      }

      const data = await res.json();
      setResponse({ success: true, ...data });
      fetchHistory(); // Recarrega o histórico após uma nova pesquisa
    } catch (error: any) {
      console.error("Erro ao verificar a notícia:", error);
      setResponse({ success: false, message: error.message || "Ocorreu um erro inesperado." });
    }
  };

  const renderResultado = () => {
    if (!response) return null;
    // ... (restante do código renderResultado) ...
    if (!response.success) {
      return (
        <div className="mt-6 text-red-600 border border-red-200 bg-red-50 rounded p-4">
          <XCircle className="inline-block mr-2" />
          <strong>Erro:</strong> {response.message}
        </div>
      );
    }

    return (
      <div className="mt-6 border border-gray-200 bg-gray-50 rounded p-4">
        <h2 className="text-xl font-bold mb-2">Resultado da Verificação</h2>
        <div
          className={`text-lg font-semibold ${
            response.classificacao === "fake" ? "text-red-600" :
            response.classificacao === "real" ? "text-green-600" :
            "text-gray-600"
          }`}
        >
          {response.classificacao === "fake" && <>🚨 Notícia possivelmente <strong>FALSA</strong>.</>}
          {response.classificacao === "real" && <>✅ Notícia aparentemente <strong>VERDADEIRA</strong>.</>}
          {response.classificacao === "indefinido" && <>❓ Resultado <strong>inconclusivo</strong>.</>}
        </div>
        <p className="mt-2 text-gray-600">{response.message}</p>
      </div>
    );
  };

  const renderHistory = () => {
    if (!userId) { // Se não tem userId, não mostra o histórico ainda
      return (
        <div className="mt-8 text-gray-600">
          <p>Faça login para ver seu histórico de pesquisas.</p>
        </div>
      );
    }

    if (loadingHistory) {
      return (
        <div className="mt-8 text-gray-600">
          <p>Carregando histórico...</p>
        </div>
      );
    }

    if (historyError) {
      return (
        <div className="mt-8 text-red-600">
          <p>Erro ao carregar histórico: {historyError}</p>
        </div>
      );
    }

    if (history.length === 0) {
      return (
        <div className="mt-8 text-gray-600">
          <p>Nenhum histórico de pesquisa encontrado.</p>
        </div>
      );
    }

    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Seu Histórico de Pesquisas</h2>
        <div className="space-y-4">
          {history.map((item, index) => (
            <Card key={index} className="p-4">
              <p className="text-gray-800 font-semibold">{item.query}</p>
              <p className={`text-sm ${
                item.classification === "fake" ? "text-red-500" :
                item.classification === "real" ? "text-green-500" :
                "text-gray-500"
              }`}>
                Classificação: {item.classification.toUpperCase()}
              </p>
              <p className="text-xs text-gray-500">
                Data: {new Date(item.date).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">Verificar Notícia</h1>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Utilize nossa tecnologia de inteligência artificial para verificar a autenticidade e confiabilidade de
            notícias.
          </p>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-8 text-lg font-medium">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Verificação por Texto</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="news-title" className="text-base">
                      Título da Notícia
                    </Label>
                    <Input
                      id="news-title"
                      placeholder="Digite o título da notícia"
                      className="w-full mt-1"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-800">
                      Nossa análise é baseada em algoritmos de IA e pode não ser 100% precisa. Sempre verifique
                      informações importantes em múltiplas fontes confiáveis.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
                  Verificar Agora
                </Button>
              </form>

              {renderResultado()}

              {/* === Adicionado: Exibir Histórico === */}
              {isClient && renderHistory()} {/* Renderiza o histórico apenas no cliente */}
              {/* ================================== */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}