import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  "رقم الاوردر": {
    type: Number,
    required: true,
  },
  "اسم العميل": {
    type: String,
    required: true,
  },
  العنوان: {
    type: String,
    required: true,
  },
  "اجمالي السعر": {
    type: Number,
    required: true,
  },
  "رقم التليفون": {
    type: String,
    required: true,
  },
  التاريخ: {
    type: Date,
    required: true,
  },
  "مصاريف الشحن": {
    type: Number,
    required: true,
  },
  ملاحظات: {
    type: String,
    required: true,
  },
  الاوردر: {
    type: String,
    required: true,
  },
  "حالة الشحن": {
    type: String,
    required: true,
  },
});
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema); // see if the user is already exist & if not create a new one
export default Order;
