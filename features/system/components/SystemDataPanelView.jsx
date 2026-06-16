"use client";

import { memo } from "react";
import ContainerCard from "@/shared/ui/ContainerCard";
import TogglePills from "@/shared/ui/TogglePills";
import Field from "@/shared/ui/Field";

const VIEW_TOGGLE_OPTIONS = [
  { value: "order", label: "الأوردرات" },
  { value: "payment", label: "المصروفات" },
];

const SystemDataPanelView = ({
  activeView,
  onViewChange,
  currentCount,
  currentTotal,
  searchNameValue,
  searchNumberValue,
  searchNamePlaceholder,
  searchNumberPlaceholder,
  onSearchNameChange,
  onSearchNumberChange,
  children,
}) => {
  return (
    <ContainerCard className="panel-shell panel-shell--wide">
      <div className="section-heading">
        <div>
          <p className="eyebrow">لوحة المتابعة</p>
          <h2>الأوردرات والمصروفات الحالية</h2>
        </div>
        <div className="stats-inline">
          <span className="summary-pill">{currentCount} سجل</span>
          <span className="summary-pill">{currentTotal} جنيه</span>
        </div>
      </div>

      <TogglePills
        options={VIEW_TOGGLE_OPTIONS}
        activeValue={activeView}
        onChange={onViewChange}
      />

      <div className="pair-grid">
        <Field
          label="بحث بالاسم"
          name="searchName"
          type="text"
          value={searchNameValue}
          onChange={onSearchNameChange}
          placeholder={searchNamePlaceholder}
        />
        <Field
          label="بحث بالرقم"
          name="searchNumber"
          type="text"
          value={searchNumberValue}
          onChange={onSearchNumberChange}
          placeholder={searchNumberPlaceholder}
        />
      </div>

      {children}
    </ContainerCard>
  );
};

export default memo(SystemDataPanelView);
