// Importa o hook de navegação do React Router
import { useNavigate } from "react-router-dom";
// Importa o hook useEffect e useState do React
import { useEffect, useState } from "react";
// Importa a classe de serviço de usuários
import { UserService } from "../services/UserService";
// Importa a imagem de fundo da tela
import Wallpaper from "../assets/Wallpaper.jpg";

// Componente da tela de boas-vindas
export function Welcome() {
  const navigate = useNavigate(); // Hook para redirecionar de rota
  const [userName, setUserName] = useState<string | null>(null); // Estado para armazenar o nome do usuário
  const profileImage = localStorage.getItem("profileImage");

  // useEffect executa ao montar o componente
  useEffect(() => {
    // Obtém o usuário ativo através do serviço UserService
    const user = UserService.getActiveUser();
  
    if (user) {
      setUserName(user.name); // Atualiza o nome do usuário
    }
  }, []);  

  // Função chamada ao clicar em "Novo Login"
  const handleNewLogin = () => {
    navigate("/login"); // Redireciona para a tela inicial
  };

  return (
    // Container com fundo e centralização do conteúdo
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px]"
      style={{ backgroundImage: `url(${Wallpaper})` }}
    >
      {/* Caixa central com fundo escuro e blur */}
      <div className="bg-black/50 p-10 rounded-xl shadow-lg text-center w-[600px] space-y-5 backdrop-blur-sm">
        {/* Título com saudação personalizada, se disponível */}
        <h1 className="text-3xl font-bold">
          {userName ? `Bem-vindo(a), ${userName}!` : "Bem-vindo(a)!"}
        </h1>

        {profileImage && (
          <img
            src={profileImage}
            alt="Foto de perfil"
            className="mx-auto w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
        )}

        {/* Botão que retorna à tela inicial */}
        <button
          onClick={handleNewLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Novo Login
        </button>
      </div>
    </div>
  );
}