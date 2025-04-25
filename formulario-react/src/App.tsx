import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa os componentes de página que serão usados nas rotas
import { Form } from "./pages/Form";       // Página do formulário
import { Welcome } from "./pages/Welcome"; // Página de boas-vindas após o envio do formulário
import { Edit } from "./pages/Edit";       // Página do lobby de edição
import { EditProfile } from "./pages/editProfile"; // Página de edição de um cadastro
import { Login } from "./pages/Login";

// Função principal da aplicação, que define as rotas
export default function App() {
  return (
    // O Router encapsula a aplicação para que a navegação funcione corretamente com a URL
    <Router>
      {/* O componente Routes contém todos os caminhos que a aplicação pode ter */}
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit-profile/:email" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}