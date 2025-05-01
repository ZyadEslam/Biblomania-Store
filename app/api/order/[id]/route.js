import dbConnect from "@/lib/mongoose";
import Order from "@/models/order";
export const DELETE = async (request, { params }) => {
  const id = (await params).id;
  try {
    await dbConnect();
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return new Response("Order not found", { status: 404 });
    } else {
      await Order.deleteOne(existingOrder);
      return new Response("Order deleted successfully", { status: 200 });
    }
  } catch (error) {
    return new Response(`Couldn't delete the order, ${error}`, { status: 500 });
  }
};
export const PATCH = async (request, { params }) => {
  const id = (await params).id;
  const updatedOrder = await request.json();
  try {
    await dbConnect();
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return new Response("Order not found", { status: 404 });
    } else {
      await existingOrder.updateOne(updatedOrder);
      return new Response("Order updated successfully", { status: 200 });
    }
  } catch (error) {
    return new Response(`Couldn't Update the order, ${error}`, { status: 500 });
  }
};
