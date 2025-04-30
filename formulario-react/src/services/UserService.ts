import { FormData } from "../types/FormData";

// Classe responsável por gerenciar usuários no localStorage
export class UserService {
  private static USERS_KEY = "users"; // Chave para acessar a lista de usuários no localStorage
  private static ACTIVE_USER_KEY = "activeUser"; // Chave para acessar o usuário ativo no localStorage
  private static EMAILS_KEY = "emails"; // Chave para acessar a lista de emails cadastrados no localStorage

  // Recupera todos os usuários cadastrados
  static getUsers(): FormData[] {
    const storedUsers = localStorage.getItem(this.USERS_KEY); // Tenta obter os usuários do localStorage
    return storedUsers ? JSON.parse(storedUsers) : []; // Se houver dados, converte de volta para objeto, senão retorna um array vazio
  }

  // Salva um novo usuário, caso o email ainda não tenha sido cadastrado
  static saveUser(user: FormData) {
    console.log("Salvando usuário com imagem: ", user.profileImage); // Loga a imagem de perfil do usuário
    const users = this.getUsers(); // Obtém os usuários atuais
    const exists = users.some((u) => u.email === user.email); // Verifica se já existe um usuário com o mesmo email
    if (exists) return; // Se já existir, não salva o usuário

    const updatedUsers = [...users, user]; // Adiciona o novo usuário à lista de usuários
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers)); // Atualiza a lista de usuários no localStorage
  }

  // Salva um novo email na lista de emails cadastrados
  static saveEmail(email: string) {
    const emails = this.getEmails(); // Obtém os emails cadastrados
    if (!emails.includes(email)) { // Verifica se o email já está na lista
      const updatedEmails = [...emails, email]; // Se não estiver, adiciona o email à lista
      localStorage.setItem(this.EMAILS_KEY, JSON.stringify(updatedEmails)); // Atualiza a lista de emails no localStorage
    }
  }

  // Recupera a lista de emails cadastrados
  static getEmails(): string[] {
    const storedEmails = localStorage.getItem(this.EMAILS_KEY); // Tenta obter a lista de emails do localStorage
    return storedEmails ? JSON.parse(storedEmails) : []; // Se houver dados, converte de volta para um array, senão retorna um array vazio
  }

  // Atualiza os dados de um usuário existente
  static updateUser(updatedUser: FormData) {
    const users = this.getUsers(); // Obtém os usuários atuais
    const index = users.findIndex((u) => u.email === updatedUser.email); // Encontra o índice do usuário a ser atualizado
  
    if (index !== -1) { // Se o usuário for encontrado
      users[index] = updatedUser; // Substitui os dados do usuário no array
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users)); // Atualiza a lista de usuários no localStorage
    }
  }

  // Exclui um usuário pelo email
  static deleteUser(email: string) {
    const users = this.getUsers(); // Obtém os usuários atuais
    const updatedUsers = users.filter((u) => u.email !== email); // Cria uma nova lista sem o usuário com o email especificado
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers)); // Atualiza a lista de usuários no localStorage
  }

  // Verifica se um usuário existe pelo email
  static userExists(email: string): FormData | undefined {
    return this.getUsers().find((u) => u.email === email); // Retorna o usuário se encontrado, senão retorna undefined
  }

  // Define o usuário ativo atual
  static setActiveUser(email: string) {
    localStorage.setItem(this.ACTIVE_USER_KEY, email); // Define o usuário ativo armazenando seu email no localStorage
  }

  // Recupera o usuário ativo
  static getActiveUser(): FormData | null {
    const activeEmail = localStorage.getItem(this.ACTIVE_USER_KEY); // Obtém o email do usuário ativo
    return activeEmail ? this.userExists(activeEmail) ?? null : null; // Retorna o usuário ativo ou null se não encontrado
  }

  // Remove o usuário ativo (logout)
  static clearActiveUser() {
    localStorage.removeItem(this.ACTIVE_USER_KEY); // Remove o email do usuário ativo do localStorage, efetivamente realizando o logout
  }
}