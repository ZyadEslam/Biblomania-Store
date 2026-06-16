"use client";

import { memo } from "react";
import Field from "./Field";
import FieldGrid from "./FieldGrid";
import {
  calculateItemsTotal,
  createCompositeSummary,
  createEmptyCompositeItem,
} from "@/shared/lib/recordUtils";
import { ENTITY_CONFIG } from "@/shared/config/entityConfig";

const CompositeItemsEditor = ({ type, items, onChange, extraCost = 0 }) => {
  const config = ENTITY_CONFIG[type];
  const totalPrice = calculateItemsTotal(items, extraCost);

  const updateItem = (index, field, value) => {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    onChange([...items, createEmptyCompositeItem()]);
  };

  const removeItem = () => {
    if (items.length === 1) {
      return;
    }

    onChange(items.slice(0, -1));
  };

  const summary = createCompositeSummary(items, config.summaryEmptyText);

  return (
    <section className="stack-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">البيانات المركبة</p>
          <h3>{type === "order" ? "تفاصيل الكتب" : "تفاصيل الأصناف"}</h3>
        </div>
        <span className="summary-pill">{items.length} عنصر</span>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <FieldGrid
            key={`${type}-item-${index}`}
            fields={[
              {
                label: `${config.itemNameLabel} ${index + 1}`,
                name: `${type}-name-${index}`,
                type: "text",
                placeholder: `${config.itemNameLabel} ${index + 1}`,
                value: item.name,
                onChange: (event) => updateItem(index, "name", event.target.value),
                required: true,
              },
              {
                label: `${config.itemPriceLabel} ${index + 1}`,
                name: `${type}-price-${index}`,
                type: "number",
                min: "0",
                step: "0.01",
                placeholder: `${config.itemPriceLabel} ${index + 1}`,
                value: item.price,
                onChange: (event) => updateItem(index, "price", event.target.value),
                required: true,
              },
            ]}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={addItem}>
          {config.addItemLabel}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={removeItem}
          disabled={items.length === 1}
        >
          {config.removeItemLabel}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <Field
          label="الملخص"
          name={`${type}-summary`}
          value={summary}
          readOnly
          inputClassName="opacity-80"
        />
        <Field
          label="الإجمالي"
          name={`${type}-total`}
          type="number"
          value={totalPrice}
          readOnly
          inputClassName="text-primary font-bold"
        />
      </div>
    </section>
  );
};

export default memo(CompositeItemsEditor);
