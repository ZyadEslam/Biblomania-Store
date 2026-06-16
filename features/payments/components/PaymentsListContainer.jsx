"use client";

import { useCallback } from "react";
import { useRecordFilter } from "@/shared/hooks/useRecordFilter";
import RecordsListView from "@/shared/components/RecordsListView";
import { PAYMENT_CONFIG } from "@/features/payments/config";
import { usePayments } from "@/features/payments/hooks/usePayments";
import PaymentCardContainer from "./PaymentCardContainer";

const PaymentsListContainer = ({ searchNameValue, searchNumberValue }) => {
  const { payments, error, isLoading } = usePayments();

  const filteredPayments = useRecordFilter(
    payments,
    PAYMENT_CONFIG,
    searchNameValue,
    searchNumberValue
  );

  const renderCard = useCallback(
    (payment) => <PaymentCardContainer key={payment._id} payment={payment} />,
    []
  );

  return (
    <RecordsListView
      records={filteredPayments}
      isLoading={isLoading}
      error={error}
      emptyMessage={PAYMENT_CONFIG.emptyListMessage}
      loadMoreLabel={PAYMENT_CONFIG.loadMoreLabel}
      renderCard={renderCard}
    />
  );
};

export default PaymentsListContainer;
