import React from "react";
import InputField from "./InputField";

const PairInputs = ({ labels, types, dataPriceChangeHandler }) => {
  return (
    <div className="flex justify-between">
      {labels.map((label, index) => (
        <div key={index} className="flex flex-col w-[48%] gap-2">
          <label className="font-sans">{label}</label>
          <InputField
            type={types[index]}
            name={label}
            placeholder={label}
            dataChangeHandler={dataPriceChangeHandler}
          />
        </div>
      ))}
    </div>
  );
};

export default PairInputs;
