import dbConnect from "@/lib/mongoose";
import PaymentRecord from "@/models/paymentRecord";

export async function POST(request) {
  try {
    await dbConnect();
    const payload = await request.json();
    const payment = await PaymentRecord.create(payload);

    return Response.json(payment, { status: 201 });
  } catch (error) {
    console.error("Error in creating a new payment", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
