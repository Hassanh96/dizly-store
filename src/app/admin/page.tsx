// src/app/admin/page.tsx

// 1. تعريف الواجهات (Interfaces) لضمان نوع البيانات (TypeScript)
interface AdminDashboardProps {
  // يمكنك إضافة خصائص هنا إذا كانت الصفحة تستقبل بيانات
}

// 2. دالة الصفحة الرئيسية
export default function AdminPage() {
  
  // هنا يمكنك إضافة المنطق الخاص بك لاحقاً
  
  return (
    <main className="p-8">
      {/* رأس الصفحة */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          لوحة التحكم ⚙️
        </h1>
        <p className="text-gray-600">أهلاً بك في منطقة الإدارة.</p>
      </header>

      {/* محتوى الصفحة */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">نظرة عامة</h2>
        <div className="border border-dashed border-gray-300 p-10 text-center rounded">
          <p>سيتم عرض البيانات هنا...</p>
          {/* يمكنك استدعاء مكونات أخرى هنا */}
        </div>
      </section>
    </main>
  );
}