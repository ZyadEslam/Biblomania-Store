"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { dataApi } from "@/shared/api/dataApi";
import { SHIPPING_STATUS } from "@/shared/config/shippingStatus";
import { getNextNumber, sortRecords } from "@/shared/lib/recordUtils";
import OrdersContext from "@/features/orders/context/ordersContext";
import { ORDER_CONFIG } from "@/features/orders/config";

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const records = await dataApi.getOrders();
      setOrders(sortRecords(records, ORDER_CONFIG));
    } catch (requestError) {
      console.error("Error syncing orders with server:", requestError);
      setError(requestError.message || "تعذر تحميل الأوردرات");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const addOrder = useCallback(async (payload) => {
    try {
      const savedOrder = await dataApi.createOrder(payload);
      setOrders((currentOrders) =>
        sortRecords([...currentOrders, savedOrder], ORDER_CONFIG)
      );
      return { succeed: true, message: "تم حفظ الأوردر بنجاح" };
    } catch (requestError) {
      return {
        succeed: false,
        message: requestError.message || "تعذر حفظ الأوردر",
      };
    }
  }, []);

  const removeOrder = useCallback(async (orderId) => {
    try {
      await dataApi.deleteItem("order", orderId);
      setOrders((currentOrders) =>
        currentOrders.filter((order) => order._id !== orderId)
      );
      return { succeed: true, message: "تم حذف الأوردر" };
    } catch (requestError) {
      return {
        succeed: false,
        message: requestError.message || "تعذر حذف الأوردر",
      };
    }
  }, []);

  const updateOrder = useCallback(async (orderId, payload) => {
    try {
      const updatedOrder = await dataApi.updateItem("order", orderId, payload);
      setOrders((currentOrders) =>
        sortRecords(
          currentOrders.map((order) =>
            order._id === orderId ? updatedOrder : order
          ),
          ORDER_CONFIG
        )
      );
      return { succeed: true, message: "تم تحديث الأوردر" };
    } catch (requestError) {
      return {
        succeed: false,
        message: requestError.message || "تعذر تحديث الأوردر",
      };
    }
  }, []);

  const toggleShippingStatus = useCallback(
    async (order) => {
      const nextStatus =
        order[ORDER_CONFIG.statusKey] === SHIPPING_STATUS.shipped
          ? SHIPPING_STATUS.pending
          : SHIPPING_STATUS.shipped;

      return updateOrder(order._id, {
        ...order,
        [ORDER_CONFIG.statusKey]: nextStatus,
      });
    },
    [updateOrder]
  );

  const totalMoney = useMemo(
    () =>
      Number(
        orders
          .reduce((sum, item) => sum + Number(item?.[ORDER_CONFIG.totalKey] || 0), 0)
          .toFixed(2)
      ),
    [orders]
  );

  const nextOrderNumber = useMemo(
    () => getNextNumber(orders, ORDER_CONFIG),
    [orders]
  );

  const value = useMemo(
    () => ({
      orders,
      error,
      isLoading,
      totalMoney,
      nextOrderNumber,
      lastOrderNumber: nextOrderNumber - 1,
      addOrder,
      removeOrder,
      refreshOrders,
      toggleShippingStatus,
      updateOrder,
    }),
    [
      orders,
      error,
      isLoading,
      totalMoney,
      nextOrderNumber,
      addOrder,
      removeOrder,
      refreshOrders,
      toggleShippingStatus,
      updateOrder,
    ]
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export default OrdersProvider;
