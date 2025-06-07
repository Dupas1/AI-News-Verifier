// app/history/page.tsx
'use client';

import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { XCircle } from "lucide-react"; // Para exibir erros, se necessário

export default function HistoryPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Para verificar ambiente de cliente

  // Redireciona se não estiver logado
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  // Função para buscar o histórico
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

  // Chama fetchHistory quando userId se torna disponível e está no cliente
  useEffect(() => {
    if (userId && isClient) {
      fetchHistory();
    }
  }, [userId, isClient]); // Dependência em userId e isClient

  // Renderiza o histórico (lógica copiada da VerificarPage)
  const renderHistory = () => {
    if (!userId) {
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
        <div className="mt-8 text-red-600 border border-red-200 bg-red-50 rounded p-4">
          <XCircle className="inline-block mr-2" />
          <strong>Erro:</strong> {historyError}
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

  // Se não estiver no cliente, não renderiza o conteúdo para evitar erros de SSR
  if (!isClient) {
    return (
      <Navbar />
    );
  }

  return (
    <>
      <Navbar /> {/* <-- Removido isLoggedIn={!!userId} */}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">Histórico de Pesquisas</h1>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Aqui você pode ver todas as notícias que você verificou.
          </p>
          {renderHistory()}
        </div>
      </div>
    </>
  );
}