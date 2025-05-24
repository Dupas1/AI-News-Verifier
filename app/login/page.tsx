'use client';

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertTriangle, FileText, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function VerificarPage() {
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState<null | { success: boolean; message: string; classificacao?: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        // === MUDANÇA AQUI: Melhorando a extração da mensagem de erro ===
        const errorMessage = errorData.details || errorData.error || errorData.message || "Erro desconhecido ao verificar a notícia.";
        throw new Error(errorMessage);
      }

      const data = await res.json();
      setResponse({ success: true, ...data });
    } catch (error: any) {
      console.error("Erro ao verificar a notícia:", error);
      // Garante que 'error.message' exista para ser exibido
      setResponse({ success: false, message: error.message || "Ocorreu um erro inesperado." });
    }
  };

  const renderResultado = () => {
    if (!response) return null;

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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}