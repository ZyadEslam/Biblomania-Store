"use client";

import { usePaymentForm } from "@/features/payments/hooks/usePaymentForm";
import PaymentEntryFormView from "./PaymentEntryFormView";

const PaymentEntryFormContainer = () => {
  const formState = usePaymentForm();

  return <PaymentEntryFormView {...formState} onSubmit={formState.handleSubmit} />;
};

export default PaymentEntryFormContainer;
