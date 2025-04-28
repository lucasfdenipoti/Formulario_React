import { z } from "zod";

// Expressão regular para validar emails com o padrão: algo@algo.algo
export const emailPattern = {
  value: /\S+@\S+\.\S+/, // Regex que verifica se há texto antes e depois do @ e depois de um ponto
  message: "Email inválido", // Mensagem exibida em caso de erro
};

// Expressão regular para validar senhas com ao menos:
export const passwordPattern = {
  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
  message: "A senha deve conter letra maiúscula, minúscula e número",
};

export const formSchema = z.object({
  // Campo Nome:
  name: z.string().min(1, "Nome é obrigatório"),

  // Campo Email:
  email: z.string().email("Email inválido"),

  // Campo Senha:
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .regex(passwordPattern.value, passwordPattern.message),

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
    message: "Você deve ter pelo menos 18 anos e a data não pode ser no futuro",
  }),

  // Campo Estado:
  state: z.object({
    label: z.string(),
    value: z.string(),
  }, {
    message: "Selecione um estado",
  }),

  // Campo Gênero:
  gender: z.enum(["Masculino", "Feminino", "Outro"], {
    errorMap: () => ({ message: "Selecione um gênero" }),
  }),

  // Campo Áreas de TI:
  techAreas: z.array(z.string())
    .min(1, "Selecione pelo menos uma área de TI"),

  // Campo Aceite dos Termos:
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos" }),
  }),

  // Campo Imagem de Perfil:
  profileImage: z.string().min(1, "Foto de perfil é obrigatória"),

  // Novo Campo de Formação Acadêmica:
  academicBackground: z.array(
    z.object({
      university: z.string().min(1, "Universidade é obrigatória"),
      degree: z.string().min(1, "Grau acadêmico é obrigatório"),
    })
  ).min(1, "Você deve fornecer ao menos uma formação acadêmica"),
});


// Cria um tipo TypeScript com base no schema acima
// Isso garante que o mesmo formato será usado no código e na validação
export type FormData = z.infer<typeof formSchema>;