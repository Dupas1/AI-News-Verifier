// components/navbar.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter } from 'next/navigation';
import logo from '../styles/logo.png';

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null); // Novo estado para o nome do usuário
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const storedUserName = localStorage.getItem('userName'); // <-- Lê o nome do usuário
      
      setIsLoggedIn(!!storedUserId);
      setUserName(storedUserName); // <-- Define o nome do usuário
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName'); // <-- Remove o nome do usuário também
      setIsLoggedIn(false);
      setUserName(null); // Limpa o nome do usuário
      router.push('/login');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo e nome do aplicativo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="AI News Verifier Logo" width={80} height={80} priority />
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
              {isLoggedIn && (
                <li>
                  <Link href="/history" className="text-gray-700 hover:text-primary font-medium">
                    Histórico
                  </Link>
                </li>
              )}
              <li>
                <Link href="/about" className="text-gray-700 hover:text-primary font-medium">
                  Sobre
                </Link>
              </li>
              {/* <li>
                <Link href="/contato" className="text-gray-700 hover:text-primary font-medium">
                  Contato
                </Link>
              </li> */}
            </ul>
          </nav>

          {/* Botões de ação para desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isClient && isLoggedIn ? (
              <>
                {userName && ( // Exibe o nome do usuário se estiver disponível
                  <span className="text-gray-700 font-medium">Olá, {userName}!</span>
                )}
                <Link href="/perfil">
                  <Button variant="ghost" className="text-gray-700 hover:text-primary">
                    Meu Perfil
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </>
            ) : (
              isClient && (
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
              )
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
              {isLoggedIn && (
                <Link
                  href="/history"
                  className="text-gray-700 hover:text-primary font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Histórico
                </Link>
              )}
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
                {isClient && isLoggedIn ? (
                  <>
                    {userName && ( // Exibe o nome do usuário no menu mobile
                        <span className="text-gray-700 font-medium py-2">Olá, {userName}!</span>
                    )}
                    <Link href="/perfil" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">
                        Meu Perfil
                      </Button>
                    </Link>
                    <Button 
                      variant="default" 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleLogout}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  isClient && (
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
                  )
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}