"use client";
import React, { Suspense, lazy, useEffect, useState, useContext } from "react";
const OrderCard = lazy(() => import("@/components/OrderCard"));
import Skeleton from "./Skeleton";
import MyContext from "@/context/MyContext";
import { getBaseUrl } from "@/utils/utils";
const OrdersList = ({
  is_orders_viewed,
  searchNameValue,
  searchNumberValue,
}) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const { ctx, setCtx } = useContext(MyContext);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersResponse = await fetch(`${getBaseUrl()}/api/orders`);
        const ordersData = await ordersResponse.json();

        const paymentsResponse = await fetch(`${getBaseUrl()}/api/payments`);
        const paymentData = await paymentsResponse.json();

        setOrders(ordersData);
        setPayments(paymentData);

        setCtx((state) => {
          return {
            ...state,
            lastOrderNumber: ordersData[ordersData.length - 1]
              ? ordersData[ordersData.length - 1]["رقم الاوردر"]
              : 0,
            lastPaymentsNumber: paymentData[paymentData.length - 1]
              ? paymentData[paymentData.length - 1]["رقم العمليه"]
              : 0,
            totalMoney: is_orders_viewed
              ? ordersData
                  .map((order) => order["اجمالي السعر"])
                  .reduce((acc, curr) => acc + curr, 0)
              : paymentData
                  .map((payment) => payment["اجمالي السعر"])
                  .reduce((acc, curr) => acc + curr, 0),
          };
        });
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    getOrders();
  }, [ctx.dataChanged]);

  useEffect(() => {
    setCtx((state) => {
      return {
        ...state,
        totalMoney: is_orders_viewed
          ? orders
              .map((order) => order["اجمالي السعر"])
              .reduce((acc, curr) => acc + curr, 0)
          : payments
              .map((payment) => payment["اجمالي السعر"])
              .reduce((acc, curr) => acc + curr, 0),
      };
    });
  }, [is_orders_viewed]);

  useEffect(() => {
    setFilteredOrders(
      orders.filter((item) => {
        if (
          searchNameValue !== "" &&
          item["اسم العميل"].includes(searchNameValue)
        ) {
          return item;
        } else if (
          searchNumberValue !== "" &&
          item["رقم الاوردر"].toString() === searchNumberValue
        ) {
          return item;
        } else if (
          item["اسم العميل"].includes(searchNameValue) &&
          item["رقم الاوردر"].toString() === searchNumberValue
        ) {
          return item;
        }
      })
    );
    setFilteredPayments(
      payments.filter((item) => {
        if (
          searchNameValue !== "" &&
          item["اسم التاجر"].includes(searchNameValue)
        ) {
          return item;
        } else if (
          searchNumberValue !== "" &&
          item["رقم العمليه"].toString() === searchNumberValue
        ) {
          return item;
        } else if (
          item["اسم التاجر"].includes(searchNameValue) &&
          item["رقم العمليه"].toString() === searchNumberValue
        ) {
          return item;
        }
      })
    );
  }, [searchNameValue, searchNumberValue]);

  return (
    <>
      {is_orders_viewed
        ? filteredOrders.length > 0
          ? filteredOrders.map((card) => (
              <Suspense fallback={<Skeleton />} key={card["_id"]}>
                <OrderCard data={card} type={"order"} />
              </Suspense>
            ))
          : orders.map((card) => (
              <Suspense fallback={<Skeleton />} key={card["_id"]}>
                <OrderCard data={card} type={"order"} />
              </Suspense>
            ))
        : filteredPayments.length > 0
        ? filteredPayments.map((card) => (
            <Suspense fallback={<Skeleton />} key={card["_id"]}>
              <OrderCard data={card} type={"payment"} />
            </Suspense>
          ))
        : payments.map((card) => (
            <Suspense fallback={<Skeleton />} key={card["_id"]}>
              <OrderCard data={card} type={"payment"} />
            </Suspense>
          ))}
    </>
  );
};

export default OrdersList;
