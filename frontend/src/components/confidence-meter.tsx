import { cn } from "@/lib/utils"

// Interface para as propriedades do componente
interface ConfidenceMeterProps {
  // Valor de confiança (0-100)
  value: number
  // Tamanho do medidor (small, medium, large)
  size?: "sm" | "md" | "lg"
  // Exibir o valor numérico
  showValue?: boolean
  // Exibir o rótulo
  showLabel?: boolean
  // Classe CSS adicional
  className?: string
}

export default function ConfidenceMeter({
  value,
  size = "md",
  showValue = true,
  showLabel = true,
  className,
}: ConfidenceMeterProps) {
  // Garantir que o valor esteja entre 0 e 100
  const safeValue = Math.max(0, Math.min(100, value))

  // Determinar a cor com base no valor
  const getColor = () => {
    if (safeValue < 33) return "bg-red-500"
    if (safeValue < 66) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Determinar o texto do nível de confiança
  const getConfidenceText = () => {
    if (safeValue < 33) return "Baixa Confiabilidade"
    if (safeValue < 66) return "Média Confiabilidade"
    return "Alta Confiabilidade"
  }

  // Determinar a altura do medidor com base no tamanho
  const getHeight = () => {
    switch (size) {
      case "sm":
        return "h-2"
      case "lg":
        return "h-6"
      default:
        return "h-4"
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Rótulo do medidor */}
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Nível de Confiança</span>
          {showValue && <span className="text-sm font-medium text-gray-700">{safeValue}%</span>}
        </div>
      )}

      {/* Barra de progresso */}
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", getHeight())}>
        <div
          className={cn("rounded-full transition-all duration-500", getColor(), getHeight())}
          style={{ width: `${safeValue}%` }}
        ></div>
      </div>

      {/* Texto do nível de confiança */}
      {showLabel && <p className="mt-1 text-sm text-gray-600">{getConfidenceText()}</p>}
    </div>
  )
}
