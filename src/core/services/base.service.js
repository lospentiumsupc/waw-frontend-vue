import { http } from "@/core/services/http-common";

export class BaseService {
  /** @type {string} */
  endpoint = "";

  /**
   * @param {string} path
   */
  constructor(path) {
    this.endpoint = this.formatEndpoint(path);
  }

  /**
   * @param {string} path
   */
  formatEndpoint(path) {
    if (path.endsWith("/")) {
      path = path.substring(0, path.length - 1);
    }
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    return path;
  }

  getAll() {
    return http.get(this.endpoint);
  }

  /**
   * @param {number} id
   */
  getById(id) {
    return http.get(`${this.endpoint}/${id}`);
  }

  /**
   * @param {Record<string, unknown>} data
   */
  create(data) {
    return http.post(this.endpoint, data);
  }

  /**
   *
   * @param {number} id
   * @param {Record<string, unknown>} data
   */
  update(id, data) {
    return http.put(`${this.endpoint}/${id}`, data);
  }

  /**
   * @param {number} id
   */
  delete(id) {
    return http.delete(`${this.endpoint}/${id}`);
  }
}
