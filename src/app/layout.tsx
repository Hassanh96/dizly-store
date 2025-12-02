import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

// استيراد المزودات (Context Providers)
import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";

// استيراد المكونات الثابتة
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

// إعداد الخط العربي
const cairo = Cairo({ subsets: ["arabic"] });

// كائن البيانات الوصفية (Metadata)
export const metadata: Metadata = {
  title: "متجر DİZLY | وجهتك الأولى للأزياء",
  description: "تسوق أفضل المنتجات العصرية بأسعار منافسة في العراق. متجر DİZLY يقدم تجربة تسوق فريدة مع تشكيلة واسعة من الملابس والإكسسوارات.",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 👇👇 التعديل الأساسي هنا: إضافة suppressHydrationWarning
    <html lang="ar" dir="rtl" suppressHydrationWarning={true}>
      <body className={cairo.className}>
        {/* ترتيب المزودات: البيانات العامة > السلة > الطلبات */}
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              
              {/* الرأس يظهر في جميع الصفحات */}
              <Header />

              {/* المحتوى المتغير للصفحات */}
              <main className="min-h-screen">
                {children}
              </main>

              {/* التذييل يظهر في جميع الصفحات */}
              <Footer />

              {/* نافذة التنبيهات */}
              <Toaster position="top-center" reverseOrder={false} />

            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}