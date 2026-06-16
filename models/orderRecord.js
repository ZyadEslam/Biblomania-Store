import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    "رقم الاوردر": {
      type: Number,
      required: true,
      unique: true,
    },
    "اسم العميل": {
      type: String,
      required: true,
      trim: true,
    },
    العنوان: {
      type: String,
      required: true,
      trim: true,
    },
    "اجمالي السعر": {
      type: Number,
      required: true,
    },
    "رقم التليفون": {
      type: String,
      required: true,
      trim: true,
    },
    التاريخ: {
      type: Date,
      required: true,
    },
    "مصاريف الشحن": {
      type: Number,
      required: true,
      default: 0,
    },
    ملاحظات: {
      type: String,
      default: "",
      trim: true,
    },
    الاوردر: {
      type: String,
      required: true,
      trim: true,
    },
    "حالة الشحن": {
      type: String,
      enum: ["تم الشحن", "لم يتم الشحن"],
      default: "لم يتم الشحن",
    },
  },
  {
    timestamps: true,
  }
);

const OrderRecord =
  mongoose.models.OrderRecord || mongoose.model("OrderRecord", OrderSchema);

export default OrderRecord;
