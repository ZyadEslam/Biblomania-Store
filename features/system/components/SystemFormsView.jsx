"use client";

import { memo } from "react";
import ContainerCard from "@/shared/ui/ContainerCard";
import TogglePills from "@/shared/ui/TogglePills";

const FORM_TOGGLE_OPTIONS = [
  { value: "order", label: "أوردر جديد" },
  { value: "payment", label: "مصروف جديد" },
];

const SystemFormsView = ({ activeForm, onFormChange, children }) => {
  return (
    <ContainerCard className="panel-shell lg:sticky lg:top-6">
      <div className="section-heading">
        <div>
          <p className="eyebrow">الإدخال السريع</p>
          <h2>سجل البيانات الجديدة</h2>
        </div>
      </div>

      <TogglePills
        options={FORM_TOGGLE_OPTIONS}
        activeValue={activeForm}
        onChange={onFormChange}
      />

      {children}
    </ContainerCard>
  );
};

export default memo(SystemFormsView);
