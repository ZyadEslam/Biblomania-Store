"use client";

import { useCallback, useState } from "react";
import {
  calculateItemsTotal,
  createEmptyCompositeItem,
} from "@/shared/lib/recordUtils";
import { useFormFeedback } from "@/shared/hooks/useFormFeedback";
import {
  PAYMENT_DEFAULTS,
  buildPaymentPayload,
} from "@/features/payments/config";
import { usePayments } from "@/features/payments/hooks/usePayments";

export const usePaymentForm = () => {
  const { addPayment, nextPaymentNumber } = usePayments();
  const [values, setValues] = useState(PAYMENT_DEFAULTS);
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
      ...PAYMENT_DEFAULTS,
      التاريخ: new Date().toISOString().slice(0, 10),
    });
    setItems([createEmptyCompositeItem()]);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      clearFeedback();

      const totalPrice = calculateItemsTotal(items, values.المواصلات);
      const payload = buildPaymentPayload(
        values,
        items,
        totalPrice,
        nextPaymentNumber
      );
      const result = await addPayment(payload);

      if (result.succeed) {
        setSuccess(result.message);
        resetForm();
      } else {
        setError(result.message);
      }

      setIsSubmitting(false);
    },
    [
      addPayment,
      clearFeedback,
      items,
      nextPaymentNumber,
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
    nextPaymentNumber,
    setValue,
    setItems,
    handleSubmit,
  };
};
