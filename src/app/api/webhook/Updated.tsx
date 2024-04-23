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

export const subscriptionUpdated = async(request: Request, res: NextApiResponse) => {
  const event = await request.json();
    if (request.method === "POST") {
      if(event.type === 'invoice.paid') {

        const clientReferenceId = event.data.object.client_reference_id;
        console.log(`クライアントID: ${clientReferenceId}`)
        
        const subscriptionId = event.data.object.subscription;
        console.log(`サブスクリプションID: ${subscriptionId}`)

        //API叩く
        const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        
        //終了日付を再取得
        const endTimestamp = subscription.current_period_end;
          console.log("エンドタイムを受け取りました：", endTimestamp);
        const endDate = unixToISODateString(endTimestamp);
          console.log(endDate);

        if (clientReferenceId && subscriptionId && endDate) {
        try {
          const subscription = await db.subscription.update({
            where: {
              subscriptionId: subscriptionId,
            }, //★★★★★★★★★★
            data: {
              endDate: endDate,
            },
          });
          console.log("データベースを更新しました",subscription);

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

  