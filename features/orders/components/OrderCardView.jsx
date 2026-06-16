"use client";

import { memo } from "react";
import { formatDateValue } from "@/shared/lib/recordUtils";
import { SHIPPING_STATUS } from "@/shared/config/shippingStatus";
import { ORDER_CONFIG, getOrderSummary } from "@/features/orders/config";

const OrderCardView = ({
  order,
  summary,
  isShipped,
  isProcessing,
  onView,
  onEdit,
  onToggleShipping,
  onDelete,
}) => {
  return (
    <article className="record-card">
      <div className="record-card__content">
        <div className="record-card__header">
          <div>
            <p className="eyebrow">{ORDER_CONFIG.singularLabel}</p>
            <h3>
              #{order[ORDER_CONFIG.numberKey]} - {order[ORDER_CONFIG.nameKey]}
            </h3>
          </div>
          <div className="record-card__meta">
            <span>{formatDateValue(order[ORDER_CONFIG.dateKey])}</span>
            <strong>{order[ORDER_CONFIG.totalKey]} جنيه</strong>
          </div>
        </div>

        <p className="record-card__summary">{summary}</p>

        <div className="record-card__footer">
          <span className="summary-pill">{order.العنوان}</span>
          <span className={`status-pill ${isShipped ? "is-shipped" : ""}`}>
            {order[ORDER_CONFIG.statusKey]}
          </span>
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
          className={`icon-button ${isShipped ? "is-accent" : ""}`}
          onClick={onToggleShipping}
          disabled={isProcessing}
          title="تبديل حالة الشحن"
        >
          <i className="bx bxs-star" />
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

export default memo(OrderCardView);
