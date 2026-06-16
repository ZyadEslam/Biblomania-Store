"use client";

import { lazy, Suspense } from "react";
import { useEntityToggle } from "@/shared/hooks/useEntityToggle";
import RecordCardSkeleton from "@/shared/ui/RecordCardSkeleton";
import SystemFormsView from "./SystemFormsView";

const OrderEntryFormContainer = lazy(
  () => import("@/features/orders/components/OrderEntryFormContainer")
);
const PaymentEntryFormContainer = lazy(
  () => import("@/features/payments/components/PaymentEntryFormContainer")
);

const FormFallback = () => (
  <div className="py-4">
    <RecordCardSkeleton count={1} />
  </div>
);

const SystemFormsContainer = () => {
  const { activeEntity, isOrder, setActiveEntity } = useEntityToggle("order");

  return (
    <SystemFormsView activeForm={activeEntity} onFormChange={setActiveEntity}>
      <Suspense fallback={<FormFallback />}>
        {isOrder ? <OrderEntryFormContainer /> : <PaymentEntryFormContainer />}
      </Suspense>
    </SystemFormsView>
  );
};

export default SystemFormsContainer;
