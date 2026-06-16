"use client";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { usePayments } from "@/features/payments/hooks/usePayments";
import NavView from "./NavView";

const NavContainer = () => {
  const { orders, totalMoney: ordersTotal } = useOrders();
  const { payments, totalMoney: paymentsTotal } = usePayments();

  return (
    <NavView
      ordersCount={orders.length}
      ordersTotal={ordersTotal}
      paymentsCount={payments.length}
      paymentsTotal={paymentsTotal}
    />
  );
};

export default NavContainer;
