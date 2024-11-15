import Api from "@/services/api";
import { getUser } from "@/util/store";

class AssignorService {
  private api: Api;
  private accessToken: any;

  constructor() {
    const user: {
      accessToken: string;
    } = getUser();

    this.api = new Api();
    this.accessToken = user.accessToken;
  }

  async createAssignor(
    name: string,
    email: string,
    phone: string,
    document: string
  ): Promise<any> {
    const body = { name, email, phone, document };
    return this.api.request("/assignor", "POST", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async getAssignors(page = 0, limit = 10, search = ""): Promise<any> {
    return this.api.request(
      `/assignor?page=${page}&limit=${limit}&search=${search}`,
      "GET",
      undefined,
      {
        Authorization: `Bearer ${this.accessToken}`,
      }
    );
  }

  async getAssignorById(id: string): Promise<any> {
    return this.api.request(`/assignor/${id}`, "GET", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async updateAssignor(
    id: string,
    name: string,
    email: string,
    phone: string,
    document: string
  ): Promise<any> {
    const body = { name, email, phone, document };
    return this.api.request(`/assignor/${id}`, "PATCH", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async deleteAssignor(id: string): Promise<any> {
    return this.api.request(`/assignor/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}

export const assignorService = new AssignorService();
