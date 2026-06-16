"use client";

import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { getPaymentSummary } from "@/features/payments/config";
import { usePayments } from "@/features/payments/hooks/usePayments";
import PaymentCardView from "./PaymentCardView";

const PaymentDetailsModalContainer = lazy(
  () => import("@/features/payments/components/PaymentDetailsModalContainer")
);

const PaymentCardContainer = ({ payment }) => {
  const { removePayment } = usePayments();
  const [modalMode, setModalMode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const summary = useMemo(() => getPaymentSummary(payment), [payment]);

  const handleDelete = useCallback(async () => {
    const isConfirmed = window.confirm("هل أنت متأكد من حذف هذا السجل؟");
    if (!isConfirmed) {
      return;
    }

    setIsProcessing(true);
    await removePayment(payment._id);
    setIsProcessing(false);
  }, [payment._id, removePayment]);

  const openView = useCallback(() => setModalMode("view"), []);
  const openEdit = useCallback(() => setModalMode("edit"), []);
  const closeModal = useCallback(() => setModalMode(""), []);

  return (
    <>
      <PaymentCardView
        payment={payment}
        summary={summary}
        isProcessing={isProcessing}
        onView={openView}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {modalMode ? (
        <Suspense fallback={null}>
          <PaymentDetailsModalContainer
            payment={payment}
            mode={modalMode}
            onClose={closeModal}
          />
        </Suspense>
      ) : null}
    </>
  );
};

export default PaymentCardContainer;
