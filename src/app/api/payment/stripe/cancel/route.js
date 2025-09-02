import prisma from "@/lib/db";

export async function GET(req) {
    const url = new URL(req.url);
    const transaction = url.searchParams.get("transaction");
  
    // DB update
    await prisma.enrollClass.updateMany({
      where: { transactionId: transaction },
      data: { status: "cancel" },
    });
  
    // redirect user
    return Response.redirect(`${process.env.BASE_URL}/payment/cancel`);
  }
  