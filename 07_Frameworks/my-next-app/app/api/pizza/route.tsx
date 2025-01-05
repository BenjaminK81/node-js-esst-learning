import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        orders: [
            {
                pizza: 'Original',
                price: '12.50'
            },
            {
                pizza: 'Crazy Dog',
                price: '10.50'
            }
        ]
    });
}