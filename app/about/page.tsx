import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Brain, CheckCircle, Database, FileText, Globe, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nossa Missão</h1>
            <p className="text-xl mb-8">
              Combater a desinformação e promover o acesso a informações confiáveis através da tecnologia e educação.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Sobre o AI News Verifier</h2>
            <p className="text-lg text-gray-700 mb-6">
              O AI News Verifier nasceu da necessidade de combater a crescente onda de desinformação que afeta nossa
              sociedade. Utilizando tecnologia de ponta em inteligência artificial, desenvolvemos uma plataforma que
              permite verificar a autenticidade e confiabilidade de notícias de forma rápida e acessível.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Nossa equipe é composta por especialistas em tecnologia, jornalismo e ciência de dados, unidos pelo
              objetivo comum de promover o acesso à informação de qualidade e fortalecer o pensamento crítico.
            </p>
            <div className="flex justify-center mb-12">
              <Link href="/verificar">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Experimentar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Análise de Conteúdo</h3>
                <p className="text-gray-600">
                  Nossa IA analisa o texto da notícia, identificando afirmações verificáveis e padrões linguísticos
                  associados a desinformação.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Verificação de Fontes</h3>
                <p className="text-gray-600">
                  Comparamos as informações com um extenso banco de dados de fatos verificados e avaliamos a
                  credibilidade das fontes citadas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Resultado Detalhado</h3>
                <p className="text-gray-600">
                  Fornecemos um relatório completo com índice de confiança, verificações específicas e explicações
                  detalhadas sobre a análise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa Tecnologia Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa Tecnologia</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Brain className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Inteligência Artificial Avançada</h3>
                  <p className="text-gray-700">
                    Utilizamos modelos de linguagem de última geração, treinados com milhões de exemplos de notícias
                    verificadas e falsas para identificar padrões sutis de desinformação.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Globe className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Banco de Dados Global</h3>
                  <p className="text-gray-700">
                    Mantemos um banco de dados constantemente atualizado com informações verificadas de fontes
                    confiáveis em todo o mundo, permitindo verificações rápidas e precisas.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Shield className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Segurança e Privacidade</h3>
                  <p className="text-gray-700">
                    Priorizamos a segurança dos dados e a privacidade dos usuários. Não armazenamos informações pessoais
                    desnecessárias e utilizamos criptografia avançada em todas as etapas do processo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
