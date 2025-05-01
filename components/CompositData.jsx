"use client";
import React, { useEffect, useState, useContext } from "react";
import { InputField, PairInputs } from "./";
import MyContext from "@/utils/MyContext";

const CompositData = ({ type }) => {
  const [data, setData] = useState([0]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPriceTouched, setIsPriceTouched] = useState(false);
  let total = data.reduce((prev, current) => prev + current, 0);

  const { ctx, setCtx } = useContext(MyContext);

  useEffect(() => {
    setData([0]);
    setTotalPrice(0);
    total = 0;
  }, [ctx.dataChanged]);

  const dataControlHandler = (operationType) => {
    if (operationType === "add") {
      setData((state) => [...state, 0]);
    } else if (operationType === "remove") {
      setData((state) => state.slice(0, state.length - 1));
    } else {
      return;
    }
  };

  const dataPriceChangeHandler = (index, value) => {
    setIsPriceTouched(true);
    console.log(total);

    console.log(value);
    if (typeof value === "number") {
      setData((state) => {
        let updatedData = state;
        updatedData[index] = value;
        return updatedData;
      });

      setTotalPrice(value);
    }
  };

  return (
    <>
      {data.map((_, index) => (
        <PairInputs
          labels={
            type === "payment"
              ? ["اسم الصنف " + (index + 1), "سعر الصنف " + (index + 1)]
              : ["اسم الكتاب " + (index + 1), "سعر الكتاب " + (index + 1)]
          }
          types={["text", "number"]}
          key={type + " " + index}
          dataPriceChangeHandler={dataPriceChangeHandler}
        />
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          className={`btn-primary  w-[${data.length > 1 ? "47.5%" : "100%"}]`}
          onClick={() => {
            dataControlHandler("add");
          }}
        >
          {type === "order" ? `اضف كتاب جديد` : `اضف صنف جديد`}
        </button>
        {data.length > 1 && (
          <button
            type="button"
            className="btn-primary w-[47.5%] "
            onClick={() => {
              dataControlHandler("remove");
            }}
          >
            {type === "order" ? `احذف اخر كتاب` : `احذف اخر صنف`}
          </button>
        )}
      </div>
      <InputField
        type={"number"}
        name={"اجمالي السعر"}
        placeholder={"اجمالي السعر"}
        defaultValue={isPriceTouched && total !== 0 ? total : ""}
      />
    </>
  );
};

export default CompositData;
