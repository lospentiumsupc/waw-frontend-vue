import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";
import { reactive } from "vue";

export class AuthService extends BaseService {
  state = reactive({ user: null });

  constructor() {
    super("/users");
  }

  get user() {
    return this.state.user;
  }

  get loggedIn() {
    return this.state.user !== null;
  }

  /**
   * @param {string} email
   */
  async login(email) {
    try {
      const response = await http.get(`${this.endpoint}?email=${email}`);
      if (Array.isArray(response.data) && response.data.length !== 1) {
        this.state.user = null;
        return false;
      }
      this.state.user = response.data[0];
      return true;
    } catch (err) {
      return false;
    }
  }

  async register(user) {
    if ("password" in user) {
      delete user.password;
    }
    const required = ["fullName", "preferredName", "email"];
    for (const field of required) {
      if (!(field in user)) return false;
    }
    try {
      const response = await http.post(this.endpoint, user);
      this.state.user = response.data;
      return true;
    } catch (err) {
      return false;
    }
  }

  logout() {
    this.state.user = null;
  }
}

export const GlobalAuthService = new AuthService();
