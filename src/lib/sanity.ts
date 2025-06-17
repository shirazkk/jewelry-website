import { client } from "@/sanity/lib/client";
import { Order } from "@/types/order";

export async function createOrder(orderData: Order) {
  try {
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
    return result;
  } catch (error) {
    console.error('Error creating order in Sanity:', error);
    throw error;
  }
} 