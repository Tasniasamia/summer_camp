import prisma from "@/lib/db";

export const cancelSSLcommerze=async(req)=>{
    try{
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const amount = formData.get("amount");
    const currency = formData.get("currency");
   
    if (tran_id) {
      await prisma.enrollClass.update({
        where: { transactionId: tran_id },
        data: { status: "cancel" },
      });
    }
  
    return `http://localhost:3000/payment/cancel?tran_id=${tran_id}&amount=${amount}&currency=${currency}`
    
}
catch(err){
    return ({success:false,msg:err.message,status:500})
}
}