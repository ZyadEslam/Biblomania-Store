import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    "رقم العمليه": {
      type: Number,
      required: true,
      unique: true,
    },
    "اسم التاجر": {
      type: String,
      required: true,
      trim: true,
    },
    العنوان: {
      type: String,
      required: true,
      trim: true,
    },
    الاصناف: {
      type: String,
      required: true,
      trim: true,
    },
    "اجمالي السعر": {
      type: Number,
      required: true,
    },
    المواصلات: {
      type: Number,
      required: true,
      default: 0,
    },
    ملاحظات: {
      type: String,
      default: "",
      trim: true,
    },
    التاريخ: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentRecord =
  mongoose.models.PaymentRecord ||
  mongoose.model("PaymentRecord", PaymentSchema);

export default PaymentRecord;
