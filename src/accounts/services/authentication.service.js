// We'll implement proper authentication later
export class AuthenticationService {
  /** @type {AuthenticationService} */
  static _instance = null;

  static get instance() {
    if (this._instance === null) {
      this._instance = new AuthenticationService();
    }
    return this._instance;
  }

  loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  getCurrentUser() {
    if (this.loggedIn) {
      return {
        preferredName: "John",
        fullName: "John Doe",
        email: "john.doe@gmail.com",
        location: "Lima, Peru",
        profileViews: 367,
        biography:
          "Freelance UX/UI designer, 80+ projects in Web, Mobile (Android & iOS) and creative projects. Open to offers.",
        about:
          "I'm more experienced in e-commerce web projects and mobile banking apps, but also like to work with creative projects, such as landing pages or unusual corporate websites.",
      };
    }

    return {};
  }
}
