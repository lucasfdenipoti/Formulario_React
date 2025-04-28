import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { FormData } from "../schemas/validations";
import { useFeedback } from "../hooks/useFeedback";
import { UserService } from "../services/UserService";
import Wallpaper from "../assets/Wallpaper.jpg";

export function Form() {
  const { feedback, setFeedback, getFeedbackColor } = useFeedback();
  const navigate = useNavigate();

  const handleFormSubmit = (data: FormData) => {
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();
    const password = data.password;

    const existingUser = UserService.userExists(email);

    if (existingUser) {
      if (existingUser.name !== name) {
        setFeedback("Email já em uso.");
        return;
      }
      if (existingUser.password !== password) {
        setFeedback("Senha incorreta.");
        return;
      }

      UserService.setActiveUser(updatedUser.email);
      setFeedback(`Bem-vindo(a) de volta, ${existingUser.name}!`);
      setTimeout(() => navigate("/welcome"), 500);
      return;
    }

    const newUser = {
      name,
      email,
      password,
      profileImage: data.profileImage,
      birthDate: data.birthDate,
      gender: data.gender,
      state: data.state,
      techAreas: data.techAreas,
      acceptTerms: data.acceptTerms,
      academicBackground: data.academicBackground,
    };

    UserService.saveUser(newUser);
    UserService.saveEmail(email);
    UserService.setActiveUser(email);

    setFeedback(`Cadastro realizado com sucesso, ${name}!`);
    setTimeout(() => navigate("/welcome"), 500);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px] relative"
      style={{ backgroundImage: `url(${Wallpaper})` }}
    >
      <div className="bg-black/50 text-white p-8 rounded-xl shadow-lg w-[900px] backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center col-span-2 mb-6">Cadastro</h2>

        <UserForm onSubmit={handleFormSubmit} />

        {feedback && (
          <p className={`text-center mt-4 ${getFeedbackColor()}`}>{feedback}</p>
        )}

        <div className="flex justify-center mt-4 gap-4">
          <button
            type="button"
            onClick={() => navigate("/edit")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md"
          >
            Editar Cadastros
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}