"use client";

import { memo } from "react";

const TogglePills = ({ options, activeValue, onChange }) => {
  return (
    <div className="toggle-row">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`toggle-pill ${activeValue === option.value ? "is-active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default memo(TogglePills);
