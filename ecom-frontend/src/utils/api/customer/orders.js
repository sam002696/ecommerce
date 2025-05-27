// src/utils/api/customer.js
import { API_BASE_URL } from "../base";

export const ORDER_API = {
  ALL: `${API_BASE_URL}/get-all-orders`,
  CREATE: `${API_BASE_URL}/save-order`,
  SINGLE_ORDER: (id) => `${API_BASE_URL}/get-order-details/${id}`,
  DOWNLOAD_INVOICE: (id) => `${API_BASE_URL}/download-invoice/${id}`,
};
