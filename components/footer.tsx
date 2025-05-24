import Link from "next/link"

export default function Footer() {
  // Ano atual para o copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  Nossa Missão
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  Tecnologia
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2 - Recursos */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/verificar" className="text-gray-600 hover:text-primary">
                  Verificar Notícia
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Legal */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/termos" className="text-gray-600 hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-600 hover:text-primary">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-primary">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Contato</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-primary">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <a href="mailto:contato@ainewsverifier.com" className="text-gray-600 hover:text-primary">
                  contato@ainewsverifier.com
                </a>
              </li>
              <li className="flex space-x-4 mt-4">
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>© {currentYear} AI News Verifier. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
