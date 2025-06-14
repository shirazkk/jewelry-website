import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function GET() {
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

    // Send a test email
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Test Email from Shahzaib Jewelry',
      text: 'This is a test email to verify SendGrid configuration.',
      html: '<h1>Test Email</h1><p>This is a test email to verify SendGrid configuration.</p>',
    };

    console.log('Sending test email...');
    console.log('From:', process.env.SENDGRID_FROM_EMAIL);
    console.log('To:', process.env.ADMIN_EMAIL);

    const response = await sgMail.send(msg);
    console.log('Test email sent successfully:', response);

    return NextResponse.json({ 
      success: true,
      message: 'Test email sent successfully',
      details: {
        from: process.env.SENDGRID_FROM_EMAIL,
        to: process.env.ADMIN_EMAIL,
        response: response
      }
    });
  } catch (error: any) {
    console.error('Error sending test email:', error);
    
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
        error: error.message || 'Failed to send test email',
        details: error.response?.body || null
      },
      { status: 500 }
    );
  }
} 