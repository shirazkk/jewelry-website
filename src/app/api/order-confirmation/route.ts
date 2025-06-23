import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import { Order } from '@/types/order';

  // OAuth2 configuration
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  
  // Set credentials
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
  
  // Create reusable transporter object using Gmail OAuth2
  const createTransporter = async () => {
    try {
      const accessToken = await oauth2Client.getAccessToken();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
          accessToken: accessToken.token || undefined,
        },
      });
  
      return transporter;
    } catch (error) {
      console.error('Error creating transporter:', error);
      throw error;
    }
  };
  
  // Generate HTML for order confirmation email
  const generateOrderConfirmationHTML = (data: Order) => {
    const itemsList = data.items.map(item => `
      <tr>
        <td style="padding: 16px; border-bottom: 1px solid #f0f0f0; font-weight: 500; color: #333;">${item.name}</td>
        <td style="padding: 16px; border-bottom: 1px solid #f0f0f0; text-align: center; color: #666;">${item.quantity}</td>
        <td style="padding: 16px; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: 600; color: #d4af37;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Confirmation - Shahzaib Jewelry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); padding: 40px 30px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: 1px;">✨ Order Confirmed</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Thank you for choosing Shahzaib Jewelry</p>
            </div>
          </div>
  
          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <!-- Order Summary Card -->
            <div style="background-color: #f8f9fa; padding: 24px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #d4af37;">
              <h2 style="margin: 0 0 16px 0; color: #333; font-size: 20px; font-weight: 600;">📋 Order Summary</h2>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #666; font-weight: 500;">Order Number:</span>
                <span style="color: #333; font-weight: 600;">#${data.orderNumber}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666; font-weight: 500;">Order Date:</span>
                <span style="color: #333; font-weight: 600;">${data.orderDate}</span>
              </div>
            </div>
  
            <!-- Shipping Information -->
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                🚚 <span style="margin-left: 8px;">Shipping Information</span>
              </h2>
              <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                <div style="margin-bottom: 12px;">
                  <strong style="color: #333; font-size: 16px;">${data.firstName} ${data.lastName}</strong>
                </div>
                <div style="color: #666; line-height: 1.8;">
                  ${data.address}<br>
                  ${data.city}, ${data.state} ${data.zipCode}<br>
                  📞 ${data.phone}
                </div>
              </div>
            </div>
  
            <!-- Order Items -->
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                💎 <span style="margin-left: 8px;">Order Items</span>
              </h2>
              <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f8f9fa;">
                      <th style="padding: 16px; text-align: left; font-weight: 600; color: #333; border-bottom: 2px solid #e9ecef;">Item</th>
                      <th style="padding: 16px; text-align: center; font-weight: 600; color: #333; border-bottom: 2px solid #e9ecef;">Qty</th>
                      <th style="padding: 16px; text-align: right; font-weight: 600; color: #333; border-bottom: 2px solid #e9ecef;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>
              </div>
            </div>
  
            <!-- Total Amount -->
            <div style="background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
              <h3 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Total Amount: $${data.totalAmount.toFixed(2)}
              </h3>
            </div>
  
            <!-- Support Information -->
            <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px; color: #666;">
              <p style="margin: 0 0 8px 0; font-size: 14px;">Need help with your order?</p>
              <p style="margin: 0; font-weight: 500;">
                📧 <a href="mailto:support@shahzaibjewelry.com" style="color: #d4af37; text-decoration: none;">support@shahzaibjewelry.com</a>
              </p>
            </div>
  
          </div>
  
          <!-- Footer -->
          <div style="background-color: #333; padding: 20px; text-align: center;">
            <p style="margin: 0; color: #ccc; font-size: 14px;">
              © 2025 Shahzaib Jewelry. All rights reserved.
            </p>
          </div>
  
        </div>
      </body>
      </html>
    `;
  };
  
  // Generate HTML for admin notification email
  const generateAdminNotificationHTML = (data: Order) => {
    const itemsList = data.items.map(item => `
      <tr>
        <td style="padding: 16px; border-bottom: 1px solid #f0f0f0; font-weight: 500; color: #333;">${item.name}</td>
        <td style="padding: 16px; border-bottom: 1px solid #f0f0f0; text-align: center; color: #666;">${item.quantity}</td>
        <td style="padding: 16px; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: 600; color: #dc3545;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>New Order Received - Shahzaib Jewelry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 40px 30px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: 1px;">🔔 New Order Alert</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">A new order has been placed</p>
            </div>
          </div>
  
          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <!-- Order Summary Card -->
            <div style="background-color: #fff3cd; padding: 24px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #ffc107;">
              <h2 style="margin: 0 0 16px 0; color: #333; font-size: 20px; font-weight: 600;">📋 Order Details</h2>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #666; font-weight: 500;">Order Number:</span>
                <span style="color: #333; font-weight: 600;">#${data.orderNumber}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666; font-weight: 500;">Order Date:</span>
                <span style="color: #333; font-weight: 600;">${data.orderDate}</span>
              </div>
            </div>
  
            <!-- Customer Information -->
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                👤 <span style="margin-left: 8px;">Customer Information</span>
              </h2>
              <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                <div style="margin-bottom: 16px;">
                  <strong style="color: #333; font-size: 16px;">${data.firstName} ${data.lastName}</strong>
                </div>
                <div style="color: #666; line-height: 1.8;">
                  📧 <a href="mailto:${data.email}" style="color: #dc3545; text-decoration: none;">${data.email}</a><br>
                  📞 <a href="tel:${data.phone}" style="color: #dc3545; text-decoration: none;">${data.phone}</a><br><br>
                  <strong style="color: #333;">Shipping Address:</strong><br>
                  ${data.address}<br>
                  ${data.city}, ${data.state} ${data.zipCode}
                </div>
              </div>
            </div>
  
            <!-- Order Items -->
            <div style="margin-bottom: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                📦 <span style="margin-left: 8px;">Order Items</span>
              </h2>
              <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f8f9fa;">
                      <th style="padding: 16px; text-align: left; font-weight: 600; color: #333; border-bottom: 2px solid #e9ecef;">Item</th>
                      <th style="padding: 16px; text-align: center; font-weight: 600; color: #333; border-bottom: 2px solid #e9ecef;">Qty</th>
                      <th style="padding: 16px; text-align: right; font-weight: 600; color: #333; border-bottom: 2px solid #e9ecef;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>
              </div>
            </div>
  
            <!-- Total Amount -->
            <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
              <h3 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Total Amount: $${data.totalAmount.toFixed(2)}
              </h3>
            </div>
  
            <!-- Action Required -->
            <div style="text-align: center; padding: 20px; background-color: #d1ecf1; border-radius: 8px; border: 1px solid #bee5eb;">
              <p style="margin: 0 0 8px 0; font-size: 16px; color: #0c5460; font-weight: 600;">⚡ Action Required</p>
              <p style="margin: 0; color: #0c5460; font-size: 14px;">
                Please process this order and prepare items for shipment
              </p>
            </div>
  
          </div>
  
          <!-- Footer -->
          <div style="background-color: #333; padding: 20px; text-align: center;">
            <p style="margin: 0; color: #ccc; font-size: 14px;">
              © 2025 Shahzaib Jewelry Admin Panel
            </p>
          </div>
  
        </div>
      </body>
      </html>
    `;
  };
  
  export async function POST(request: Request) {
    try {
      const orderData: Order = await request.json();
      const transporter = await createTransporter();
  
      // Send order confirmation to customer
      await transporter.sendMail({
        from: `"Shahzaib Jewelry" <${process.env.GMAIL_USER}>`,
        to: orderData.email,
        subject: `Order Confirmation - Order #${orderData.orderNumber}`,
        html: generateOrderConfirmationHTML(orderData),
      });
  
      // Send notification to admin
      await transporter.sendMail({
        from: `"Shahzaib Jewelry" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'shirazkk8@gmail.com',
        subject: `New Order Received - Order #${orderData.orderNumber}`,
        html: generateAdminNotificationHTML(orderData),
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error sending order confirmation emails:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send order confirmation emails.' },
        { status: 500 }
      );
    }
  }