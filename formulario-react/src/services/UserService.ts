// Importa o tipo FormData, que representa a estrutura dos dados de um usuário
import { FormData } from "../types/FormData";

// Classe responsável por gerenciar os usuários no localStorage
export class UserService {
  // Chave usada para armazenar a lista de usuários no localStorage
  private static USERS_KEY = "users";

  // Chave usada para armazenar o usuário atualmente ativo (logado)
  private static ACTIVE_USER_KEY = "activeUser";

  // Chave usada para armazenar uma lista separada apenas com os emails cadastrados
  private static EMAILS_KEY = "emails";

  // Obtém todos os usuários cadastrados no localStorage
  static getUsers(): FormData[] {
    const savedUsers = localStorage.getItem(this.USERS_KEY); // Lê os usuários salvos como string
    return savedUsers ? JSON.parse(savedUsers) : []; // Converte para objeto ou retorna array vazio
  }

  // Salva um novo usuário, desde que o email ainda não tenha sido cadastrado
  static saveUser(user: FormData) {
    const users = this.getUsers(); // Recupera os usuários existentes
    const existingUser = users.find((u) => u.email === user.email); // Verifica se o email já está cadastrado

    if (existingUser) {
      // Se o email já existir, não faz nada
      return;
    }

    // Adiciona o novo usuário e salva novamente no localStorage
    const updatedUsers = [...users, user];
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
  }

  // Salva um novo email no localStorage, caso ainda não tenha sido salvo
  static saveEmail(email: string) {
    const emails = this.getEmails(); // Recupera os emails já salvos
    if (!emails.includes(email)) {
      // Se o email ainda não estiver na lista
      emails.push(email); // Adiciona o novo email
      localStorage.setItem(this.EMAILS_KEY, JSON.stringify(emails)); // Salva a lista atualizada
    }
  }

  // Recupera a lista de emails já cadastrados
  static getEmails(): string[] {
    const savedEmails = localStorage.getItem(this.EMAILS_KEY); // Lê os emails como string
    return savedEmails ? JSON.parse(savedEmails) : []; // Converte para array ou retorna vazio
  }

  // Atualiza os dados de um usuário já existente (usado, por exemplo, na edição de perfil)
  static updateUser(updatedUser: FormData) {
    const users = this.getUsers(); // Recupera os usuários
    const userIndex = users.findIndex(
      (user) => user.email === updatedUser.email // Encontra o usuário pelo email
    );

    if (userIndex !== -1) {
      users[userIndex] = updatedUser; // Substitui os dados antigos pelos novos
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users)); // Salva novamente no localStorage
    }
  }

  // Exclui um usuário com base no seu email
  static deleteUser(email: string) {
    const users = this.getUsers(); // Recupera todos os usuários
    const updatedUsers = users.filter((user) => user.email !== email); // Remove o usuário com o email correspondente
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers)); // Salva a nova lista
  }

  // Verifica se um usuário com determinado email existe e retorna seus dados, se existir
  static userExists(email: string): FormData | undefined {
    const users = this.getUsers(); // Recupera todos os usuários
    return users.find((user) => user.email === email); // Retorna o usuário correspondente, se houver
  }

  // Define o usuário atualmente logado (salva apenas o email)
  static setActiveUser(email: string) {
    localStorage.setItem(this.ACTIVE_USER_KEY, email); // Salva o email do usuário ativo
  }

  // Retorna os dados completos do usuário atualmente ativo
  static getActiveUser(): FormData | null {
    const activeEmail = localStorage.getItem(this.ACTIVE_USER_KEY); // Lê o email do usuário ativo
    if (activeEmail) {
      return this.userExists(activeEmail); // Busca e retorna o usuário completo, se existir
    }
    return null; // Retorna null se ninguém estiver logado
  }

  // Remove o usuário ativo do localStorage (usado no logout, por exemplo)
  static clearActiveUser() {
    localStorage.removeItem(this.ACTIVE_USER_KEY); // Remove o email do usuário ativo
  }
}