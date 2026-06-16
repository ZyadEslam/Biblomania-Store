import { validateItemType } from "@/shared/lib/validateItemType";
import { request } from "./request";

export const dataApi = {
  getOrders: () => request("/api/orders"),
  getPayments: () => request("/api/payments"),
  createOrder: (payload) =>
    request("/api/order/new", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  createPayment: (payload) =>
    request("/api/payment/new", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateItem: (type, id, payload) => {
    if (!validateItemType(type)) {
      throw new Error("Invalid item type");
    }

    return request(`/api/${type}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
  deleteItem: (type, id) => {
    if (!validateItemType(type)) {
      throw new Error("Invalid item type");
    }

    return request(`/api/${type}/${id}`, {
      method: "DELETE",
    });
  },
};
