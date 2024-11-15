import Api from "@/services/api";
import { getUser } from "@/util/store";

class BatchItemService {
  private api: Api;
  private accessToken: string;

  constructor() {
    const user = getUser();
    this.api = new Api();
    this.accessToken = user?.accessToken;
  }

  async createBatchItem(
    batchId: string,
    payableId: string,
    status: string,
    retryCount: number
  ): Promise<any> {
    const body = { batchId, payableId, status, retryCount };
    return this.api.request("/batch-item", "POST", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async getBatchItems(batchId = "", page = 0, limit = 10): Promise<any> {
    return this.api.request(
      `/batch-item?batchId=${batchId}&page=${page}&limit=${limit}`,
      "GET",
      undefined,
      {
        Authorization: `Bearer ${this.accessToken}`,
      }
    );
  }

  async getBatchItemById(id: string): Promise<any> {
    return this.api.request(`/batch-item/${id}`, "GET", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async updateBatchItem(
    id: string,
    status: string,
    retryCount: number
  ): Promise<any> {
    const body = { status, retryCount };
    return this.api.request(`/batch-item/${id}`, "PATCH", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async deleteBatchItem(id: string): Promise<any> {
    return this.api.request(`/batch-item/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}

export const batchItemService = new BatchItemService();
