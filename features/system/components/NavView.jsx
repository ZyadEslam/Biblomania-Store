"use client";
import Image from "next/image";
import { useOrders } from "@/features/orders";
import { usePayments } from "@/features/payments";

const NavView = () => {
  const { orders, ordersTotal } = useOrders();
  const { payments, paymentsTotal } = usePayments();

  return (
    <div className="flex w-full">
      <nav className="sys-nav w-[100%]">
        <Image
          src={"/assets/images/nav.png"}
          alt="Brand Pattern"
          className="w-[70%] h-full object-contain"
          width={800}
          height={200}
        />
        <div className="nav-stats">
          <article className="nav-stat-card">
            <span>الأوردرات</span>
            <strong>{orders.length}</strong>
            <small>{ordersTotal} جنيه</small>
          </article>
          <article className="nav-stat-card">
            <span>المصروفات</span>
            <strong>{payments.length}</strong>
            <small>{paymentsTotal} جنيه</small>
          </article>
        </div>
      </nav>
    </div>
  );
};

export default NavView;
