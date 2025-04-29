import Navbar from "@/components/navbar"
import ConfidenceMeter from "@/components/confidence-meter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Flag,
  Globe,
  Share2,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react"
import Link from "next/link"

// Esta é uma página dinâmica que recebe um ID como parâmetro
export default function ResultadoPage({ params }: { params: { id: string } }) {
  // Em um cenário real, buscaríamos os dados do resultado com base no ID
  // Aqui estamos usando dados de exemplo
  const resultado = {
    id: params.id,
    title: "Título da notícia verificada",
    source: "Fonte da notícia",
    url: "https://exemplo.com/noticia",
    date: "Data da publicação",
    content: "Conteúdo da notícia que foi analisado pelo sistema.",
    confidenceLevel: 75,
    analysisDate: "Data e hora da análise",
    factChecks: [
      {
        claim: "Afirmação verificada 1",
        status: "verdadeiro",
        explanation: "Explicação da verificação.",
      },
      {
        claim: "Afirmação verificada 2",
        status: "parcial",
        explanation: "Explicação da verificação parcial.",
      },
    ],
    relatedSources: [
      {
        name: "Fonte relacionada 1",
        url: "https://exemplo.com/fonte1",
        reliability: "alta",
      },
      {
        name: "Fonte relacionada 2",
        url: "https://exemplo.com/fonte2",
        reliability: "média",
      },
    ],
  }

  // Função para renderizar o status de uma verificação
  const renderFactCheckStatus = (status: string) => {
    switch (status) {
      case "verdadeiro":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Verdadeiro</span>
          </Badge>
        )
      case "falso":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>Falso</span>
          </Badge>
        )
      case "parcial":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Parcialmente Verdadeiro</span>
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Inconclusivo</span>
          </Badge>
        )
    }
  }

  // Função para renderizar o nível de confiabilidade de uma fonte
  const renderReliabilityBadge = (reliability: string) => {
    switch (reliability) {
      case "alta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Alta Confiabilidade</Badge>
      case "média":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Média Confiabilidade</Badge>
      case "baixa":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Baixa Confiabilidade</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Confiabilidade Desconhecida</Badge>
    }
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/verificar" className="text-primary hover:underline flex items-center mb-4">
              ← Voltar para Verificação
            </Link>

            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold">{resultado.title}</h1>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-gray-600">
                      <Share2 className="h-4 w-4 mr-1" />
                      Compartilhar
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600">
                      <Flag className="h-4 w-4 mr-1" />
                      Reportar
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span>{resultado.source}</span>
                  </div>
                  <div className="hidden sm:block text-gray-300">•</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{resultado.date}</span>
                  </div>
                  {resultado.url && (
                    <>
                      <div className="hidden sm:block text-gray-300">•</div>
                      <a
                        href={resultado.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Ver fonte original</span>
                      </a>
                    </>
                  )}
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2">Conteúdo Analisado</h2>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-700">{resultado.content}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3">Resultado da Verificação</h2>
                  <div className="bg-blue-50 p-6 rounded-md border border-blue-100">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="md:w-1/3">
                        <ConfidenceMeter value={resultado.confidenceLevel} size="lg" />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="font-semibold text-gray-900 mb-2">Análise</h3>
                        <p className="text-gray-700 mb-4">
                          Esta notícia foi classificada com um alto nível de confiabilidade. A maioria das informações
                          pôde ser verificada em fontes confiáveis e o conteúdo apresenta consistência com os fatos
                          conhecidos.
                        </p>
                        <div className="text-sm text-gray-500">Análise realizada em: {resultado.analysisDate}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="verificacoes">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="verificacoes">Verificações</TabsTrigger>
                    <TabsTrigger value="fontes">Fontes Relacionadas</TabsTrigger>
                    <TabsTrigger value="metodologia">Metodologia</TabsTrigger>
                  </TabsList>

                  <TabsContent value="verificacoes" className="space-y-4">
                    {resultado.factChecks.map((check, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base font-medium">Afirmação</CardTitle>
                            {renderFactCheckStatus(check.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium mb-2">{check.claim}</p>
                          <p className="text-gray-600 text-sm">{check.explanation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="fontes" className="space-y-4">
                    {resultado.relatedSources.map((source, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base font-medium">{source.name}</CardTitle>
                            {renderReliabilityBadge(source.reliability)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Acessar fonte</span>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="metodologia">
                    <Card>
                      <CardHeader>
                        <CardTitle>Nossa Metodologia</CardTitle>
                        <CardDescription>Como realizamos a verificação de notícias</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>
                          O AI News Verifier utiliza uma combinação de técnicas de processamento de linguagem natural,
                          análise de fontes e verificação cruzada para avaliar a confiabilidade das notícias.
                        </p>
                        <div>
                          <h3 className="font-semibold mb-2">O processo inclui:</h3>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Análise do conteúdo textual e identificação de afirmações verificáveis</li>
                            <li>Verificação cruzada com fontes confiáveis e bancos de dados de fatos</li>
                            <li>Avaliação da credibilidade da fonte original</li>
                            <li>Detecção de padrões linguísticos associados a desinformação</li>
                            <li>Análise de contexto e consistência temporal</li>
                          </ul>
                        </div>
                        <p className="text-sm text-gray-500">
                          Nossa tecnologia está em constante evolução e aprendizado. Embora busquemos a maior precisão
                          possível, recomendamos sempre verificar informações importantes em múltiplas fontes
                          confiáveis.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold mb-4">Esta análise foi útil?</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Sim, foi útil</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4" />
                      <span>Não foi útil</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
