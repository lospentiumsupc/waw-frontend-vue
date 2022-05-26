import { http } from "@/core/services/http-common";

export class JobsService {
  getAll() {
    return http.get("/jobs");
  }
  getById(id) {
    return http.get(`/jobs/${id}`);
  }

  create(data) {
    return http.post("/jobs", data);
  }

  update(id, data) {
    return http.put(`/jobs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jobs/${id}`);
  }

  findByTitle(title) {
    return http.get(`/jobs?title=${title}`);
  }
}
