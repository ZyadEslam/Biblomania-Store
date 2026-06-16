import {
  createCompositeSummary,
} from "@/shared/lib/recordUtils";

export const PAYMENT_CONFIG = {
  type: "payment",
  label: "المصروفات",
  singularLabel: "مصروف",
  formLabel: "إضافة مصروف جديد",
  numberKey: "رقم العمليه",
  nameKey: "اسم التاجر",
  addressKey: "العنوان",
  dateKey: "التاريخ",
  totalKey: "اجمالي السعر",
  notesKey: "ملاحظات",
  summaryKey: "الاصناف",
  transportKey: "المواصلات",
  primaryFields: ["رقم العمليه", "اسم التاجر", "التاريخ"],
  searchNamePlaceholder: "ابحث باسم التاجر",
  searchNumberPlaceholder: "ابحث برقم العملية",
  itemNameLabel: "اسم الصنف",
  itemPriceLabel: "سعر الصنف",
  summaryEmptyText: "بدون أصناف",
  addItemLabel: "أضف صنفا جديدا",
  removeItemLabel: "احذف آخر صنف",
  submitLabel: "حفظ المصروف",
  statsLabel: "إجمالي المصروفات",
  emptyListMessage: "لا توجد مصروفات مطابقة للبحث الحالي.",
  loadMoreLabel: "عرض المزيد من المصروفات",
};

export const PAYMENT_DEFAULTS = {
  "اسم التاجر": "",
  العنوان: "",
  المواصلات: 0,
  التاريخ: new Date().toISOString().slice(0, 10),
  ملاحظات: "",
};

export const buildPaymentPayload = (values, items, totalPrice, paymentNumber) => ({
  "رقم العمليه": paymentNumber,
  "اسم التاجر": values["اسم التاجر"].trim(),
  العنوان: values.العنوان.trim(),
  الاصناف: createCompositeSummary(items, PAYMENT_CONFIG.summaryEmptyText),
  "اجمالي السعر": totalPrice,
  المواصلات: Number(values.المواصلات || 0),
  ملاحظات: values.ملاحظات.trim(),
  التاريخ: values.التاريخ,
});

export const getPaymentSummary = (payment) =>
  payment?.[PAYMENT_CONFIG.summaryKey] || PAYMENT_CONFIG.summaryEmptyText;

export const PAYMENT_EDITABLE_FIELDS = [
  PAYMENT_CONFIG.numberKey,
  PAYMENT_CONFIG.nameKey,
  PAYMENT_CONFIG.addressKey,
  PAYMENT_CONFIG.dateKey,
  PAYMENT_CONFIG.transportKey,
  PAYMENT_CONFIG.totalKey,
  PAYMENT_CONFIG.summaryKey,
  PAYMENT_CONFIG.notesKey,
];

export const PAYMENT_NUMERIC_FIELDS = [
  PAYMENT_CONFIG.numberKey,
  PAYMENT_CONFIG.totalKey,
  PAYMENT_CONFIG.transportKey,
];
