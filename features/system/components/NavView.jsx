"use client";

import { memo } from "react";
import Image from "next/image";

const NavView = ({ ordersCount, ordersTotal, paymentsCount, paymentsTotal }) => {
  return (
    <nav className="sys-nav">
      <div className="brand-shell">
        <div className="brand-mark">
          <Image
            src="/assets/images/nav.png"
            alt="Biblomania"
            width={220}
            height={54}
            priority
            className="h-auto w-auto max-w-[180px] sm:max-w-[220px]"
          />
        </div>
        <div className="brand-copy">
          <p className="eyebrow">لوحة إدارة Biblomania</p>
          <h1>نظرة سريعة على الأوردرات والمصروفات</h1>
        </div>
      </div>

      <div className="nav-stats">
        <article className="nav-stat-card">
          <span>الأوردرات</span>
          <strong>{ordersCount}</strong>
          <small>{ordersTotal} جنيه</small>
        </article>
        <article className="nav-stat-card">
          <span>المصروفات</span>
          <strong>{paymentsCount}</strong>
          <small>{paymentsTotal} جنيه</small>
        </article>
      </div>
    </nav>
  );
};

export default memo(NavView);
