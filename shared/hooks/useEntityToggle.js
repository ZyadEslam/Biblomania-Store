"use client";

import { useCallback, useState } from "react";

export const useEntityToggle = (initialValue = "order") => {
  const [activeEntity, setActiveEntity] = useState(initialValue);

  const selectOrder = useCallback(() => setActiveEntity("order"), []);
  const selectPayment = useCallback(() => setActiveEntity("payment"), []);

  return {
    activeEntity,
    isOrder: activeEntity === "order",
    isPayment: activeEntity === "payment",
    selectOrder,
    selectPayment,
    setActiveEntity,
  };
};
