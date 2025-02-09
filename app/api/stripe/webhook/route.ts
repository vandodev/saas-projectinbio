import { db } from "@/app/lib/firebase";
 import stripe from "@/app/lib/stripe";
 import { NextRequest, NextResponse } from "next/server";
 import Stripe from "stripe";
 
 export async function POST(req: NextRequest) {
   try {
     const body = await req.text();
     const signature = req.headers.get("stripe-signature");
 
     const secret = process.env.STRIPE_WEBHOOK_SECRET;
 
     if (!signature || !secret) {
       return new Error("Stripe webhook secret is not set");
     }
 
     const event = stripe.webhooks.constructEvent(body, signature, secret);
 
        switch (event.type) {
            case "checkout.session.completed":
                // Usuario completou o checkout - assinatura ou pagamento unico
                // console.log("usuário completou o checkout")
                if (event.data.object.payment_status === "paid") {
                const userId = event.data.object.client_reference_id;
                if (userId) {
                    await db.collection("users").doc(userId).update({
                    isSubscribed: true,
                    });
                }
                }
        

                break;
            case "checkout.session.async_payment_succeeded":
                // Usuario pagou o boleto      
                break;
            case "customer.subscription.deleted":
                // Usuario cancelou a assinatura        
                break;
            default :
            console.log(`Unhand event type ${event.type}`)
        }
 
     return new NextResponse(null, { status: 200 });
   } catch (error) {
     console.error("Stripe webhook error", error);
     return new NextResponse(null, { status: 500 });
   }
}