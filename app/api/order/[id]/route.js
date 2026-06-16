import dbConnect from "@/lib/mongoose";
import OrderRecord from "@/models/orderRecord";

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    const deletedOrder = await OrderRecord.findByIdAndDelete(params.id);

    if (!deletedOrder) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `Couldn't delete the order, ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const payload = await request.json();
    const updatedOrder = await OrderRecord.findByIdAndUpdate(params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json(updatedOrder, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `Couldn't update the order, ${error.message}` },
      { status: 500 }
    );
  }
}
