"use client";

import { useOrderForm } from "@/features/orders/hooks/useOrderForm";
import OrderEntryFormView from "./OrderEntryFormView";

const OrderEntryFormContainer = () => {
  const formState = useOrderForm();

  return <OrderEntryFormView {...formState} onSubmit={formState.handleSubmit} />;
};

export default OrderEntryFormContainer;
