"use client";

import { memo } from "react";

const Field = ({
  label,
  className = "",
  inputClassName = "",
  textarea = false,
  ...props
}) => {
  const Component = textarea ? "textarea" : "input";

  return (
    <label className={`field-group ${className}`}>
      {label ? <span className="field-label">{label}</span> : null}
      <Component
        className={`input-field ${textarea ? "min-h-28 resize-none" : ""} ${inputClassName}`}
        {...props}
      />
    </label>
  );
};

export default memo(Field);
