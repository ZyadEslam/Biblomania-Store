import React from "react";

const ContainerCard = ({ children, className }) => {
  return (
    <section
      className={`container-card shadow-[1px_1px_10px_rgba(0,0,0,0.5)] max-h-[600] overflow-y-scroll rounded-lg p-6 scroll-smooth ${className}`}
    >
      {children}
    </section>
  );
};

export default ContainerCard;
