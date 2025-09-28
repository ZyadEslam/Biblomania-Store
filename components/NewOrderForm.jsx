"use client";
import React, { useState, useContext } from "react";
import { PairInputs, CompositData } from "./";
import Form from "next/form";
import { newDataSubmissionAction } from "@/app/actions/actions";
import MyContext from "@/context/MyContext";
import { useFormStatus } from "react-dom";

const NewOrderForm = () => {
  const [isShipped, setIsShipped] = useState(false);
  const shippingValue = isShipped ? "تم الشحن" : "لم يتم الشحن";

  const shippingStateHandler = (state) => {
    setIsShipped(state);
  };

  const submissionState = useFormStatus();
  const { ctx, setCtx } = useContext(MyContext);

  const handleSubmit = async (formData) => {
    await newDataSubmissionAction(formData, "order");
    if (submissionState.pending === false) {
      console.log("Order submitted successfully!");
      setCtx((state) => {
        return {
          ...state,
          dataChanged: !state.dataChanged,
        };
      });
    }
  };

  return (
    <Form action={handleSubmit} className="flex flex-col gap-3">
      <input
        type="number"
        name="رقم الاوردر"
        hidden
        defaultValue={ctx.lastOrderNumber + 1}
      />
      <PairInputs labels={["اسم العميل", "العنوان"]} types={["text", "text"]} />

      <CompositData type="order" />

      <PairInputs
        labels={["رقم التليفون", "التاريخ"]}
        types={["text", "date"]}
      />
      <PairInputs
        labels={["مصاريف الشحن", "ملاحظات"]}
        types={["number", "text"]}
      />
      <p className="flex gap-12 mb-2.5 relative">
        <input
          type="text"
          name="حالة الشحن"
          hidden
          defaultValue={shippingValue}
          id="shipping"
        />
        <label
          htmlFor="shipping"
          className={`shipping-state ${isShipped && "after:bg-primary"}`}
          onClick={() => {
            shippingStateHandler(true);
          }}
        >
          تم الشحن
        </label>
        <label
          htmlFor="shipping"
          className={`shipping-state ${!isShipped && "after:bg-primary"}`}
          onClick={() => {
            shippingStateHandler(false);
          }}
        >
          لم يتم الشحن
        </label>
      </p>
      <button className="btn-primary w-[100%] ">حفظ الاوردر</button>
    </Form>
  );
};

export default NewOrderForm;
