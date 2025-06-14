import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }
    if (!process.env.SENDGRID_FROM_EMAIL) {
      throw new Error('SENDGRID_FROM_EMAIL is not configured');
    }
    if (!process.env.ADMIN_EMAIL) {
      throw new Error('ADMIN_EMAIL is not configured');
    }

    const orderDetails = await request.json();
    console.log('Processing order:', orderDetails.orderId);
    console.log('Customer email:', orderDetails.customerEmail);

    // Validate customer email
    if (!orderDetails.customerEmail || !orderDetails.customerEmail.includes('@')) {
      throw new Error('Invalid customer email address');
    }

    // Send email to admin
    const adminMsg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `New Order #${orderDetails.orderId}`,
      text: `
New Order Received!

Order ID: ${orderDetails.orderId}

Customer Details:
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}
Phone: ${orderDetails.customerPhone}

Shipping Address:
${orderDetails.shippingAddress}
${orderDetails.city}, ${orderDetails.state} ${orderDetails.zipCode}

Order Items:
${orderDetails.items.map((item: any) => 
  `${item.name} - Quantity: ${item.quantity} - Price: Rs.${item.price.toLocaleString()}`
).join('\n')}

Total Amount: Rs.${orderDetails.total.toLocaleString()}
      `,
      html: `
        <h2>New Order Received!</h2>
        <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
        
        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${orderDetails.customerName}</p>
        <p><strong>Email:</strong> ${orderDetails.customerEmail}</p>
        <p><strong>Phone:</strong> ${orderDetails.customerPhone}</p>
        
        <h3>Shipping Address:</h3>
        <p>
          ${orderDetails.shippingAddress}<br>
          ${orderDetails.city}, ${orderDetails.state} ${orderDetails.zipCode}
        </p>
        
        <h3>Order Items:</h3>
        <ul>
          ${orderDetails.items.map((item: any) => `
            <li>
              ${item.name} - Quantity: ${item.quantity} - Price: Rs.${item.price.toLocaleString()}
            </li>
          `).join('')}
        </ul>
        
        <h3>Total Amount: Rs.${orderDetails.total.toLocaleString()}</h3>
      `,
    };

    // Send email to customer
    const customerMsg = {
      to: orderDetails.customerEmail,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Order Confirmation #${orderDetails.orderId}`,
      text: `
Thank you for your order!

Order ID: ${orderDetails.orderId}

Order Items:
${orderDetails.items.map((item: any) => 
  `${item.name} - Quantity: ${item.quantity} - Price: Rs.${item.price.toLocaleString()}`
).join('\n')}

Total Amount: Rs.${orderDetails.total.toLocaleString()}

We will contact you shortly to confirm your order and provide further details about delivery.

Best regards,
Shahzaib Jewelry Team
      `,
      html: `
        <h2>Thank you for your order!</h2>
        <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
        
        <h3>Order Items:</h3>
        <ul>
          ${orderDetails.items.map((item: any) => `
            <li>
              ${item.name} - Quantity: ${item.quantity} - Price: Rs.${item.price.toLocaleString()}
            </li>
          `).join('')}
        </ul>
        
        <h3>Total Amount: Rs.${orderDetails.total.toLocaleString()}</h3>
        
        <p>We will contact you shortly to confirm your order and provide further details about delivery.</p>
        
        <p>Best regards,<br>Shahzaib Jewelry Team</p>
      `,
    };

    // Send emails one at a time to better handle errors
    try {
      console.log('Sending admin email...');
      const adminResponse = await sgMail.send(adminMsg);
      console.log('Admin email sent successfully:', adminResponse);
    } catch (adminError: any) {
      console.error('Failed to send admin email:', adminError);
      if (adminError.response) {
        console.error('Admin email error details:', adminError.response.body);
      }
      throw new Error('Failed to send admin notification');
    }

    try {
      console.log('Sending customer email to:', orderDetails.customerEmail);
      const customerResponse = await sgMail.send(customerMsg);
      console.log('Customer email sent successfully:', customerResponse);
    } catch (customerError: any) {
      console.error('Failed to send customer email:', customerError);
      if (customerError.response) {
        console.error('Customer email error details:', customerError.response.body);
      }
      throw new Error('Failed to send customer confirmation');
    }

    return NextResponse.json({ 
      success: true,
      message: 'Emails sent successfully',
      details: {
        adminEmail: process.env.ADMIN_EMAIL,
        customerEmail: orderDetails.customerEmail
      }
    });
  } catch (error: any) {
    console.error('Error in send-email route:', error);
    
    // Log detailed error information
    if (error.response) {
      console.error('SendGrid API Error:', {
        status: error.response.status,
        body: error.response.body,
        headers: error.response.headers
      });
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send emails',
        details: error.response?.body || null
      },
      { status: 500 }
    );
  }
} 