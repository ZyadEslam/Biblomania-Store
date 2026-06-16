import { ORDER_CONFIG } from "@/features/orders/config";
import { PAYMENT_CONFIG } from "@/features/payments/config";

export const ENTITY_CONFIG = {
  order: ORDER_CONFIG,
  payment: PAYMENT_CONFIG,
};

export const getEntitySummary = (item, type) => {
  const config = ENTITY_CONFIG[type];
  return item?.[config.summaryKey] || config.summaryEmptyText;
};
