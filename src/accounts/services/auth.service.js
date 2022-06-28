import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";
import { AuthServiceKey } from "@/core/utils/keys";
import { parseFieldsAsDate } from "@/core/utils/parsers";
import { useStorage } from "@vueuse/core";
import { inject, reactive } from "vue";

/**
 * @typedef ExternalImage
 * @property {number} id
 * @property {string} href
 * @property {string?} alt
 *
 * @typedef User
 * @property {number} id
 * @property {string} fullName
 * @property {string} preferredName
 * @property {string} email
 * @property {string?} location
 * @property {number} profileViews
 * @property {string?} biography
 * @property {string?} about
 * @property {Date} birthdate
 * @property {ExternalImage?} cover
 * @property {ExternalImage?} picture
 *
 * @typedef AuthenticatedUser
 * @property {string} token
 *
 * @typedef {User & AuthenticatedUser} UserWithToken
 *
 * @typedef UserEducation
 * @property {number} id
 * @property {string} university
 * @property {string} description
 * @property {number} startYear
 * @property {number} endYear
 * @property {ExternalImage?} image
 *
 * @typedef Company
 * @property {number} id
 * @property {string} name
 * @property {string?} address
 * @property {string} email
 *
 * @typedef UserExperience
 * @property {number} id
 * @property {string} title
 * @property {string} location
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {string} timeDiff
 * @property {string} description
 * @property {ExternalImage?} image
 * @property {Company?} company
 *
 * @typedef UserProject
 * @property {number} id
 * @property {string} title
 * @property {string} summary
 * @property {Date} date
 * @property {ExternalImage?} image
 *
 * @typedef AuthState
 * @property {User?} user
 * @property {UserEducation[]} education
 * @property {UserExperience[]} experience
 * @property {UserProject[]} projects
 */

export class AuthService extends BaseService {
  constructor() {
    super("/users");

    this.token = useStorage("user-token", "", localStorage, {
      listenToStorageChanges: true,
    });

    /** @type {AuthState} */
    this.state = reactive({
      /** @type {User?} */
      user: null,
      /** @type {UserEducation[]} */
      education: [],
      /** @type {UserExperience[]} */
      experience: [],
      /** @type {UserProject[]} */
      projects: [],
    });

    // Try to fetch anything from the API
    // If anything fails, just clear the store
    try {
      this.initState();
    } catch (err) {
      this.clearState();
    }
  }

  /**
   * @param {object} props
   * @param {boolean} props.refetchUser
   * @param {boolean} props.throws
   */
  async initState({ refetchUser = true, throws = false } = {}) {
    const endpoints = ["/me/education", "/me/experience", "/me/projects"];
    if (refetchUser) endpoints.push("/me");

    const promises = endpoints.map(async endpoint => {
      const response = await http.get(this.endpoint + endpoint);
      return { endpoint, response };
    });

    try {
      const responses = await Promise.all(promises);

      /**
       * @param {string} endpoint
       */
      const findResponse = endpoint => {
        return responses.find(i => i.endpoint === endpoint).response.data;
      };

      if (refetchUser) {
        this.state.user = parseFieldsAsDate(findResponse("/me"), ["birthdate"]);
      }
      this.state.education = findResponse("/me/education");
      this.state.experience = parseFieldsAsDate(
        findResponse("/me/experience"),
        ["startDate", "endDate"]
      );
      this.state.projects = parseFieldsAsDate(findResponse("/me/projects"), [
        "date",
      ]);
    } catch (err) {
      // Unable to fetch, throw if requested
      if (throws) throw err;
    }
  }

  clearState() {
    this.token.value = "";
    this.state.user = null;
    this.state.education = [];
    this.state.experience = [];
    this.state.projects = [];
  }

  get store() {
    return this.state;
  }

  get user() {
    return this.state.user;
  }

  get loggedIn() {
    return this.state.user !== null;
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    try {
      const body = JSON.stringify({ email, password });
      const response = await http.post(`${this.endpoint}/login`, body);

      if (response.status !== 200) return false;

      /** @type {UserWithToken} */
      const data = response.data;
      this.token.value = data.token;

      // Delete the token from the response before assigning to storage
      delete data.token;
      this.state.user = parseFieldsAsDate(data, ["birthdate"]);

      await this.initState({
        refetchUser: false,
        throws: true,
      });
      return true;
    } catch (err) {
      this.clearState();
      return false;
    }
  }

  async register(user) {
    const required = [
      "fullName",
      "preferredName",
      "email",
      "password",
      "birthdate",
    ];

    for (const field of required) {
      if (!(field in user)) return false;
    }

    try {
      await http.post(`${this.endpoint}/register`, user);
      return true;
    } catch (err) {
      return false;
    }
  }

  logout() {
    this.clearState();
  }
}

/**
 * @returns {AuthService}
 */
export const useAuth = () => {
  return inject(AuthServiceKey, null);
};
