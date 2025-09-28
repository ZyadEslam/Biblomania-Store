"use client";
import React, { useContext } from "react";
import PairInputs from "@/components/PairInputs";
import Form from "next/form";
import { newDataSubmissionAction } from "@/app/actions/actions";
import MyContext from "@/context/MyContext";
import { useFormStatus } from "react-dom";
import { InputField, CompositData } from ".";

const NewPaymentForm = () => {
  const { ctx, setCtx } = useContext(MyContext);
  const submissionState = useFormStatus();

  const handleSubmit = async (formData) => {
    await newDataSubmissionAction(formData, "payment");
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
        name="رقم العمليه"
        hidden
        defaultValue={ctx.lastPaymentsNumber + 1}
      />
      <PairInputs labels={["اسم التاجر", "العنوان"]} types={["text", "text"]} />

      <CompositData type="payment" />

      <PairInputs
        labels={["المواصلات", "التاريخ"]}
        types={["number", "date"]}
      />
      <div className="flex flex-col w-[100%] gap-2">
        <label className="font-sans">ملاحظات</label>
        <InputField type={"string"} name={"ملاحظات"} placeholder={"ملاحظات"} />
      </div>

      <button className="btn-primary w-[100%] "> حفظ المصروفات</button>
    </Form>
  );
};

export default NewPaymentForm;
