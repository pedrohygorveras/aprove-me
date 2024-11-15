import { Api } from "../api";

class AuthService {
  private api: Api;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    this.api = new Api(baseUrl);
  }

  async login(login: string, password: string) {
    return await this.api.request("/auth", {
      method: "POST",
      body: { login, password },
    });
  }

  async refreshToken(refreshToken: string) {
    return await this.api.request("/auth/refresh", {
      method: "POST",
      body: { refreshToken },
    });
  }
}

export const authService = new AuthService();
