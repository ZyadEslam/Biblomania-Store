import { memo } from "react";

const ContainerCard = ({ children, className = "" }) => {
  return (
    <section className={`container-card max-h-[600px] overflow-y-auto scroll-smooth ${className}`}>
      {children}
    </section>
  );
};

export default memo(ContainerCard);
