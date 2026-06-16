import dbConnect from "@/lib/mongoose";
import OrderRecord from "@/models/orderRecord";

export async function GET() {
  try {
    await dbConnect();
    const orders = await OrderRecord.find({})
      .sort({ "رقم الاوردر": -1 })
      .lean();

    return Response.json(orders, { status: 200 });
  } catch (error) {
    console.error("Couldn't fetch the orders", error);
    return Response.json({ message: "Couldn't fetch the orders" }, { status: 500 });
  }
}
