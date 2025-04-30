import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { UserService } from "../services/UserService";
import { FormData } from "../types/FormData";
import { UserForm } from "../components/UserForm";
import { Dialog } from "../components/Dialog";
import Wallpaper from "../assets/Wallpaper.jpg";

// Componente responsável por editar um perfil específico
export function EditProfile() {
  // Pega o parâmetro da URL (email do usuário)
  const { email } = useParams();

  // Hook de navegação
  const navigate = useNavigate();

  // Busca o usuário ativo com base no email da URL
  const activeUser = UserService.getUsers().find(user => user.email === email);

  // Controla exibição do Dialog de confirmação
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Armazena temporariamente os dados a serem salvos
  const [formDataToSave, setFormDataToSave] = useState<FormData | null>(null);

  // Se o usuário não existir, redireciona para login
  if (!activeUser) {
    navigate("/login");
    return null;
  }

  // Manipula envio do formulário: abre o diálogo de confirmação
  const handleSubmit = (data: FormData) => {
    setFormDataToSave(data);
    setShowConfirmDialog(true);
  };

  // Confirma a atualização do perfil
  const confirmSave = () => {
    if (!formDataToSave) return;

    // Cria um novo objeto de usuário com os dados atualizados
    const updatedUser = {
      ...activeUser, // dados antigos
      ...formDataToSave, // sobrescreve com os novos
    };

    // Garante que os dados específicos também sejam mantidos
    if (formDataToSave.academicBackground) {
      updatedUser.academicBackground = formDataToSave.academicBackground;
    }

    if (formDataToSave.profileImage) {
      updatedUser.profileImage = formDataToSave.profileImage;
    }

    // Salva alterações no "banco" (localStorage)
    UserService.updateUser(formDataToSave);

    // Define o usuário editado como o usuário ativo
    UserService.setActiveUser(formDataToSave.email);

    // Fecha o diálogo
    setShowConfirmDialog(false);

    // Redireciona de volta à tela de edição geral
    navigate("/edit");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px]"
      style={{ backgroundImage: `url(${Wallpaper})` }}
    >
      {/* Card de edição com rolagem */}
      <div className="col-span bg-black/50 p-8 rounded-xl w-4/5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-white">Editar Perfil</h1>

          {/* Exibe foto de perfil se existir */}
          {activeUser.profileImage && (
            <div className="flex justify-end">
              <img
                src={activeUser.profileImage}
                alt="Foto de Perfil"
                className="w-32 h-32 rounded-full object-cover border-2 border-white"
              />
            </div>
          )}
        </div>

        {/* Formulário reutilizável com valores iniciais */}
        <UserForm
          onSubmit={handleSubmit}
          initialValues={{
            ...activeUser,
            academicBackground: activeUser.academicBackground || [],
          }}
          submitText="Salvar Alterações"
          showTerms={false} // Oculta checkbox de termos na edição
          fieldsToShow={[
            "name",
            "email",
            "password",
            "birthDate",
            "gender",
            "state",
            "techAreas",
            "profileImage",
            "academicBackground",
          ]} // Define quais campos mostrar no formulário
        />

        {/* Botão de voltar */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => navigate("/edit")}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
          >
            Voltar
          </button>
        </div>
      </div>

      {/* Diálogo de confirmação ao clicar em "Salvar Alterações" */}
      {showConfirmDialog && formDataToSave && (
        <Dialog
          open={true}
          title="Salvar Alterações"
          description="Deseja realmente salvar as alterações no perfil?"
          confirmText="Salvar"
          cancelText="Cancelar"
          onCancel={() => setShowConfirmDialog(false)}
          onConfirm={confirmSave}
        />
      )}
    </div>
  );
}