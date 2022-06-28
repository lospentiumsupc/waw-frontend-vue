import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";

export class CompaniesService extends BaseService {
  constructor() {
    super("/companies");
  }

  /**
   * @param {string} name
   */
  findByName(name) {
    return http.get(`${this.endpoint}?name=${name}`);
  }
}
