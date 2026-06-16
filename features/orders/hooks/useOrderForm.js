"use client";

import { useCallback, useState } from "react";
import {
  calculateItemsTotal,
  createEmptyCompositeItem,
} from "@/shared/lib/recordUtils";
import { useFormFeedback } from "@/shared/hooks/useFormFeedback";
import {
  ORDER_DEFAULTS,
  buildOrderPayload,
} from "@/features/orders/config";
import { useOrders } from "@/features/orders/hooks/useOrders";

export const useOrderForm = () => {
  const { addOrder, nextOrderNumber } = useOrders();
  const [values, setValues] = useState(ORDER_DEFAULTS);
  const [items, setItems] = useState([createEmptyCompositeItem()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { feedback, clearFeedback, setSuccess, setError } = useFormFeedback();

  const setValue = useCallback((key, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues({
      ...ORDER_DEFAULTS,
      التاريخ: new Date().toISOString().slice(0, 10),
    });
    setItems([createEmptyCompositeItem()]);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      clearFeedback();

      const totalPrice = calculateItemsTotal(items, values["مصاريف الشحن"]);
      const payload = buildOrderPayload(values, items, totalPrice, nextOrderNumber);
      const result = await addOrder(payload);

      if (result.succeed) {
        setSuccess(result.message);
        resetForm();
      } else {
        setError(result.message);
      }

      setIsSubmitting(false);
    },
    [
      addOrder,
      clearFeedback,
      items,
      nextOrderNumber,
      resetForm,
      setError,
      setSuccess,
      values,
    ]
  );

  return {
    values,
    items,
    isSubmitting,
    feedback,
    nextOrderNumber,
    setValue,
    setItems,
    handleSubmit,
  };
};
