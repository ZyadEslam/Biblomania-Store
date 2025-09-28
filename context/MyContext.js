"use client";
import { useState, createContext } from "react";

const MyContext = createContext();
export const ContextProvider = ({ children }) => {
  const [ctx, setCtx] = useState({
    lastOrderNumber: 0,
    lastPaymentsNumber: 0,
    dataChanged: false,
    totalMoney: 0,
  });
  return (
    <MyContext.Provider value={{ ctx, setCtx }}>{children}</MyContext.Provider>
  );
};

export default MyContext;
