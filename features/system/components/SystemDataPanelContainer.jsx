"use client";

import { lazy, Suspense, useCallback, useState } from "react";
import { ENTITY_CONFIG } from "@/shared/config/entityConfig";
import { useEntityToggle } from "@/shared/hooks/useEntityToggle";
import RecordCardSkeleton from "@/shared/ui/RecordCardSkeleton";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { usePayments } from "@/features/payments/hooks/usePayments";
import SystemDataPanelView from "./SystemDataPanelView";

const OrdersListContainer = lazy(
  () => import("@/features/orders/components/OrdersListContainer")
);
const PaymentsListContainer = lazy(
  () => import("@/features/payments/components/PaymentsListContainer")
);

const ListFallback = () => <RecordCardSkeleton />;

const SystemDataPanelContainer = () => {
  const { activeEntity, isOrder, setActiveEntity } = useEntityToggle("order");
  const [searchNameValue, setSearchNameValue] = useState("");
  const [searchNumberValue, setSearchNumberValue] = useState("");
  const { orders, totalMoney: ordersTotal } = useOrders();
  const { payments, totalMoney: paymentsTotal } = usePayments();

  const currentConfig = ENTITY_CONFIG[activeEntity];
  const currentCount = isOrder ? orders.length : payments.length;
  const currentTotal = isOrder ? ordersTotal : paymentsTotal;

  const onSearchNameChange = useCallback((event) => {
    setSearchNameValue(event.target.value);
  }, []);

  const onSearchNumberChange = useCallback((event) => {
    setSearchNumberValue(event.target.value);
  }, []);

  return (
    <SystemDataPanelView
      activeView={activeEntity}
      onViewChange={setActiveEntity}
      currentCount={currentCount}
      currentTotal={currentTotal}
      searchNameValue={searchNameValue}
      searchNumberValue={searchNumberValue}
      searchNamePlaceholder={currentConfig.searchNamePlaceholder}
      searchNumberPlaceholder={currentConfig.searchNumberPlaceholder}
      onSearchNameChange={onSearchNameChange}
      onSearchNumberChange={onSearchNumberChange}
    >
      <Suspense fallback={<ListFallback />}>
        {isOrder ? (
          <OrdersListContainer
            searchNameValue={searchNameValue}
            searchNumberValue={searchNumberValue}
          />
        ) : (
          <PaymentsListContainer
            searchNameValue={searchNameValue}
            searchNumberValue={searchNumberValue}
          />
        )}
      </Suspense>
    </SystemDataPanelView>
  );
};

export default SystemDataPanelContainer;
