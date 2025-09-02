import Stripe from "stripe";
import prisma from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeController = async ({ findUser, classData, transaction }) => {
  
  try {
    await prisma.enrollClass.create({
      data: {
        name: findUser.name,
        classId: classData.id,
        userId: findUser.id,
        status: "pending",
        transactionId: transaction,
        type: "stripe",
      },
    });

    // 2. Stripe Checkout Session create
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: classData.name,
            },
            unit_amount: classData.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/api/payment/stripe/success?transaction=${transaction}`,
      cancel_url: `${process.env.BASE_URL}/api/payment/stripe/cancel?transaction=${transaction}`,
      metadata: {
        transactionId: transaction,
        userId: findUser.id,
        classId: classData.id,
      },
    });

    // 3. Redirect URL return
    return { url: session.url, success: true };
  } catch (err) {
    return { success: false, msg: err.message };
  }
};
