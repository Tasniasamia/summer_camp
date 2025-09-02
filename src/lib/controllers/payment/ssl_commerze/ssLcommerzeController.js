import prisma from "@/lib/db";

export const ssLcommerzeController=async({findUser,classData,transaction})=>{
    const data = {
        store_id: process.env.STORE_ID,
        store_passwd: process.env.STORE_PASSWORD,
        total_amount: classData.price,
        currency: "BDT",
        tran_id: transaction,
        success_url: `http://localhost:3000/api/payment/success`,
        fail_url: `http://localhost:3000/api/payment/fail`,
        cancel_url: `http://localhost:3000/api/payment/cancel`,
        cus_name: findUser.name,
        cus_email: findUser.email,
        cus_add1: findUser.address || "Dhaka",
        cus_phone: findUser.phone_number || "01921",
        cus_country: "Bangladesh",
        cus_city: "Dhaka",
        shipping_method: "NO",
        product_name: classData.name || "Test Product",
        product_category: "General",
        product_profile: "general",
        status: "pending",
      };
  
      // 5. Initiate payment
      const response = await fetch(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data),
        }
      );
  
      const result = await response.json();
      console.log("SSLCommerz result:", result);
  
      if (result.status === "SUCCESS") {
        // 6. Create enrollClass record
        const addEnroll = await prisma.enrollClass.create({
          data: {
            name: findUser.name,
            classId: classData?.id,
            userId: findUser?.id,
            status: "pending",
            transactionId: transaction,
            type:"sslcommerze"
          },
        });
  
        return { GatewayPageURL: result.GatewayPageURL, success: true };
      } else {
        return {
          success: false,
          msg: "Payment initiation failed",
          data: result,
          status: 400,
        };
      }
}