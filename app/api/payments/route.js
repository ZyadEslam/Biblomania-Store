import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
import Payment from "@/models/payment";
export async function GET() {
  try {
    await dbConnect();
    const payments = await Payment.find({});
    console.log(payments);
    return new Response(JSON.stringify(payments), { status: 200 });
  } catch (error) {
    console.error("Couldn't fetch the payments");
    return new Response("Couldn't fetch the payments", { status: 500 });
  }
}
