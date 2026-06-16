"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormFeedback } from "@/shared/hooks/useFormFeedback";
import {
  PAYMENT_EDITABLE_FIELDS,
  PAYMENT_NUMERIC_FIELDS,
  getPaymentSummary,
} from "@/features/payments/config";
import { usePayments } from "@/features/payments/hooks/usePayments";
import PaymentDetailsModalView from "./PaymentDetailsModalView";

const PaymentDetailsModalContainer = ({ payment, mode, onClose }) => {
  const { updatePayment } = usePayments();
  const [draft, setDraft] = useState(payment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { feedback, clearFeedback, setSuccess, setError } = useFormFeedback();

  const isEditable = mode === "edit";
  const summary = useMemo(() => getPaymentSummary(payment), [payment]);

  useEffect(() => {
    setDraft(payment);
    clearFeedback();
  }, [payment, clearFeedback]);

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

      const payload = PAYMENT_EDITABLE_FIELDS.reduce((accumulator, key) => {
        const rawValue = draft[key];
        accumulator[key] = PAYMENT_NUMERIC_FIELDS.includes(key)
          ? Number(rawValue || 0)
          : rawValue;
        return accumulator;
      }, {});

      const result = await updatePayment(payment._id, payload);

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
      payment._id,
      setError,
      setSuccess,
      updatePayment,
    ]
  );

  return (
    <PaymentDetailsModalView
      payment={payment}
      draft={draft}
      feedback={feedback}
      isSubmitting={isSubmitting}
      isEditable={isEditable}
      editableFields={PAYMENT_EDITABLE_FIELDS}
      numericFields={PAYMENT_NUMERIC_FIELDS}
      summary={summary}
      onClose={onClose}
      onSubmit={handleSubmit}
      onFieldChange={onFieldChange}
    />
  );
};

export default PaymentDetailsModalContainer;
