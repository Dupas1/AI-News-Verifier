// app/login/page.tsx

'use client';

import Image from "next/image"
import logo from '../../styles/logo.png';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login bem-sucedido");
      console.log(data);

      // === MUDANÇA AQUI: ARMAZENAR USER ID E USER NAME ===
      if (data.user && data.user.id && data.user.name) { // Verifica se 'name' existe
        localStorage.setItem('userId', data.user.id.toString());
        localStorage.setItem('userName', data.user.name); // Salva o nome do usuário
      }
      // ===================================================
      
      setTimeout(() => {
        router.push("/verificar");
      }, 100);

    } else {
      setError(data.error);
    }
  } catch (err) {
    setError("Erro ao se conectar com o servidor");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        {/* Botão para voltar à página inicial */}
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center text-[#555555] hover:text-[#216a9e]">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm">Voltar para Home</span>
          </Link>
        </div>

        {/* Logo e título do aplicativo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="AI News Verifier Logo" width={150} height={150} />
          </div>
        </div>

        {/* Título da página de login */}
        <h1 className="text-xl font-bold mb-6 text-center text-[#000000]">Login</h1>

        {/* Formulário de login */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          {/* Campo de email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#555555] mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-[#d0d5dd] border rounded-md"
            />
          </div>

          {/* Campo de senha com link para recuperação */}
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-[#555555]">
                Password
              </label>
              <Link href="#" className="text-sm text-[#4285f4]">
                Esqueceu?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[#d0d5dd] border rounded-md pr-10"
              />
              {/* Botão para mostrar/ocultar senha */}
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Exibição de erros */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botão de login */}
          <Button className="w-full bg-[#1570ef] hover:bg-[#1570ef]/90 text-white font-medium py-2.5 mb-4">
            Entrar
          </Button>
        </form>

        {/* Link para registro de nova conta */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-sm text-[#555555]">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-[#4285f4]">
              Registre-se
            </Link>
          </p>

          {/* Botão de registro destacado */}
          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full border-[#216a9e] text-[#216a9e] hover:bg-[#216a9e]/10">
              Criar nova conta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}