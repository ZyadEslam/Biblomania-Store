"use client";
import React, { useState, useContext } from "react";
import CardDetails from "./CardDetails";
import { handleDateFormatting, customRequest } from "@/utils/utils";
import MyContext from "@/utils/MyContext";

const OrderCard = ({ data, type }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [isEditable, setIsEditable] = useState();
  const { ctx, setCtx } = useContext(MyContext);
  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };
  data["التاريخ"] = handleDateFormatting(data["التاريخ"]);

  return (
    <div className="order-card">
      <div className="order-data">
        {Object.keys(data).map((key) => {
          if (
            key === "رقم الاوردر" ||
            key === "اسم العميل" ||
            key === "التاريخ" ||
            key === "رقم العمليه" ||
            key === "اسم التاجر"
          ) {
            {
              return (
                <p key={`${key}-${data["رقم الاوردر"]}`}>
                  <span className="text-sm text-gray-300">{key}</span> :{" "}
                  {data[key]}
                </p>
              );
            }
          }
        })}
      </div>
      <div className={`order-icons ${type === "payment" && "pl-2 !gap-1"}`}>
        {/* /////////////////////// */}
        <i
          className="bx bx-expand"
          onClick={() => {
            toggleDetails();
            setIsEditable(false);
          }}
        ></i>
        {/* /////////////////////// */}
        <span className="flex gap-5">
          {type === "order" && (
            <form
              action={async () => {
                const confirmUpdate = confirm(
                  "Do you want to complete updating the order ?"
                );
                if (confirmUpdate) {
                  await customRequest(`/api/order/${data["_id"]}`, "PATCH", {
                    ...data,
                    "حالة الشحن":
                      data["حالة الشحن"] === "تم الشحن"
                        ? "لم يتم الشحن"
                        : "تم الشحن",
                  });
                  setCtx((state) => {
                    return {
                      ...state,
                      dataChanged: !state.dataChanged,
                    };
                  });
                } else {
                  return;
                }
              }}
            >
              <button
                type="submit"
                className={`bx bxs-star hover:text-primary ${
                  data["حالة الشحن"] === "تم الشحن" && "text-primary"
                }`}
              ></button>
            </form>
          )}
          {/* /////////////////////// */}
          <i
            className="bx bxs-edit hover:text-[rgb(0,255,0)]"
            onClick={() => {
              toggleDetails();
              setIsEditable(true);
            }}
          ></i>
          {/* /////////////////////// */}
          {/* {type === "order" && <i className="bx bxs-log-out-circle"></i>} */}
          {/* /////////////////////// */}
        </span>
        <form
          action={async () => {
            const confirmDeletion = confirm(
              "Do you want to complete deleting the order ?"
            );
            if (confirmDeletion) {
              await customRequest(
                `/api/${type === "order" ? "order" : "payment"}/${data["_id"]}`,
                "DELETE"
              );
              setCtx((state) => {
                return {
                  ...state,
                  dataChanged: !state.dataChanged,
                };
              });
            } else {
              return;
            }
          }}
        >
          <button
            type="submit"
            className="bx bxs-trash-alt  hover:text-[rgb(255,0,0)]"
          ></button>
        </form>
      </div>
      {/* /////////////////////// */}
      {viewDetails && (
        <CardDetails
          orderData={data}
          showDetailsToggler={toggleDetails}
          editable={isEditable}
          type={type}
        />
      )}
    </div>
  );
};

export default OrderCard;
