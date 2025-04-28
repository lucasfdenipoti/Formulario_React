import { FormData } from "../types/FormData";

// Classe responsável por gerenciar usuários no localStorage
export class UserService {
  private static USERS_KEY = "users";
  private static ACTIVE_USER_KEY = "activeUser";
  private static EMAILS_KEY = "emails";

  // Recupera todos os usuários cadastrados
  static getUsers(): FormData[] {
    const storedUsers = localStorage.getItem(this.USERS_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Salva um novo usuário, caso o email ainda não tenha sido cadastrado
  static saveUser(user: FormData) {
    console.log("Salvando usuário com imagem: ", user.profileImage);
    const users = this.getUsers();
    const exists = users.some((u) => u.email === user.email);
    if (exists) return;
  
    const updatedUsers = [...users, user];
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
  } 

  // Salva um novo email na lista de emails cadastrados
  static saveEmail(email: string) {
    const emails = this.getEmails();
    if (!emails.includes(email)) {
      const updatedEmails = [...emails, email];
      localStorage.setItem(this.EMAILS_KEY, JSON.stringify(updatedEmails));
    }
  }

  // Recupera a lista de emails cadastrados
  static getEmails(): string[] {
    const storedEmails = localStorage.getItem(this.EMAILS_KEY);
    return storedEmails ? JSON.parse(storedEmails) : [];
  }

  // Atualiza os dados de um usuário existente
  static updateUser(updatedUser: FormData) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.email === updatedUser.email);
  
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  }

  // Exclui um usuário pelo email
  static deleteUser(email: string) {
    const users = this.getUsers();
    const updatedUsers = users.filter((u) => u.email !== email);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
  }

  // Verifica se um usuário existe pelo email
  static userExists(email: string): FormData | undefined {
    return this.getUsers().find((u) => u.email === email);
  }

  // Define o usuário ativo atual
  static setActiveUser(email: string) {
    localStorage.setItem(this.ACTIVE_USER_KEY, email);
  }

  // Recupera o usuário ativo
  static getActiveUser(): FormData | null {
    const activeEmail = localStorage.getItem(this.ACTIVE_USER_KEY);
    return activeEmail ? this.userExists(activeEmail) ?? null : null;
  }

  // Remove o usuário ativo (logout)
  static clearActiveUser() {
    localStorage.removeItem(this.ACTIVE_USER_KEY);
  }
}