import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لمتجر DİZLY.
        </p>
        <div className="flex justify-center space-x-4 mt-4 rtl:space-x-reverse">
          <a href="#" className="hover:text-gray-400">سياسة الخصوصية</a>
          <a href="#" className="hover:text-gray-400">اتصل بنا</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;