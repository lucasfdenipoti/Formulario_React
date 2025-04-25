// Define um tipo (type alias) chamado `FormData` que representa os dados de um usuário/formulário
export type FormData = {
  id: string;                // Identificador único do usuário (geralmente usado para identificar ou manipular registros)
  name: string;              // Nome do usuário (obrigatório)
  email: string;             // Email do usuário (obrigatório)
  password: string;          // Senha do usuário (obrigatória)
  
  birthDate?: string;        // Data de nascimento 
  gender?: string;           // Gênero 
  state?: string;            // Estado 
  techAreas?: string[];      // Áreas de tecnologia selecionadas (array de strings)
  
  profileImage?: string;     // Caminho/URL da imagem de perfil 
  acceptTerms?: boolean;     // Indica se o usuário aceitou os termos 
};
