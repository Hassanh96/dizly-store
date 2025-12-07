// استيراد الدوال اللازمة من مكتبة firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚠️ هام جداً: استبدل هذه القيم بالقيم التي نسختها من موقع Firebase Console
const firebaseConfig = {
  apiKey: "ضع_الـ_apiKey_الخاص_بك_هنا",
  authDomain: "ضع_الـ_authDomain_هنا",
  projectId: "ضع_الـ_projectId_هنا",
  storageBucket: "ضع_الـ_storageBucket_هنا",
  messagingSenderId: "ضع_الرقم_هنا",
  appId: "ضع_الـ_appId_هنا"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// المشكلة كانت هنا: يجب إضافة كلمة export قبل const db
// هذا يسمح للملفات الأخرى (مثل ProductContext) باستخدام قاعدة البيانات
export const db = getFirestore(app);