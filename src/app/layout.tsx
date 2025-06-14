import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond,Abril_Fatface } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Top_Nav from '@/components/top_nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
});
const abril = Abril_Fatface({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-abril'
});

export const metadata: Metadata = {
  title: "Golden Elegance | Luxury Jewelry",
  description: "Discover exquisite, handcrafted jewelry pieces designed for success.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} ${abril.variable} font-sans pb-16 md:pb-0`}>
        <Top_Nav />
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}