"use client";

import { memo } from "react";
import Field from "@/shared/ui/Field";
import { formatDateValue } from "@/shared/lib/recordUtils";
import { SHIPPING_STATUS } from "@/shared/config/shippingStatus";
import { ORDER_CONFIG } from "@/features/orders/config";

const OrderDetailsModalView = ({
  order,
  draft,
  mode,
  feedback,
  isSubmitting,
  isEditable,
  editableFields,
  numericFields,
  summary,
  onClose,
  onSubmit,
  onFieldChange,
}) => {
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <aside className="details-modal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{isEditable ? "وضع التعديل" : "وضع القراءة"}</p>
            <h3>
              {ORDER_CONFIG.singularLabel} رقم {order[ORDER_CONFIG.numberKey]}
            </h3>
          </div>
          <button type="button" className="icon-button" onClick={onClose}>
            <i className="bx bx-x" />
          </button>
        </div>

        <div className="record-highlight">
          <span>{order[ORDER_CONFIG.nameKey]}</span>
          <small>{formatDateValue(order[ORDER_CONFIG.dateKey])}</small>
          <p>{summary}</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          {editableFields.map((fieldKey) => {
            if (fieldKey === ORDER_CONFIG.statusKey) {
              return (
                <label key={fieldKey} className="field-group">
                  <span className="field-label">{fieldKey}</span>
                  <select
                    className="input-field"
                    value={draft[fieldKey]}
                    onChange={(event) => onFieldChange(fieldKey, event.target.value)}
                    disabled={!isEditable}
                  >
                    <option value={SHIPPING_STATUS.pending}>
                      {SHIPPING_STATUS.pending}
                    </option>
                    <option value={SHIPPING_STATUS.shipped}>
                      {SHIPPING_STATUS.shipped}
                    </option>
                  </select>
                </label>
              );
            }

            return (
              <Field
                key={fieldKey}
                label={fieldKey}
                name={fieldKey}
                type={
                  fieldKey === ORDER_CONFIG.dateKey
                    ? "date"
                    : numericFields.includes(fieldKey)
                    ? "number"
                    : "text"
                }
                value={
                  fieldKey === ORDER_CONFIG.dateKey && draft[fieldKey]
                    ? new Date(draft[fieldKey]).toISOString().slice(0, 10)
                    : draft[fieldKey] ?? ""
                }
                onChange={(event) => onFieldChange(fieldKey, event.target.value)}
                readOnly={!isEditable}
                disabled={!isEditable}
                textarea={fieldKey === ORDER_CONFIG.notesKey}
              />
            );
          })}

          {feedback.message ? (
            <p className={`form-feedback ${feedback.type}`}>{feedback.message}</p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {isEditable ? (
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "جار الحفظ..." : "حفظ التغييرات"}
              </button>
            ) : null}
            <button type="button" className="btn-secondary" onClick={onClose}>
              إغلاق
            </button>
          </div>
        </form>
      </aside>
    </>
  );
};

export default memo(OrderDetailsModalView);
