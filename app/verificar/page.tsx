import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertTriangle, FileText } from "lucide-react"

export default function VerificarPage() {
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
              <form className="space-y-6">
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
                    <Input id="news-title" placeholder="Digite o título da notícia" className="w-full mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="news-content" className="text-base">
                      Conteúdo da Notícia
                    </Label>
                    <Textarea
                      id="news-content"
                      placeholder="Cole aqui o texto completo da notícia que deseja verificar"
                      className="w-full min-h-[200px] mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="news-source" className="text-base">
                      Fonte (opcional)
                    </Label>
                    <Input
                      id="news-source"
                      placeholder="Digite a fonte da notícia (site, jornal, etc.)"
                      className="w-full mt-1"
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
            </CardContent>
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Dicas para Verificação</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Para melhores resultados</CardTitle>
                  <CardDescription>Como obter uma análise mais precisa</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Forneça o texto completo da notícia, não apenas trechos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Inclua a fonte original, se possível</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Verifique se o texto está livre de erros de formatação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Inclua o título original da notícia para melhor contexto</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Limitações</CardTitle>
                  <CardDescription>O que nossa ferramenta não consegue fazer</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Verificar notícias muito recentes (menos de 1 hora)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Analisar conteúdo em idiomas não suportados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Verificar com 100% de precisão - sempre use múltiplas fontes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Analisar conteúdo satírico ou humorístico com precisão</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
