import db from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';

let clientReferenceId: string | null = null;
let subscriptionId : string | null = null;

export async function POST(request: Request, res: NextApiResponse) {
  console.log(request.method)


  if (request.method === "POST") {
    const event = await request.json();
    console.log(event)

    if(event.type === 'checkout.session.completed') {
      clientReferenceId = event.data.object.client_reference_id;
      console.log(`クライアントIDを受け取りました: ${clientReferenceId}`)
      
      subscriptionId = event.data.object.subscription;
      console.log(`サブスクリプションIDを受け取りました: ${subscriptionId}`)

      if (clientReferenceId && subscriptionId) {
      try {
        const subscription = await db.subscription.create({
          data: {
            clientId: clientReferenceId,
            subscriptionId: subscriptionId,
          },
        });
        console.log("データベースに保存しました",subscription);
      } catch(error) {
        console.error("データベースへの保存中にエラーが発生しました",error)
        return NextResponse.json({error: 'データベースエラー'},{status:500})
      }} else {
        // clientReferenceId または subscriptionId が null の場合の処理
        console.error("clientReferenceId または subscriptionId が null です。");
        return NextResponse.json({ error: 'クライアントIDまたはサブスクリプションIDがnullです' }, { status: 400 });};
    }
    return NextResponse.json({ received: true});
  }

  return NextResponse.json({ error: 'Error' }, { status: 405 })
  
}