import { NextRequest, NextResponse } from "next/server";
import  client  from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    const order = {
      _type: 'order',
      orderNumber: orderData.orderNumber,
      orderDate: new Date(orderData.orderDate).toISOString(),
      customer: {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
      },
      shippingAddress: {
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        zipCode: orderData.zipCode,
      },
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'pending',
    };

    const result = await client.create(order);
    return NextResponse.json({ success: true, order: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message || 'Unknown error' }, { status: 500 });
  }
} 