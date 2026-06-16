import dbConnect from "@/lib/mongoose";
import PaymentRecord from "@/models/paymentRecord";

export async function GET() {
  try {
    await dbConnect();
    const payments = await PaymentRecord.find({})
      .sort({ "رقم العمليه": -1 })
      .lean();

    return Response.json(payments, { status: 200 });
  } catch (error) {
    console.error("Couldn't fetch the payments", error);
    return Response.json(
      { message: "Couldn't fetch the payments" },
      { status: 500 }
    );
  }
}
