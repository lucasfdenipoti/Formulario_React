import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../hooks/useFeedback";
import { InputField } from "../components/InputField";
import { UserService } from "../services/UserService";
import Wallpaper from "../assets/Wallpaper.jpg";

// Esquema de validação com Zod: email deve ser válido e senha com no mínimo 6 caracteres
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Define o tipo `LoginData` com base no esquema do Zod
type LoginData = z.infer<typeof loginSchema>;

// Componente de Login
export function Login() {
  // Inicializa o formulário com validação por Zod
  const {
    register, // registra os campos
    handleSubmit, // lida com o submit
    formState: { errors }, // armazena os erros de validação
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema), // usa o schema do Zod como validador
  });

  // Hook de feedback customizado (mensagens de erro ou sucesso)
  const { feedback, setFeedback, getFeedbackColor } = useFeedback();

  // Hook de navegação
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleLogin = (data: LoginData) => {
    const email = data.email.trim().toLowerCase(); // normaliza o email
    const password = data.password;

    // Verifica se o usuário existe
    const user = UserService.userExists(email);

    // Usuário não encontrado
    if (!user) {
      setFeedback("Usuário não encontrado.");
      return;
    }

    // Senha incorreta
    if (user.password !== password) {
      setFeedback("Senha incorreta.");
      return;
    }

    // Define usuário como ativo (logado)
    UserService.setActiveUser(email);

    // Mostra mensagem de boas-vindas
    setFeedback(`Bem-vindo(a) de volta, ${user.name}!`);

    // Redireciona para tela de boas-vindas após breve atraso
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

          {/* Botão para voltar para a tela de cadastro */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md"
            >
              Fazer Cadastro
            </button>
          </div>

          {/* Exibe mensagem de erro ou sucesso, se houver */}
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