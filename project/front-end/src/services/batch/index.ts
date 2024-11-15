import Api from "@/services/api";
import { getUser } from "@/util/store";

class BatchService {
  private api: Api;
  private accessToken: string;

  constructor() {
    const user = getUser();
    this.api = new Api();
    this.accessToken = user.accessToken;
  }

  async createBatch(
    processing: boolean,
    totalSuccess: number,
    totalFailed: number,
    total: number
  ): Promise<any> {
    const body = { processing, totalSuccess, totalFailed, total };
    return this.api.request("/batch", "POST", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async getBatches(page = 0, limit = 10): Promise<any> {
    return this.api.request(
      `/batch?page=${page}&limit=${limit}`,
      "GET",
      undefined,
      {
        Authorization: `Bearer ${this.accessToken}`,
      }
    );
  }

  async getBatchById(id: string): Promise<any> {
    return this.api.request(`/batch/${id}`, "GET", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async updateBatch(
    id: string,
    processing: boolean,
    totalSuccess: number,
    totalFailed: number,
    total: number
  ): Promise<any> {
    const body = { processing, totalSuccess, totalFailed, total };
    return this.api.request(`/batch/${id}`, "PATCH", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async deleteBatch(id: string): Promise<any> {
    return this.api.request(`/batch/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}

export const batchService = new BatchService();
