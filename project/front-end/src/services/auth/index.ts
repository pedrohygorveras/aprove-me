import Api from "@/services/api";

class Auth {
  private api: Api;

  constructor() {
    this.api = new Api();
  }

  async login(username: string, password: string): Promise<any> {
    const body = { username, password };
    return this.api.request("/auth", "POST", body);
  }

  async refresh(refreshToken: string): Promise<any> {
    const body = { refreshToken };
    return this.api.request("/auth/refresh", "POST", body);
  }
}

export const authService = new Auth();
