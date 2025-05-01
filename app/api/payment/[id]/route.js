import dbConnect from "@/lib/mongoose";
import Payment from "@/models/payment";
export const DELETE = async (request, { params }) => {
  const id = (await params).id;
  try {
    await dbConnect();
    const existingPayment = await Payment.findById(id);
    if (!existingPayment) {
      return new Response("Payment not found", { status: 404 });
    } else {
      await Payment.deleteOne(existingPayment);
      return new Response("Payment deleted successfully", { status: 200 });
    }
  } catch (error) {
    return new Response(`Couldn't delete the Payment, ${error}`, {
      status: 500,
    });
  }
};
export const PATCH = async (request, { params }) => {
  const id = (await params).id;
  const updatedPayment = await request.json();
  try {
    await dbConnect();
    const existingPayment = await Payment.findById(id);
    if (!existingPayment) {
      return new Response("Payment not found", { status: 404 });
    } else {
      await existingPayment.updateOne(updatedPayment);
      return new Response("Payment updated successfully", { status: 200 });
    }
  } catch (error) {
    return new Response(`Couldn't Update the Payment, ${error}`, {
      status: 500,
    });
  }
};
