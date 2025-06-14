import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_API;
if (!PUBLIC_KEY) {
  console.error('EmailJS public key is not defined in environment variables');
}

emailjs.init(PUBLIC_KEY || '');

// Template IDs - Replace these with your actual template IDs from EmailJS
const TEMPLATE_IDS = {
  ORDER_CONFIRMATION: 'template_kfc7czb',
  ADMIN_NOTIFICATION: 'template_c4zy3le',
};

// Service ID - Replace with your actual service ID from EmailJS
const SERVICE_ID = 'service_65zronq';

interface OrderEmailData {
  orderNumber: string;
  orderDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export const sendOrderConfirmationEmail = async (data: OrderEmailData) => {
  try {
    console.log('Sending order confirmation email with data:', data);
    
    const templateParams = {
      orderNumber: data.orderNumber,
      orderDate: data.orderDate,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      phone: data.phone,
      items: data.items,
      totalAmount: data.totalAmount.toString(),
    };

    console.log('Template params:', templateParams);
    console.log('Service ID:', SERVICE_ID);
    console.log('Template ID:', TEMPLATE_IDS.ORDER_CONFIRMATION);
    console.log('Public Key:', PUBLIC_KEY);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_IDS.ORDER_CONFIRMATION,
      templateParams,
      PUBLIC_KEY
    );
    
    console.log('EmailJS response:', response);
    return response;
  } catch (error) {
    console.error('Detailed error sending order confirmation email:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

export const sendAdminNotificationEmail = async (data: OrderEmailData) => {
  try {
    console.log('Sending admin notification email with data:', data);
    
    const templateParams = {
      orderNumber: data.orderNumber,
      orderDate: data.orderDate,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      items: data.items,
      totalAmount: data.totalAmount.toString(),
    };

    console.log('Template params:', templateParams);
    console.log('Service ID:', SERVICE_ID);
    console.log('Template ID:', TEMPLATE_IDS.ADMIN_NOTIFICATION);
    console.log('Public Key:', PUBLIC_KEY);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_IDS.ADMIN_NOTIFICATION,
      templateParams,
      PUBLIC_KEY
    );
    
    console.log('EmailJS response:', response);
    return response;
  } catch (error) {
    console.error('Detailed error sending admin notification email:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}; 