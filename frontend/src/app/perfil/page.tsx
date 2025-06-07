// app/perfil/page.tsx (alterar esta página)

'use client';

import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { User, Mail, AtSign, Hash, Search } from "lucide-react"; // Importe Search para o ícone

export default function PerfilPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setError("ID de usuário não disponível.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/v1/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || errorData.details || "Erro ao carregar perfil.");
        }

        const data = await res.json();
        setUserData(data.user);
      } catch (err: any) {
        console.error("Erro ao carregar perfil:", err);
        setError(err.message || "Não foi possível carregar as informações do perfil.");
      } finally {
        setLoading(false);
      }
    };

    if (userId && isClient) {
      fetchUserProfile();
    }
  }, [userId, isClient]);

  if (!isClient || loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>{loading ? "Carregando perfil..." : "Redirecionando..."}</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center text-red-600">
          <p>Erro: {error}</p>
        </div>
      </>
    );
  }

  if (!userData) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center text-gray-600">
          <p>Dados do perfil não disponíveis.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Meu Perfil</h1>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
                  <p className="text-gray-500 text-sm">@{userData.username}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </Label>
                  <div className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-800">{userData.email}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                    ID de Usuário
                  </Label>
                  <div className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
                    <Hash className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-800">{userData.id}</span>
                  </div>
                </div>

                {/* === NOVO: Exibindo o Total de Pesquisas === */}
                <div>
                  <Label htmlFor="totalSearches" className="block text-sm font-medium text-gray-700 mb-1">
                    Total de Pesquisas
                  </Label>
                  <div className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
                    <Search className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-800 font-bold">{userData.total_searches || 0}</span>
                  </div>
                </div>
                {/* ========================================= */}

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}