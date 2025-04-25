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
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Tipo derivado do esquema para ser usado no formulário
type LoginData = z.infer<typeof loginSchema>;

export function Login() {
  // Configuração do formulário com validação baseada no esquema loginSchema
  const {
    register, // Registra os campos no formulário
    handleSubmit, // Lida com o envio do formulário
    formState: { errors }, // Captura os erros de validação
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema), // Conecta o Zod ao formulário
  });

  const { feedback, setFeedback, getFeedbackColor } = useFeedback(); // Controle de mensagens de feedback
  const navigate = useNavigate(); // Permite redirecionamento entre rotas

  // Função executada ao enviar o formulário
  const handleLogin = (data: LoginData) => {
    const name = data.name.trim(); // Remove espaços extras do nome
    const email = data.email.trim().toLowerCase(); // Padroniza o email
    const password = data.password;

    const user = UserService.userExists(email); // Verifica se o usuário existe pelo email

    // Se o usuário não for encontrado
    if (!user) {
      setFeedback("Usuário não encontrado.");
      return;
    }

    // Se o nome não coincidir
    if (user.name !== name) {
      setFeedback("Nome incorreto.");
      return;
    }

    // Se a senha estiver incorreta
    if (user.password !== password) {
      setFeedback("Senha incorreta.");
      return;
    }

    // Se tudo estiver correto, define o usuário como ativo
    UserService.setActiveUser(email);

    // Mostra mensagem de boas-vindas
    setFeedback(`Bem-vindo(a) de volta, ${name}!`);

    // Redireciona para a tela de boas-vindas após 2 segundos
    setTimeout(() => navigate("/welcome"), 2000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px] relative"
      style={{ backgroundImage: `url(${Wallpaper})` }} // Define o papel de parede como fundo
    >
      <form
        onSubmit={handleSubmit(handleLogin)} // Envia os dados do formulário após validação
        className="bg-black/50 text-white p-8 rounded-xl shadow-lg w-[500px] backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="flex flex-col gap-4">
          {/* Campo de nome */}
          <InputField
            label="Nome:"
            id="name"
            error={errors.name}
            registration={register("name")}
          />

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

          {/* Botão de envio */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            Entrar
          </button>

          {/* Botão de navegação para cadastro */}
          <div className="fixed top-147 left-273 flex gap-4 z-50">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md"
            >
              Fazer Cadastro
            </button>
          </div>

          {/* Exibição da mensagem de feedback, se existir */}
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