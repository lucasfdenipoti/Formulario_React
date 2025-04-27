import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { FormData } from "../types/FormData";
import { UserForm } from "../components/UserForm";
import Wallpaper from "../assets/Wallpaper.jpg";

export function EditProfile() {
  const navigate = useNavigate();
  const activeUser = UserService.getActiveUser();

  if (!activeUser) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (data: FormData) => {
    const updatedUser = {
      ...activeUser,
      ...data, // Atualiza todos os campos recebidos do formulário
    };

    if (data.profileImage) {
      updatedUser.profileImage = data.profileImage;
    }

    UserService.updateUser(updatedUser);
    alert("Perfil atualizado com sucesso!");
    navigate("/edit");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px]"
      style={{ backgroundImage: `url(${Wallpaper})` }}
    >
      <div className="col-span bg-black/50 p-8 rounded-xl w-4/5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-white">Editar Perfil</h1>
          
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
  
        <UserForm
          onSubmit={handleSubmit}
          initialValues={activeUser}
          submitText="Salvar Alterações"
          showTerms={false}
          fieldsToShow={[
            "name",
            "email",
            "password",
            "birthDate",
            "gender",
            "state",
            "techAreas",
            "profileImage",
          ]}
        />
  
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
    </div>
  );
}
