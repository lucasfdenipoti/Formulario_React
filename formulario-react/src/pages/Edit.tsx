import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Wallpaper from "../assets/Wallpaper.jpg";
import { UserService } from "../services/UserService";

// Componente que exibe todos os cadastros e permite editar ou excluir usuários
export function Edit() {
  const navigate = useNavigate(); // Hook para redirecionamento

  // State que armazena a lista de usuários cadastrados
  const [users, setUsers] = useState<FormData[]>([]);

  // useEffect executado uma única vez ao montar o componente
  useEffect(() => {
    // Carrega os usuários salvos no localStorage
    setUsers(UserService.getUsers());
  }, []);

  // Função chamada ao clicar em "Excluir"
  const handleDelete = (email: string, name: string) => {
    // Confirmação via alerta antes de excluir
    if (window.confirm(`Tem certeza que deseja excluir ${name}?`)) {
      UserService.deleteUser(email); // Remove o usuário
      UserService.setActiveUser(null);
      setUsers(UserService.getUsers()); // Atualiza o estado com a nova lista
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px] relative"
      style={{ backgroundImage: `url(${Wallpaper})` }} // Define imagem de fundo
    >
      <div className="bg-black/50 p-8 rounded-xl w-4/5 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Cadastros Existentes
        </h2>

        {/* Lista de usuários cadastrados */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.email} // Usa o email como chave única
              className="p-4 bg-gray-800/50 rounded-lg flex justify-between items-center"
            >
              {/* Informações do usuário */}
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-300">{user.email}</p>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-2">
                {/* Botão para editar perfil do usuário */}
                <button
                  onClick={() => {
                    UserService.setActiveUser(user.email);
                    navigate(`/edit-profile/${user.email}`);
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
                >
                  Editar
                </button>

                {/* Botão para excluir o usuário */}
                <button
                  onClick={() => handleDelete(user.email, user.name)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão fixo no canto inferior direito para voltar */}
      <div className="fixed bottom-6 right-6 flex gap-4 z-50">
        <button
          onClick={() => navigate("/")} // Redireciona para a tela inicial
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors shadow-md"
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}