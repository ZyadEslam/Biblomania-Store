"use client";

import { useContext } from "react";
import PaymentsContext from "@/features/payments/context/paymentsContext";

export const usePayments = () => {
  const context = useContext(PaymentsContext);

  if (!context) {
    throw new Error("usePayments must be used within PaymentsProvider");
  }

  return context;
};
