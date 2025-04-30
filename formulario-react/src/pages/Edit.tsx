import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Wallpaper from "../assets/Wallpaper.jpg";
import { UserService } from "../services/UserService";
import { Dialog } from "../components/Dialog";

// Componente da página de edição de usuários cadastrados
export function Edit() {
  const navigate = useNavigate(); // Permite redirecionar o usuário para outra rota

  // Estado que armazena todos os usuários cadastrados
  const [users, setUsers] = useState<FormData[]>([]);

  // Estado que armazena o usuário selecionado para exclusão
  const [userToDelete, setUserToDelete] = useState<FormData | null>(null);

  // Carrega os usuários assim que o componente for montado
  useEffect(() => {
    setUsers(UserService.getUsers()); // Busca os usuários do localStorage
  }, []);

  // Função executada ao confirmar a exclusão de um usuário
  const confirmDelete = () => {
    if (userToDelete) {
      UserService.deleteUser(userToDelete.email); // Remove o usuário com base no e-mail
      setUsers(UserService.getUsers()); // Atualiza a lista após exclusão
      setUserToDelete(null); // Fecha o diálogo de confirmação
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px] relative"
      style={{ backgroundImage: `url(${Wallpaper})` }} // Define o plano de fundo com a imagem importada
    >
      {/* Container principal com fundo escuro e rolagem se necessário */}
      <div className="bg-black/50 p-8 rounded-xl w-4/5 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Cadastros Existentes
        </h2>

        {/* Lista de usuários cadastrados */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.email} // Usa o e-mail como chave única
              className="p-4 bg-gray-800/50 rounded-lg flex justify-between items-center"
            >
              {/* Nome e email do usuário */}
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-300">{user.email}</p>
              </div>

              {/* Botões de editar e excluir */}
              <div className="flex gap-2">
                {/* Botão para redirecionar para o formulário de edição */}
                <button
                  onClick={() => navigate(`/edit-profile/${user.email}`)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
                >
                  Editar
                </button>

                {/* Botão para abrir o diálogo de confirmação de exclusão */}
                <button
                  onClick={() => setUserToDelete(user)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão flutuante para voltar à página inicial */}
      <div className="fixed bottom-6 right-6 flex gap-4 z-50">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors shadow-md"
        >
          ← Voltar
        </button>
      </div>

      {/* Diálogo de confirmação de exclusão */}
      {userToDelete && (
        <Dialog
          open={true}
          title="Confirmar exclusão"
          description={`Tem certeza que deseja excluir ${userToDelete.name}?`}
          confirmText="Excluir"
          cancelText="Cancelar"
          onCancel={() => setUserToDelete(null)} // Fecha o diálogo
          onConfirm={confirmDelete} // Confirma a exclusão
        />
      )}
    </div>
  );
}