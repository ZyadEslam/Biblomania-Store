"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { dataApi } from "@/shared/api/dataApi";
import { getNextNumber, sortRecords } from "@/shared/lib/recordUtils";
import PaymentsContext from "@/features/payments/context/paymentsContext";
import { PAYMENT_CONFIG } from "@/features/payments/config";

const PaymentsProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshPayments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const records = await dataApi.getPayments();
      setPayments(sortRecords(records, PAYMENT_CONFIG));
    } catch (requestError) {
      console.error("Error syncing payments with server:", requestError);
      setError(requestError.message || "تعذر تحميل المصروفات");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPayments();
  }, [refreshPayments]);

  const addPayment = useCallback(async (payload) => {
    try {
      const savedPayment = await dataApi.createPayment(payload);
      setPayments((currentPayments) =>
        sortRecords([...currentPayments, savedPayment], PAYMENT_CONFIG)
      );
      return { succeed: true, message: "تم حفظ المصروف" };
    } catch (requestError) {
      return {
        succeed: false,
        message: requestError.message || "تعذر حفظ المصروف",
      };
    }
  }, []);

  const removePayment = useCallback(async (paymentId) => {
    try {
      await dataApi.deleteItem("payment", paymentId);
      setPayments((currentPayments) =>
        currentPayments.filter((payment) => payment._id !== paymentId)
      );
      return { succeed: true, message: "تم حذف المصروف" };
    } catch (requestError) {
      return {
        succeed: false,
        message: requestError.message || "تعذر حذف المصروف",
      };
    }
  }, []);

  const updatePayment = useCallback(async (paymentId, payload) => {
    try {
      const updatedPayment = await dataApi.updateItem("payment", paymentId, payload);
      setPayments((currentPayments) =>
        sortRecords(
          currentPayments.map((payment) =>
            payment._id === paymentId ? updatedPayment : payment
          ),
          PAYMENT_CONFIG
        )
      );
      return { succeed: true, message: "تم تحديث المصروف" };
    } catch (requestError) {
      return {
        succeed: false,
        message: requestError.message || "تعذر تحديث المصروف",
      };
    }
  }, []);

  const totalMoney = useMemo(
    () =>
      Number(
        payments
          .reduce((sum, item) => sum + Number(item?.[PAYMENT_CONFIG.totalKey] || 0), 0)
          .toFixed(2)
      ),
    [payments]
  );

  const nextPaymentNumber = useMemo(
    () => getNextNumber(payments, PAYMENT_CONFIG),
    [payments]
  );

  const value = useMemo(
    () => ({
      payments,
      error,
      isLoading,
      totalMoney,
      nextPaymentNumber,
      lastPaymentNumber: nextPaymentNumber - 1,
      addPayment,
      removePayment,
      refreshPayments,
      updatePayment,
    }),
    [
      payments,
      error,
      isLoading,
      totalMoney,
      nextPaymentNumber,
      addPayment,
      removePayment,
      refreshPayments,
      updatePayment,
    ]
  );

  return (
    <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>
  );
};

export default PaymentsProvider;
