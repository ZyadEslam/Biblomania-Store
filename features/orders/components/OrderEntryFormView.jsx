"use client";

import { memo } from "react";
import Field from "@/shared/ui/Field";
import FieldGrid from "@/shared/ui/FieldGrid";
import CompositeItemsEditor from "@/shared/ui/CompositeItemsEditor";
import { SHIPPING_STATUS } from "@/shared/config/shippingStatus";
import { ORDER_CONFIG } from "@/features/orders/config";

const OrderEntryFormView = ({
  values,
  items,
  isSubmitting,
  feedback,
  nextOrderNumber,
  setValue,
  setItems,
  onSubmit,
}) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">نموذج الإدخال</p>
          <h3>{ORDER_CONFIG.formLabel}</h3>
        </div>
        <span className="summary-pill">#{nextOrderNumber}</span>
      </div>

      <FieldGrid
        fields={[
          {
            label: "اسم العميل",
            name: "customerName",
            type: "text",
            value: values["اسم العميل"],
            onChange: (event) => setValue("اسم العميل", event.target.value),
            placeholder: "اسم العميل",
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
        type="order"
        items={items}
        onChange={setItems}
        extraCost={values["مصاريف الشحن"]}
      />

      <FieldGrid
        fields={[
          {
            label: "رقم التليفون",
            name: "phoneNumber",
            type: "text",
            value: values["رقم التليفون"],
            onChange: (event) => setValue("رقم التليفون", event.target.value),
            placeholder: "رقم التليفون",
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

      <div className="pair-grid">
        <Field
          label="مصاريف الشحن"
          name="shippingCost"
          type="number"
          min="0"
          step="0.01"
          value={values["مصاريف الشحن"]}
          onChange={(event) => setValue("مصاريف الشحن", event.target.value)}
          placeholder="مصاريف الشحن"
          required
        />
        <label className="field-group">
          <span className="field-label">حالة الشحن</span>
          <select
            className="input-field"
            value={values["حالة الشحن"]}
            onChange={(event) => setValue("حالة الشحن", event.target.value)}
          >
            <option value={SHIPPING_STATUS.pending}>{SHIPPING_STATUS.pending}</option>
            <option value={SHIPPING_STATUS.shipped}>{SHIPPING_STATUS.shipped}</option>
          </select>
        </label>
      </div>

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
        {isSubmitting ? "جار حفظ الأوردر..." : ORDER_CONFIG.submitLabel}
      </button>
    </form>
  );
};

export default memo(OrderEntryFormView);
