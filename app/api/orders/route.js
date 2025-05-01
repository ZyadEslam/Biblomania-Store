import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
import Payment from "@/models/payment";
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({});
    console.log(orders);
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Couldn't fetch the orders");
    return new Response("Couldn't fetch the orders", { status: 500 });
  }
}
