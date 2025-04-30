import { z } from "zod";

// Expressão regular para validar emails com o padrão: algo@algo.algo
export const emailPattern = {
  value: /\S+@\S+\.\S+/, // Regex que verifica se há texto antes e depois do @ e depois de um ponto
  message: "Email inválido", // Mensagem exibida em caso de erro
};

// Expressão regular para validar senhas com ao menos:
// - Uma letra maiúscula
// - Uma letra minúscula
// - Um número
export const passwordPattern = {
  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, // A expressão regular
  message: "A senha deve conter letra maiúscula, minúscula e número", // Mensagem de erro
};

// Schema de validação do formulário usando Zod
export const formSchema = z.object({
  // Campo Nome: deve ser uma string e não pode ser vazio
  name: z.string().min(1, "Nome é obrigatório"),

  // Campo Email: valida se o email tem o formato correto
  email: z.string().email("Email inválido"),

  // Campo Senha: deve ter pelo menos 6 caracteres e atender ao regex de senha
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres") // Verifica o comprimento mínimo
    .regex(passwordPattern.value, passwordPattern.message), // Valida a senha usando o regex

  // Campo Data de Nascimento:
  birthDate: z.string().refine((date) => {
    const parsedDate = new Date(date); // Converte a string para data
    const today = new Date(); // Data atual

    // Verifica se a data é futura (não permitida)
    if (parsedDate > today) return false;

    // Calcula idade com base na data atual
    const age = today.getFullYear() - parsedDate.getFullYear();

    // Verifica se a pessoa já completou 18 anos
    const hasTurned18 = (
      age > 18 ||
      (age === 18 &&
        today.getMonth() >= parsedDate.getMonth() &&
        today.getDate() >= parsedDate.getDate())
    );

    return hasTurned18; // true se a pessoa tiver 18 ou mais
  }, {
    message: "Você deve ter pelo menos 18 anos e a data não pode ser no futuro", // Mensagem de erro caso a pessoa não tenha 18 anos
  }),

  // Campo Estado: deve ser um objeto com 'label' e 'value' sendo strings
  state: z.object({
    label: z.string(),
    value: z.string(),
  }, {
    message: "Selecione um estado", // Mensagem caso o campo estado não seja preenchido
  }),

  // Campo Gênero: deve ser uma das opções listadas no enum
  gender: z.enum(["Masculino", "Feminino", "Outro"], {
    errorMap: () => ({ message: "Selecione um gênero" }), // Mensagem de erro personalizada
  }),

  // Campo Áreas de TI: deve ser um array de strings com pelo menos uma área
  techAreas: z.array(z.string())
    .min(1, "Selecione pelo menos uma área de TI"), // Mensagem de erro caso o array esteja vazio

  // Campo Aceite dos Termos: deve ser verdadeiro para aceitar os termos
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos" }), // Mensagem de erro caso o usuário não aceite os termos
  }),

  // Campo Imagem de Perfil: deve ser uma string não vazia
  profileImage: z.string().min(1, "Foto de perfil é obrigatória"), // Mensagem de erro caso o campo não seja preenchido

  // Novo Campo de Formação Acadêmica:
  academicBackground: z.array(
    z.object({
      university: z.string().min(1, "Universidade é obrigatória"), // Mensagem caso o nome da universidade esteja vazio
      degree: z.string().min(1, "Grau acadêmico é obrigatório"), // Mensagem caso o grau acadêmico esteja vazio
    })
  ).min(1, "Você deve fornecer ao menos uma formação acadêmica"), // Mensagem de erro caso o array de formações esteja vazio
});

// Cria um tipo TypeScript com base no schema acima
// Isso garante que o mesmo formato será usado no código e na validação
export type FormData = z.infer<typeof formSchema>;