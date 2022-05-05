import { http } from "@/core/services/http-common";

export class JobOffersService {
  getAll() {
    return http.get("/jobOffers");
  }
  getById(id) {
    return http.get(`/jobOffers/${id}`);
  }

  create(data) {
    return http.post("/jobOffers", data);
  }

  update(id, data) {
    return http.put(`/jobOffers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jobOffers/${id}`);
  }

  findByTitle(title) {
    return http.get(`/jobOffers?title=${title}`);
  }
}
