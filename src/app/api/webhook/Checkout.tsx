import db from "@/lib/db";
import type { NextApiResponse } from "next";
import { NextResponse } from 'next/server';

const unixToISODateString = (unixTimeStamp: number): string => {
  if (!unixTimeStamp) {
    throw new Error("無効なUNIX timestampです");
  }
  const date = new Date(unixTimeStamp * 1000);
  return date.toISOString();
};

export const checkoutCompleted = async(request: Request, res: NextApiResponse) => {
  const event = await request.json();
    if (request.method === "POST") {
      if(event.type === 'checkout.session.completed') {

        const clientReferenceId = event.data.object.client_reference_id;
        console.log(`クライアントIDを受け取りました: ${clientReferenceId}`)
        
        const subscriptionId = event.data.object.subscription;
        console.log(`サブスクリプションIDを受け取りました: ${subscriptionId}`)

        //API叩く
        const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        
        //日付を取得
        const startTimestamp = subscription.current_period_start;
          console.log("スタートタイムを受け取りました：", startTimestamp);
        const startDate = unixToISODateString(startTimestamp);
          console.log(startDate);
        const endTimestamp = subscription.current_period_end;
          console.log("エンドタイムを受け取りました：", endTimestamp);
        const endDate = unixToISODateString(endTimestamp);
          console.log(endDate);

        if (clientReferenceId && subscriptionId && startDate && endDate) {
        try {
          const subscription = await db.subscription.create({
            data: {
              clientId: clientReferenceId,
              subscriptionId: subscriptionId,
              startDate: startDate, 
              endDate: endDate,
            },
          });
          console.log("データベースに保存しました",subscription);

        } catch(error) {
          console.error("データベースへの保存中にエラーが発生しました",error)
          return NextResponse.json({error: 'データベースエラー'},{status:500})
        
        }} else {
          console.error("必要な値 が null です。");
          return NextResponse.json({ error: '必要な値がnullです' }, { status: 400 });};
      }
      return NextResponse.json({ received: true});
    }
  
    return NextResponse.json({ error: 'Error' }, { status: 405 })
    
  }

  