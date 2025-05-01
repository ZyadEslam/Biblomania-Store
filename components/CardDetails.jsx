"use client";
import React, { useState, useContext } from "react";
import InputField from "./InputField";
import { updateDataAction } from "@/app/actions/actions";
import Form from "next/form";
import MyContext from "@/utils/MyContext";

const CardDetails = ({ showDetailsToggler, orderData, editable, type }) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const { ctx, setCtx } = useContext(MyContext);
  const dataChangeHandler = () => {
    setIsDataChanged(true);
  };
  const submissionHandler = async (formData) => {
    await updateDataAction(formData, type);
    setCtx((state) => {
      return {
        ...state,
        dataChanged: !state.dataChanged,
      };
    });
    showDetailsToggler();
  };
  return (
    <>
      <div className="backdrop" onClick={showDetailsToggler}></div>
      <div className="card-details">
        <header />
        <Form className="order-details-data" action={submissionHandler}>
          {Object.keys(orderData).map((key) => {
            if (key !== "_id" && key !== "__v") {
              return (
                <label
                  className="flex justify-between items-center mb-2"
                  key={`${key}-${orderData["رقم الاوردر"]}`}
                >
                  <span className="max-w-[12%] min-w-[12%] text-sm text-gray-300">
                    {key}:{" "}
                  </span>
                  <InputField
                    defaultValue={orderData[key]}
                    name={key}
                    type={
                      typeof orderData[key] === "number" ? "number" : "text"
                    }
                    className={"w-full py-1"}
                    editable={editable}
                    dataChangeHandler={dataChangeHandler}
                  />
                </label>
              );
            }
          })}
          <input
            type="text"
            name={"id"}
            defaultValue={orderData["_id"]}
            hidden
          />
          {editable && (
            <button
              type="submit"
              className="btn-primary w-[50%] disabled:opacity-80 ml-auto mr-auto mb-3"
              disabled={!isDataChanged}
            >
              حفظ التغييرات
            </button>
          )}
        </Form>
      </div>
    </>
  );
};

export default CardDetails;

// Remove the fetch from the page component and handle it
