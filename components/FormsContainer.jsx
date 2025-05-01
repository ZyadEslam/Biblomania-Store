"use client";
import React, { useState } from "react";
import { ContainerCard, NewOrderForm, NewPaymentForm } from "./";

const FormsContainer = () => {
  const [formType, setFormType] = useState("add-order");
  const is_add_order = formType === "add-order";
  return (
    <ContainerCard
      className={"w-[40%] min-[400px]:w-[100%] sm:w-[100%] lg:w-[40%] "}
    >
      <h1 className="flex justify-between option-header">
        <span
          className={`option ${is_add_order && "border-primary"}`}
          onClick={() => {
            formType !== "add-order" && setFormType("add-order");
          }}
        >
          أضف اوردر جديد
        </span>
        <span
          className={`option ${!is_add_order && "border-primary"}`}
          onClick={() => {
            formType !== "add-payment" && setFormType("add-payment");
          }}
        >
          أضف مصروفات جديده
        </span>
      </h1>
      {is_add_order ? <NewOrderForm /> : <NewPaymentForm />}
    </ContainerCard>
  );
};

export default FormsContainer;
