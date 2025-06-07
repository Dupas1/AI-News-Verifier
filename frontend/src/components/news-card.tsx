import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ConfidenceMeter from "@/components/confidence-meter"
import Link from "next/link"
import { Calendar, Globe, Share2 } from "lucide-react"

// Interface para as propriedades do componente
interface NewsCardProps {
  // Título da notícia
  title: string
  // Fonte da notícia
  source: string
  // Data da notícia
  date: string
  // Resumo da notícia
  summary: string
  // Nível de confiança (0-100)
  confidenceLevel: number
  // ID da notícia para link de detalhes
  id: string
}

export default function NewsCard({ title, source, date, summary, confidenceLevel, id }: NewsCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>{source}</span>
          </div>
          <div className="hidden sm:block text-gray-300">•</div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">{summary}</p>
        <ConfidenceMeter value={confidenceLevel} size="sm" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/resultado/${id}`}>
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
            Ver Detalhes
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
