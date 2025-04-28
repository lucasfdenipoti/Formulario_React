import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../hooks/useFeedback";
import { InputField } from "../components/InputField";
import { UserService } from "../services/UserService";
import Wallpaper from "../assets/Wallpaper.jpg";

// Esquema de validação com Zod para o formulário de login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Tipo derivado do esquema
type LoginData = z.infer<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { feedback, setFeedback, getFeedbackColor } = useFeedback();
  const navigate = useNavigate();

  const handleLogin = (data: LoginData) => {
    const email = data.email.trim().toLowerCase();
    const password = data.password;

    const user = UserService.userExists(email);

    if (!user) {
      setFeedback("Usuário não encontrado.");
      return;
    }

    if (user.password !== password) {
      setFeedback("Senha incorreta.");
      return;
    }

    UserService.setActiveUser(email);
    setFeedback(`Bem-vindo(a) de volta, ${user.name}!`);
    setTimeout(() => navigate("/welcome"), 500);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px] relative"
      style={{ backgroundImage: `url(${Wallpaper})` }}
    >
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-black/50 text-white p-8 rounded-xl shadow-lg w-[500px] backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="flex flex-col gap-4">
          {/* Campo de email */}
          <InputField
            label="Email:"
            id="email"
            type="email"
            error={errors.email}
            registration={register("email")}
          />

          {/* Campo de senha */}
          <InputField
            label="Senha:"
            id="password"
            type="password"
            error={errors.password}
            registration={register("password")}
          />

          {/* Botão de login */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            Entrar
          </button>

          {/* Botão para voltar ao cadastro */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md"
            >
              Fazer Cadastro
            </button>
          </div>

          {/* Mensagem de feedback */}
          {feedback && (
            <p className={`text-center mt-2 ${getFeedbackColor()}`}>
              {feedback}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}