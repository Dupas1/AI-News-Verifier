'use client';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function Login() {
  // States para armazenar os valores de email e senha
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Função para enviar dados para o back-end
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Caso o login seja bem-sucedido, você pode redirecionar ou armazenar o token de autenticação
        alert("Login bem-sucedido")
        console.log(data)  // Aqui você pode armazenar dados do usuário, como o token
      } else {
        setError(data.error)  // Caso de erro, exibe mensagem de erro
      }
    } catch (err) {
      setError("Erro ao se conectar com o servidor")
    }
  }

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
            <Image src="/logo.png" alt="AI News Verifier Logo" width={40} height={40} />
            <span className="font-bold text-[#000000] text-xl">AI News Verifier</span>
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

        {/* Botão de login com Google */}
        <Button
          variant="outline"
          className="w-full border-[#d0d5dd] text-[#344054] font-medium py-2.5 mb-6 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#4285F4"
              d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
            />
            <path
              fill="#FBBC04"
              d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
            />
            <path
              fill="#EA4335"
              d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
            />
            <path fill="none" d="M2 2h44v44H2z" />
          </svg>
          Continuar com Google
        </Button>

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
  )
}
