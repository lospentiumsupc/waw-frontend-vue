import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";

export class AuthenticationService extends BaseService {
  user = null;

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

  logout() {
    this.user = null;
  }

  getCurrentUser() {
    return this.user;
  }
}

export const GlobalAuthService = new AuthenticationService();
