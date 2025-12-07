import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// استيراد المزودات (تأكد أن المسارات صحيحة)
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ali Store",
  description: "متجر علي الإلكتروني",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        {/* هام جداً: ترتيب التغليف
          نضع ProductProvider في الأعلى (أو العكس)، المهم أن يحيطوا بالمحتوى
        */}
        <ProductProvider>
          <CartProvider>
            <main className="min-h-screen bg-gray-50">
               {children}
            </main>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}