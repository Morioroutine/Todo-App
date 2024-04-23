import db from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import { checkoutCompleted } from "./Checkout";
import { subscriptionUpdated } from "./Updated";

export async function POST(request: Request, res: NextApiResponse) {
  console.log(request.method)

  checkoutCompleted(request, res);
  

  };

 