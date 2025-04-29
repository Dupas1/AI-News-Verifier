import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react"

export default function Home() {
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
            <div className="space-y-4">
              <div>
                <label htmlFor="news-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título da Notícia
                </label>
                <Input id="news-title" placeholder="Digite o título da notícia" className="w-full" />
              </div>
              <div>
                <label htmlFor="news-content" className="block text-sm font-medium text-gray-700 mb-1">
                  Conteúdo da Notícia
                </label>
                <Textarea
                  id="news-content"
                  placeholder="Cole aqui o texto da notícia que deseja verificar"
                  className="w-full min-h-[150px]"
                />
              </div>
              <div>
                <label htmlFor="news-source" className="block text-sm font-medium text-gray-700 mb-1">
                  Fonte (opcional)
                </label>
                <Input
                  id="news-source"
                  placeholder="Digite a fonte da notícia (site, jornal, etc.)"
                  className="w-full"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">Verificar Agora</Button>
            </div>
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
  )
}
