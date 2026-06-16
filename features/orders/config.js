import { SHIPPING_STATUS } from "@/shared/config/shippingStatus";
import {
  createCompositeSummary,
} from "@/shared/lib/recordUtils";

export const ORDER_CONFIG = {
  type: "order",
  label: "الأوردرات",
  singularLabel: "أوردر",
  formLabel: "إضافة أوردر جديد",
  numberKey: "رقم الاوردر",
  nameKey: "اسم العميل",
  addressKey: "العنوان",
  dateKey: "التاريخ",
  totalKey: "اجمالي السعر",
  notesKey: "ملاحظات",
  summaryKey: "الاوردر",
  shippingKey: "مصاريف الشحن",
  statusKey: "حالة الشحن",
  primaryFields: ["رقم الاوردر", "اسم العميل", "التاريخ"],
  searchNamePlaceholder: "ابحث باسم العميل",
  searchNumberPlaceholder: "ابحث برقم الاوردر",
  itemNameLabel: "اسم الكتاب",
  itemPriceLabel: "سعر الكتاب",
  summaryEmptyText: "بدون كتب",
  addItemLabel: "أضف كتابا جديدا",
  removeItemLabel: "احذف آخر كتاب",
  submitLabel: "حفظ الأوردر",
  statsLabel: "إجمالي الأوردرات",
  emptyListMessage: "لا توجد أوردرات مطابقة للبحث الحالي.",
  loadMoreLabel: "عرض المزيد من الأوردرات",
};

export const ORDER_DEFAULTS = {
  "اسم العميل": "",
  العنوان: "",
  "رقم التليفون": "",
  التاريخ: new Date().toISOString().slice(0, 10),
  "مصاريف الشحن": 0,
  ملاحظات: "",
  "حالة الشحن": SHIPPING_STATUS.pending,
};

export const buildOrderPayload = (values, items, totalPrice, orderNumber) => ({
  "رقم الاوردر": orderNumber,
  "اسم العميل": values["اسم العميل"].trim(),
  العنوان: values.العنوان.trim(),
  "اجمالي السعر": totalPrice,
  "رقم التليفون": values["رقم التليفون"].trim(),
  التاريخ: values.التاريخ,
  "مصاريف الشحن": Number(values["مصاريف الشحن"] || 0),
  ملاحظات: values.ملاحظات.trim(),
  الاوردر: createCompositeSummary(items, ORDER_CONFIG.summaryEmptyText),
  "حالة الشحن": values["حالة الشحن"],
});

export const getOrderSummary = (order) =>
  order?.[ORDER_CONFIG.summaryKey] || ORDER_CONFIG.summaryEmptyText;

export const ORDER_EDITABLE_FIELDS = [
  ORDER_CONFIG.numberKey,
  ORDER_CONFIG.nameKey,
  ORDER_CONFIG.addressKey,
  "رقم التليفون",
  ORDER_CONFIG.dateKey,
  ORDER_CONFIG.shippingKey,
  ORDER_CONFIG.totalKey,
  ORDER_CONFIG.summaryKey,
  ORDER_CONFIG.notesKey,
  ORDER_CONFIG.statusKey,
];

export const ORDER_NUMERIC_FIELDS = [
  ORDER_CONFIG.numberKey,
  ORDER_CONFIG.totalKey,
  ORDER_CONFIG.shippingKey,
];
