import Nav from "@/components/Nav";
import React from "react";

const SystemLayout = ({ children }) => {
  return (
    <div className="w-100 h-screen flex items-center flex-col">
      <Nav />
      {children}
    </div>
  );
};

export default SystemLayout;
