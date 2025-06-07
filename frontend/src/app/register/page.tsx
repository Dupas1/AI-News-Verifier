'use client';

import { useState } from 'react'; // Importe useState
import { useRouter } from 'next/navigation'; // Importe useRouter
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import logo from '../../styles/logo.png';
import { Label } from "@/components/ui/label"; // Importe Label se você a usar, embora seu HTML não a use diretamente

export default function Register() {
  const router = useRouter(); // Hook para navegação

  // Estados para os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Novo estado para confirmação de senha
  const [username, setUsername] = useState(""); // Adicionado estado para username, conforme sua tabela `users`

  // Estados para feedback ao usuário
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para indicar que a requisição está em andamento

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página

    setError(""); // Limpa erros anteriores
    setSuccessMessage(""); // Limpa mensagens de sucesso anteriores
    setLoading(true); // Ativa o estado de carregamento

    // Validação básica do lado do cliente
    if (!name || !username || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviando nome de usuário, nome, email e senha para o backend
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await res.json(); // Tenta parsear a resposta como JSON

      if (res.ok) {
        setSuccessMessage("Registro bem-sucedido! Redirecionando para o login...");
        console.log("Usuário registrado:", data);
        // Redireciona para a página de login após um pequeno atraso
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Espera 2 segundos antes de redirecionar
      } else {
        // Se a resposta não for OK (ex: 400, 409, 500), exibe o erro do backend
        setError(data.error || "Erro desconhecido ao registrar. Tente novamente.");
      }
    } catch (err: any) {
      console.error("Erro ao se conectar com o servidor:", err);
      // Erros de rede ou outros erros que impedem a comunicação com o servidor
      setError("Erro ao se conectar com o servidor. Verifique sua conexão.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        {/* Botão para voltar à página inicial */}
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center text-[#555555] hover:text-[#216a9e]">
            <ArrowLeft className="h-4 w-5 mr-1" />
            <span className="text-sm">Voltar para Home</span>
          </Link>
        </div>

        {/* Logo e título do aplicativo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="AI News Verifier Logo" width={150} height={150} />
          </div>
        </div>

        {/* Título da página de registro */}
        <h1 className="text-xl font-bold mb-6 text-center text-[#000000]">Criar Conta</h1>

        {/* Formulário de registro */}
        <form onSubmit={handleRegister} className="space-y-4 mb-6"> {/* Adicionado onSubmit aqui */}
          {/* Campo de nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#555555] mb-1">
              Nome Completo
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              className="w-full border-[#d0d5dd] border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required // Campo obrigatório
            />
          </div>

          {/* Campo de nome de usuário (ADICIONADO, ESSENCIAL PARA SUA TABELA USERS) */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#555555] mb-1">
              Nome de Usuário
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Escolha um nome de usuário único"
              className="w-full border-[#d0d5dd] border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required // Campo obrigatório
            />
          </div>

          {/* Campo de email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#555555] mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu Email"
              className="w-full border-[#d0d5dd] border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Campo obrigatório
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#555555] mb-1">
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full border-[#d0d5dd] border rounded-md pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Campo obrigatório
              />
              {/* Botão para mostrar/ocultar senha - A lógica para isso precisa ser adicionada */}
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]">
                {/* Ícone SVG de olho */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Campo de confirmação de senha */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#555555] mb-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                className="w-full border-[#d0d5dd] border rounded-md pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required // Campo obrigatório
              />
              {/* Botão para mostrar/ocultar senha - A lógica para isso precisa ser adicionada */}
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]">
                {/* Ícone SVG de olho */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Exibição de mensagens de erro ou sucesso */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          {/* Botão para criar conta */}
          <Button type="submit" className="w-full bg-[#1570ef] hover:bg-[#1570ef]/90 text-white font-medium py-2.5 mb-4" disabled={loading}>
            {loading ? 'Registrando...' : 'Criar Conta'}
          </Button>
        </form>

        {/* Link para login caso já tenha conta */}
        <p className="text-center text-sm text-[#555555]">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#4285f4]">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}