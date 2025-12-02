import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4" dir="rtl">
      <h1 className="text-9xl font-extrabold text-indigo-200">404</h1>
      <h2 className="text-4xl font-bold text-gray-800 mt-4">عذراً، الصفحة غير موجودة</h2>
      <p className="text-xl text-gray-600 mt-4 mb-8">
        يبدو أنك ضللت الطريق! الصفحة التي تبحث عنها قد تكون حُذفت أو أن الرابط غير صحيح.
      </p>
      <Link 
        href="/" 
        className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
      >
        العودة للصفحة الرئيسية 🏠
      </Link>
    </div>
  );
}