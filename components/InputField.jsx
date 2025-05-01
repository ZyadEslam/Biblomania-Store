import React from "react";

const InputField = ({
  type,
  placeholder,
  name,
  defaultValue,
  className,
  editable,
  dataChangeHandler,
  value,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input-field ${className}`}
      name={name}
      defaultValue={defaultValue}
      required
      disabled={editable !== undefined ? !editable : editable}
      onChange={
        name.includes("سعر الكتاب") || name.includes("سعر الصنف")
          ? (e) => {
              dataChangeHandler(+name.at(name.length - 1) - 1, +e.target.value);
            }
          : dataChangeHandler
      }
      value={value}
    />
  );
};

export default InputField;
