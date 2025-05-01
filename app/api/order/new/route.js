import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
export async function POST(request,res) {
  try {
    await dbConnect();
    
    const order = await request.json();
    
    const newOrder = new Order(order);
    await newOrder.save();
    return new Response("Order Created Successfully", { status: 201 });
  } catch (error) {
    console.error("Error in Creating a new order", error);
    return new Response(error.message, { status: 500 });
  }
}
