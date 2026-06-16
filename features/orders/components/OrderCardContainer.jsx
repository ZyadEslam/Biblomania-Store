"use client";

import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { SHIPPING_STATUS } from "@/shared/config/shippingStatus";
import { getOrderSummary } from "@/features/orders/config";
import { useOrders } from "@/features/orders/hooks/useOrders";
import OrderCardView from "./OrderCardView";

const OrderDetailsModalContainer = lazy(
  () => import("@/features/orders/components/OrderDetailsModalContainer")
);

const OrderCardContainer = ({ order }) => {
  const { removeOrder, toggleShippingStatus } = useOrders();
  const [modalMode, setModalMode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const summary = useMemo(() => getOrderSummary(order), [order]);
  const isShipped = order["حالة الشحن"] === SHIPPING_STATUS.shipped;

  const handleDelete = useCallback(async () => {
    const isConfirmed = window.confirm("هل أنت متأكد من حذف هذا السجل؟");
    if (!isConfirmed) {
      return;
    }

    setIsProcessing(true);
    await removeOrder(order._id);
    setIsProcessing(false);
  }, [order._id, removeOrder]);

  const handleShippingToggle = useCallback(async () => {
    setIsProcessing(true);
    await toggleShippingStatus(order);
    setIsProcessing(false);
  }, [order, toggleShippingStatus]);

  const openView = useCallback(() => setModalMode("view"), []);
  const openEdit = useCallback(() => setModalMode("edit"), []);
  const closeModal = useCallback(() => setModalMode(""), []);

  return (
    <>
      <OrderCardView
        order={order}
        summary={summary}
        isShipped={isShipped}
        isProcessing={isProcessing}
        onView={openView}
        onEdit={openEdit}
        onToggleShipping={handleShippingToggle}
        onDelete={handleDelete}
      />

      {modalMode ? (
        <Suspense fallback={null}>
          <OrderDetailsModalContainer
            order={order}
            mode={modalMode}
            onClose={closeModal}
          />
        </Suspense>
      ) : null}
    </>
  );
};

export default OrderCardContainer;
