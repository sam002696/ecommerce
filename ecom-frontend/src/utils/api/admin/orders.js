import { API_BASE_URL } from "../base";

export const ORDER_API = {
  UPDATE: (id) => `${API_BASE_URL}/admin/orders/${id}`,
  ALL: `${API_BASE_URL}/admin/orders`,
};
