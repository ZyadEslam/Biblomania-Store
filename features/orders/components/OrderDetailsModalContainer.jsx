"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormFeedback } from "@/shared/hooks/useFormFeedback";
import {
  ORDER_CONFIG,
  ORDER_EDITABLE_FIELDS,
  ORDER_NUMERIC_FIELDS,
  getOrderSummary,
} from "@/features/orders/config";
import { useOrders } from "@/features/orders/hooks/useOrders";
import OrderDetailsModalView from "./OrderDetailsModalView";

const OrderDetailsModalContainer = ({ order, mode, onClose }) => {
  const { updateOrder } = useOrders();
  const [draft, setDraft] = useState(order);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { feedback, clearFeedback, setSuccess, setError } = useFormFeedback();

  const isEditable = mode === "edit";
  const summary = useMemo(() => getOrderSummary(order), [order]);

  useEffect(() => {
    setDraft(order);
    clearFeedback();
  }, [order, clearFeedback]);

  const onFieldChange = useCallback((key, value) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [key]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isEditable) {
        onClose();
        return;
      }

      setIsSubmitting(true);
      clearFeedback();

      const payload = ORDER_EDITABLE_FIELDS.reduce((accumulator, key) => {
        const rawValue = draft[key];
        accumulator[key] = ORDER_NUMERIC_FIELDS.includes(key)
          ? Number(rawValue || 0)
          : rawValue;
        return accumulator;
      }, {});

      const result = await updateOrder(order._id, payload);

      if (result.succeed) {
        setSuccess(result.message);
        setTimeout(onClose, 300);
      } else {
        setError(result.message);
      }

      setIsSubmitting(false);
    },
    [
      clearFeedback,
      draft,
      isEditable,
      onClose,
      order._id,
      setError,
      setSuccess,
      updateOrder,
    ]
  );

  return (
    <OrderDetailsModalView
      order={order}
      draft={draft}
      mode={mode}
      feedback={feedback}
      isSubmitting={isSubmitting}
      isEditable={isEditable}
      editableFields={ORDER_EDITABLE_FIELDS}
      numericFields={ORDER_NUMERIC_FIELDS}
      summary={summary}
      onClose={onClose}
      onSubmit={handleSubmit}
      onFieldChange={onFieldChange}
    />
  );
};

export default OrderDetailsModalContainer;
