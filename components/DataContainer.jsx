"use client";
import React, { useState, useContext, useEffect } from "react";
import { ContainerCard, PairInputs, OrdersList } from ".";
import MyContext from "@/utils/MyContext";

const DataContainer = () => {
  const [viewedData, setViewedData] = useState("orders");
  const is_orders_viewed = viewedData === "orders";
  const { ctx, setCtx } = useContext(MyContext);
  const [searchNameValue, setSearchNameValue] = useState("");
  const [searchNumberValue, setSearchNumberValue] = useState("");

  const searchHandler = (e, searchType) => {
    const searchValue = e.target.value;
    if (searchType === "name") {
      setSearchNameValue(searchValue);
    } else if (searchType === "number") {
      setSearchNumberValue(searchValue);
    }
  };

  return (
    <ContainerCard
      className={"w-[60%] min-[400px]:w-[100%] sm:w-[100%] lg:w-[60%]"}
    >
      <h1 className="flex justify-between option-header">
        <span className="flex gap-8">
          <span
            className={`option ${is_orders_viewed && "border-primary"}`}
            onClick={() => {
              viewedData !== "orders" && setViewedData("orders");
            }}
          >
            الاوردرات
          </span>
          <span
            className={`option ${!is_orders_viewed && "border-primary"}`}
            onClick={() => {
              viewedData === "orders" && setViewedData("payments");
            }}
          >
            المصروفات
          </span>
        </span>
        <span className={`option total-money-conatiner`}>
          <span>الاجمالي</span>{" "}
          <span className="total-money">{ctx.totalMoney}</span>
        </span>
      </h1>
      {/* <PairInputs
        labels={["البحث باسم العميل", "البحث برقم الاوردر"]}
        types={["text", "text"]}
      /> */}
      <div className="flex gap-6 w-[100%] pt-8">
        <input
          type="text"
          placeholder="البحث باسم العميل"
          className="input-field w-[50%]"
          onChange={(e) => searchHandler(e, "name")}
        />
        <input
          type="text"
          placeholder="البحث برقم الاوردر"
          className="input-field w-[50%]"
          onChange={(e) => searchHandler(e, "number")}
        />
      </div>
      <OrdersList
        is_orders_viewed={is_orders_viewed}
        searchNameValue={searchNameValue}
        searchNumberValue={searchNumberValue}
      />
    </ContainerCard>
  );
};

export default DataContainer;
