"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

// Interface para as propriedades do componente
interface NavbarProps {
  // Indica se o usuário está logado
  isLoggedIn?: boolean
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  // Estado para controlar a visibilidade do menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Função para alternar a visibilidade do menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo e nome do aplicativo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="AI News Verifier Logo" width={40} height={40} priority />
            <span className="font-bold text-gray-900 text-xl hidden sm:inline-block">AI News Verifier</span>
          </Link>

          {/* Menu de navegação para desktop */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 items-center">
              <li>
                <Link href="/" className="text-gray-700 hover:text-primary font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/verificar" className="text-gray-700 hover:text-primary font-medium">
                  Verificar
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-primary font-medium">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-700 hover:text-primary font-medium">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          {/* Botões de ação para desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/perfil">
                  <Button variant="ghost" className="text-gray-700 hover:text-primary">
                    Meu Perfil
                  </Button>
                </Link>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-primary">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary hover:bg-primary/90 text-white">Registrar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/verificar"
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Verificar
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>

              <div className="pt-2 border-t border-gray-200 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <Link href="/perfil" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">
                        Meu Perfil
                      </Button>
                    </Link>
                    <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                        Registrar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
