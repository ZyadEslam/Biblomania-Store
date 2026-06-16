"use client";

import { memo } from "react";
import Field from "@/shared/ui/Field";
import FieldGrid from "@/shared/ui/FieldGrid";
import CompositeItemsEditor from "@/shared/ui/CompositeItemsEditor";
import { PAYMENT_CONFIG } from "@/features/payments/config";

const PaymentEntryFormView = ({
  values,
  items,
  isSubmitting,
  feedback,
  nextPaymentNumber,
  setValue,
  setItems,
  onSubmit,
}) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">نموذج الإدخال</p>
          <h3>{PAYMENT_CONFIG.formLabel}</h3>
        </div>
        <span className="summary-pill">#{nextPaymentNumber}</span>
      </div>

      <FieldGrid
        fields={[
          {
            label: "اسم التاجر",
            name: "merchantName",
            type: "text",
            value: values["اسم التاجر"],
            onChange: (event) => setValue("اسم التاجر", event.target.value),
            placeholder: "اسم التاجر",
            required: true,
          },
          {
            label: "العنوان",
            name: "address",
            type: "text",
            value: values.العنوان,
            onChange: (event) => setValue("العنوان", event.target.value),
            placeholder: "العنوان",
            required: true,
          },
        ]}
      />

      <CompositeItemsEditor
        type="payment"
        items={items}
        onChange={setItems}
        extraCost={values.المواصلات}
      />

      <FieldGrid
        fields={[
          {
            label: "المواصلات",
            name: "transport",
            type: "number",
            min: "0",
            step: "0.01",
            value: values.المواصلات,
            onChange: (event) => setValue("المواصلات", event.target.value),
            placeholder: "المواصلات",
            required: true,
          },
          {
            label: "التاريخ",
            name: "date",
            type: "date",
            value: values.التاريخ,
            onChange: (event) => setValue("التاريخ", event.target.value),
            required: true,
          },
        ]}
      />

      <Field
        label="ملاحظات"
        name="notes"
        value={values.ملاحظات}
        onChange={(event) => setValue("ملاحظات", event.target.value)}
        placeholder="أي ملاحظات إضافية"
        textarea
      />

      {feedback.message ? (
        <p className={`form-feedback ${feedback.type}`}>{feedback.message}</p>
      ) : null}

      <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "جار حفظ المصروف..." : PAYMENT_CONFIG.submitLabel}
      </button>
    </form>
  );
};

export default memo(PaymentEntryFormView);
