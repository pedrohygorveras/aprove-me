import Api from "@/services/api";
import { getUser } from "@/util/store";

class UserService {
  private api: Api;
  private accessToken: string;

  constructor() {
    const user = getUser();
    this.api = new Api();
    this.accessToken = user?.accessToken;
  }

  async createUser(
    name: string,
    username: string,
    password: string,
    email: string,
    role: string
  ): Promise<any> {
    const body = { name, username, password, email, role };
    return this.api.request("/user", "POST", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async getUsers(search = "", page = 0, limit = 10): Promise<any> {
    return this.api.request(
      `/user?search=${search}&page=${page}&limit=${limit}`,
      "GET",
      undefined,
      {
        Authorization: `Bearer ${this.accessToken}`,
      }
    );
  }

  async getUserById(id: string): Promise<any> {
    return this.api.request(`/user/${id}`, "GET", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async updateUser(
    id: string,
    name: string,
    username: string,
    email: string,
    role: string
  ): Promise<any> {
    const body = { name, username, email, role };
    return this.api.request(`/user/${id}`, "PATCH", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async deleteUser(id: string): Promise<any> {
    return this.api.request(`/user/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}

export const userService = new UserService();
