"use client";

import { useCallback } from "react";
import { useRecordFilter } from "@/shared/hooks/useRecordFilter";
import RecordsListView from "@/shared/components/RecordsListView";
import { ORDER_CONFIG } from "@/features/orders/config";
import { useOrders } from "@/features/orders/hooks/useOrders";
import OrderCardContainer from "./OrderCardContainer";

const OrdersListContainer = ({ searchNameValue, searchNumberValue }) => {
  const { orders, error, isLoading } = useOrders();

  const filteredOrders = useRecordFilter(
    orders,
    ORDER_CONFIG,
    searchNameValue,
    searchNumberValue
  );

  const renderCard = useCallback(
    (order) => <OrderCardContainer key={order._id} order={order} />,
    []
  );

  return (
    <RecordsListView
      records={filteredOrders}
      isLoading={isLoading}
      error={error}
      emptyMessage={ORDER_CONFIG.emptyListMessage}
      loadMoreLabel={ORDER_CONFIG.loadMoreLabel}
      renderCard={renderCard}
    />
  );
};

export default OrdersListContainer;
