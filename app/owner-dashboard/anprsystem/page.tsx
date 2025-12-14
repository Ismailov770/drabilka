    "use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OwnerAnprSystemPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the ANPR system URL
    window.location.href = 'http://192.168.199.249/#/home/dataRecord';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">ANPR tizimiga yo'naltirilmoqda...</h2>
        <p className="text-gray-600">
          Agar avtomatik ravishda yo'naltirilmasangiz, iltimos, quyidagi havolani bosing:
        </p>
        <a 
          href="http://192.168.199.249/#/home/dataRecord" 
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          ANPR Tizimiga O'tish
        </a>
      </div>
    </div>
  )
}