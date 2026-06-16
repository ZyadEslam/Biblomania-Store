import OrdersProvider from "@/features/orders/providers/OrdersProvider";
import PaymentsProvider from "@/features/payments/providers/PaymentsProvider";

const AppDataProvider = ({ children }) => {
  return (
    <OrdersProvider>
      <PaymentsProvider>{children}</PaymentsProvider>
    </OrdersProvider>
  );
};

export default AppDataProvider;
