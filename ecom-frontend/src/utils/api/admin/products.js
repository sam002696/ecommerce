import { API_BASE_URL } from "../base";

export const PRODUCT_API = {
  CREATE: `${API_BASE_URL}/admin/products`,
  UPDATE: (id) => `${API_BASE_URL}/admin/products/${id}`,
  ALL: `${API_BASE_URL}/admin/products`,
  SINGLE: (id) => `${API_BASE_URL}/admin/products/${id}`,
  DELETE: (id) => `${API_BASE_URL}/admin/products/${id}`,
};
