import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import Wallpaper from "../assets/Wallpaper.jpg";

// Componente da tela de boas-vindas
export function Welcome() {
  // Hook que permite redirecionamento de rotas
  const navigate = useNavigate();

  // Estado para armazenar o nome do usuário ativo
  const [userName, setUserName] = useState<string | null>(null);

  // Estado para armazenar a imagem de perfil do usuário ativo
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // useEffect roda apenas uma vez ao montar o componente
  useEffect(() => {
    // Recupera o usuário atualmente logado (ativo)
    const user = UserService.getActiveUser();

    // Se houver usuário ativo, define o nome e a imagem de perfil nos estados
    if (user) {
      setUserName(user.name);
      setProfileImage(user.profileImage || null);
    }
  }, []);

  // Função chamada ao clicar no botão "Novo Login"
  const handleNewLogin = () => {
    // Redireciona o usuário para a tela de login
    navigate("/login");
  };

  return (
    // Container principal com imagem de fundo e centralização do conteúdo
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px]"
      style={{ backgroundImage: `url(${Wallpaper})` }}
    >
      {/* Caixa central com fundo escuro translúcido, bordas arredondadas e espaçamento interno */}
      <div className="bg-black/50 p-10 rounded-xl shadow-lg text-center w-[600px] space-y-5 backdrop-blur-sm">
        
        {/* Saudação personalizada com o nome do usuário, se disponível */}
        <h1 className="text-3xl font-bold">
          {userName ? `Bem-vindo(a), ${userName}!` : "Bem-vindo(a)!"}
        </h1>

        {/* Exibição da imagem de perfil, se o usuário tiver definido uma */}
        {profileImage && (
          <img
            src={profileImage}
            alt="Foto de perfil"
            className="mx-auto w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
        )}

        {/* Botão para realizar novo login (redireciona para "/login") */}
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