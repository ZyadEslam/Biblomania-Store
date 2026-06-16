import dbConnect from "@/lib/mongoose";
import OrderRecord from "@/models/orderRecord";

export async function POST(request) {
  try {
    await dbConnect();
    const payload = await request.json();
    const order = await OrderRecord.create(payload);

    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("Error in creating a new order", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
