export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative flex flex-col items-center">
        {/* دائرة التحميل المتحركة */}
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-700 font-bold animate-pulse">جاري التحميل...</p>
      </div>
    </div>
  );
}