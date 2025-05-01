import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
  "رقم العمليه": {
    type: String,
    required: true,
  },
  "اسم التاجر": {
    type: String,
    required: true,
  },
  العنوان: {
    type: String,
    required: true,
  },
  الاصناف: {
    type: String,
    required: true,
  },
  "اجمالي السعر": {
    type: Number,
    required: true,
  },
  المواصلات: {
    type: Number,
    required: true,
  },
  ملاحظات: {
    type: String,
    required: true,
  },
  التاريخ: {
    type: Date,
    required: true,
  },
});
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema); // see if the user is already exist & if not create a new one
export default Payment;
