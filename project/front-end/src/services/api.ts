export default class Api {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  async request(
    url: string,
    method: string,
    body?: any,
    additionalHeaders: Record<string, string> = {}
  ): Promise<any> {
    const headers = { ...this.defaultHeaders, ...additionalHeaders };

    try {
      const response = await fetch(this.baseUrl + url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        return { error: true, statusCode: response?.status };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
