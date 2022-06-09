import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";

export class JobsService extends BaseService {
  constructor() {
    super("/jobs");
  }

  /**
   * @param {string} title
   */
  findByTitle(title) {
    return http.get(`${this.endpoint}?title=${title}`);
  }
}

export const GlobalJobsService = new JobsService();
