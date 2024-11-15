import Api from "@/services/api";
import { getUser } from "@/util/store";

class PayableService {
  private api: Api;
  private accessToken: any;

  constructor() {
    const user: {
      accessToken: string;
    } = getUser();

    this.api = new Api();
    this.accessToken = user.accessToken;
  }

  async createPayable(
    assignorId: string,
    value: number,
    emissionDate: string
  ): Promise<any> {
    const body = { assignorId, value, emissionDate };
    return this.api.request("/payable", "POST", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async createBatchWithQueue(
    batchItems: Array<{
      assignorId: string;
      value: number;
      emissionDate: string;
    }>
  ): Promise<any> {
    return this.api.request("/payable/batch", "POST", batchItems, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async getPayables(page = 0, limit = 10, search = ""): Promise<any> {
    return this.api.request(
      `/payable?page=${page}&limit=${limit}&search=${search}`,
      "GET",
      undefined,
      {
        Authorization: `Bearer ${this.accessToken}`,
      }
    );
  }

  async getPayableById(id: string): Promise<any> {
    return this.api.request(`/payable/${id}`, "GET", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async updatePayable(
    id: string,
    value: number,
    emissionDate: string
  ): Promise<any> {
    const body = { value, emissionDate };
    return this.api.request(`/payable/${id}`, "PATCH", body, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  async deletePayable(id: string): Promise<any> {
    return this.api.request(`/payable/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}

export const payableService = new PayableService();
