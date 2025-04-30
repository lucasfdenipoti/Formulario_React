import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { FormData } from "../schemas/validations";
import { useFeedback } from "../hooks/useFeedback";
import Wallpaper from "../assets/Wallpaper.jpg";

export function CompanyForm() {
  // Usa o hook personalizado para controlar mensagens de feedback
  const { feedback, setFeedback, getFeedbackColor } = useFeedback();
  // Usa o hook do React Router para redirecionar o usuário
  const navigate = useNavigate();

  // Função chamada ao submeter o formulário
  const handleFormSubmit = (data: FormData) => {
    // Normaliza os dados de nome e email
    const name = data.name.trim();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center w-[1910px] relative"
      style={{ backgroundImage: `url(${Wallpaper})` }}
    >
      {/* Container escuro e semi-transparente sobre o fundo */}
      <div className="bg-black/50 text-white p-8 rounded-xl shadow-lg w-[900px] backdrop-blur-sm">
        {/* Título da página de cadastro */}
        <h2 className="text-2xl font-bold text-center col-span-2 mb-6">Cadastro</h2>

        {/* Componente de formulário, recebe a função handleFormSubmit como prop */}
        <UserForm onSubmit={handleFormSubmit} />

        {/* Exibe mensagem de feedback se houver */}
        {feedback && (
          <p className={`text-center mt-4 ${getFeedbackColor()}`}>{feedback}</p>
        )}

        {/* Botões de navegação: editar cadastros e ir para login */}
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