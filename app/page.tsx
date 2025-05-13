"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [title, setTitle] = useState(""); // Estado para o título da notícia
  const [response, setResponse] = useState<null | { message: string; [key: string]: any }>(null); // Estado para a resposta da API

  // Garantir que o componente seja renderizado apenas no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }), // Enviando apenas o título
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Erro ao verificar a notícia");
      }

      const data = await res.json();
      setResponse({ success: true, ...data });
    } catch (error: any) {
      console.error("Erro ao verificar a notícia:", error);
      setResponse({ success: false, message: error.message });
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Verifique a autenticidade das notícias com Inteligência Artificial
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Combata a desinformação com nossa tecnologia avançada que analisa e verifica a credibilidade de notícias
                em segundos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/verificar">
                  <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-medium">
                    Verificar Notícia
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 border border-white">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Image
                src="/robot-ai.png"
                alt="AI analisando notícias"
                width={500}
                height={500}
                className="animate-slide-up"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Verificação Rápida Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto verification-form">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Verificação Rápida</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="news-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título da Notícia
                </label>
                <Input
                  id="news-title"
                  placeholder="Digite o título da notícia"
                  className="w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} // Atualizando o estado do título
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
                Verificar Agora
              </Button>
            </form>

            {/* Exibindo a resposta da API */}
            {response && (
              <div className="mt-6">
                <h2 className="text-xl font-bold">Resultado:</h2>
                <pre
                  className={`bg-gray-100 p-4 rounded ${
                    response.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {JSON.stringify(response, null, 2)}
                </pre>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-500">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Submeta a Notícia</h3>
                <p className="text-gray-600">
                  Cole o texto da notícia que você deseja verificar em nossa plataforma. Nosso sistema aceita notícias
                  completas ou trechos específicos para análise.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-blue-500">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Análise Inteligente</h3>
                <p className="text-gray-600">
                  Nossa IA analisa o conteúdo, verifica fontes, identifica padrões linguísticos e compara com um banco
                  de dados de informações verificadas.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-blue-500">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Resultado Detalhado</h3>
                <p className="text-gray-600">
                  Receba um relatório completo sobre a credibilidade da notícia, com um índice de confiança e
                  explicações detalhadas sobre a análise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}