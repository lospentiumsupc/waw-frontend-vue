import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";

export class AuthService extends BaseService {
  user = null;

  constructor() {
    super("/users");
  }

  get loggedIn() {
    return this.user !== null;
  }

  /**
   * @param {string} email
   */
  async login(email) {
    const response = await http.get(`${this.endpoint}?email=${email}`);
    this.user = response.data;
  }

  async register(user) {
    if ("password" in user) {
      delete user.password;
    }
    const response = await http.post(this.endpoint, user);
    this.user = response.data;
  }

  logout() {
    this.user = null;
  }

  getCurrentUser() {
    return this.user;
  }
}

export const GlobalAuthService = new AuthService();
