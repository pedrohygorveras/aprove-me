import Api from "@/services/api";
import { getUser } from "@/util/store";

class DeadLetterQueueService {
  private api: Api;
  private accessToken: string;

  constructor() {
    const user = getUser();
    this.api = new Api();
    this.accessToken = user.accessToken;
  }

  async createDeadLetterQueue(
    batchId: string,
    assignorId: string,
    value: number,
    emissionDate: string,
    errorMessage: string
  ): Promise<any> {
    const body = { batchId, assignorId, value, emissionDate, errorMessage };
    return this.api.request("/dead-letter-queue", "POST", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async getDeadLetterQueues(search = "", page = 0, limit = 10): Promise<any> {
    return this.api.request(
      `/dead-letter-queue?search=${search}&page=${page}&limit=${limit}`,
      "GET",
      undefined,
      {
        Authorization: `Bearer ${this.accessToken}`,
      }
    );
  }

  async getDeadLetterQueueById(id: string): Promise<any> {
    return this.api.request(`/dead-letter-queue/${id}`, "GET", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async updateDeadLetterQueue(id: string, errorMessage: string): Promise<any> {
    const body = { errorMessage };
    return this.api.request(`/dead-letter-queue/${id}`, "PATCH", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async deleteDeadLetterQueue(id: string): Promise<any> {
    return this.api.request(`/dead-letter-queue/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}

export const deadLetterQueueService = new DeadLetterQueueService();
