import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log("------ここからここから------")
    console.log(await request.json());
    return NextResponse.json("hello");
};  