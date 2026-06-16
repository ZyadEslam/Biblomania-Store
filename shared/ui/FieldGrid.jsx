"use client";

import { memo } from "react";
import Field from "./Field";

const FieldGrid = ({ fields = [] }) => {
  return (
    <div className="pair-grid">
      {fields.map((field) => (
        <Field key={field.name} {...field} />
      ))}
    </div>
  );
};

export default memo(FieldGrid);
