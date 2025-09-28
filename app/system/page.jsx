import { DataContainer, FormsContainer } from "@/components";
import React from "react";

const SystemPage = async () => {
  return (
    <div className="w-[90%] flex sm:flex-col lg:flex-row gap-8 mt-5">
      <FormsContainer />
      <DataContainer />
    </div>
  );
};

export default SystemPage;
