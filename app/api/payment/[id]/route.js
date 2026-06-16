import dbConnect from "@/lib/mongoose";
import PaymentRecord from "@/models/paymentRecord";

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    const deletedPayment = await PaymentRecord.findByIdAndDelete(params.id);

    if (!deletedPayment) {
      return Response.json({ message: "Payment not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Payment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `Couldn't delete the payment, ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const payload = await request.json();
    const updatedPayment = await PaymentRecord.findByIdAndUpdate(
      params.id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPayment) {
      return Response.json({ message: "Payment not found" }, { status: 404 });
    }

    return Response.json(updatedPayment, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `Couldn't update the payment, ${error.message}` },
      { status: 500 }
    );
  }
}
