"use client";

import { memo } from "react";
import { formatDateValue } from "@/shared/lib/recordUtils";
import { PAYMENT_CONFIG } from "@/features/payments/config";

const PaymentCardView = ({
  payment,
  summary,
  isProcessing,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <article className="record-card">
      <div className="record-card__content">
        <div className="record-card__header">
          <div>
            <p className="eyebrow">{PAYMENT_CONFIG.singularLabel}</p>
            <h3>
              #{payment[PAYMENT_CONFIG.numberKey]} - {payment[PAYMENT_CONFIG.nameKey]}
            </h3>
          </div>
          <div className="record-card__meta">
            <span>{formatDateValue(payment[PAYMENT_CONFIG.dateKey])}</span>
            <strong>{payment[PAYMENT_CONFIG.totalKey]} جنيه</strong>
          </div>
        </div>

        <p className="record-card__summary">{summary}</p>

        <div className="record-card__footer">
          <span className="summary-pill">{payment.العنوان}</span>
        </div>
      </div>

      <div className="record-card__actions">
        <button
          type="button"
          className="icon-button"
          onClick={onView}
          title="عرض التفاصيل"
        >
          <i className="bx bx-expand-alt" />
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={onEdit}
          title="تعديل"
        >
          <i className="bx bx-edit-alt" />
        </button>
        <button
          type="button"
          className="icon-button danger"
          onClick={onDelete}
          disabled={isProcessing}
          title="حذف"
        >
          <i className="bx bx-trash" />
        </button>
      </div>
    </article>
  );
};

export default memo(PaymentCardView);
