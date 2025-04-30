// Define um tipo que representa os dados de um usuário/formulário
export type FormData = {
  id: string;                // Identificador único do usuário (geralmente usado para identificar ou manipular registros)
  name: string;              // Nome do usuário 
  email: string;             // Email do usuário 
  password: string;          // Senha do usuário 
  
  birthDate?: string;        // Data de nascimento 
  gender?: string;           // Gênero 
  state?: string;            // Estado 
  techAreas?: string[];      // Áreas de tecnologia selecionadas 
  academicBackground: { university: string; degree: string }[]; // Formação acadêmica

  profileImage?: string;     // Caminho/URL da imagem de perfil 
  acceptTerms?: boolean;     // Indica se o usuário aceitou os termos 
};
