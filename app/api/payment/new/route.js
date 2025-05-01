import dbConnect from "@/lib/mongoose";
import Payment from "@/models/payment";
export async function POST(request, res) {
  try {
    await dbConnect();

    const payment = await request.json();

    const newPayment = new Payment(payment);
    await newPayment.save();
    return new Response("Payment Created Successfully", { status: 201 });
  } catch (error) {
    console.error("Error in Creating a new Payment", error);
    return new Response(error.message, { status: 500 });
  }
}
