"use client";

import { useState } from "react";
import Link from "next/link";

// প্রোডাক্ট ডেটা
const products = [
  {
    id: 1,
    name: "প্রিমিয়াম ব্লুটুথ হেডফোন",
    price: 4500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics"
  },
  {
    id: 2,
    name: "স্মার্ট ফিটনেস ওয়াচ",
    price: 3200,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Gadgets"
  },
  {
    id: 3,
    name: "লেদার ট্রাভেল ব্যাগ",
    price: 5800,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80",
    category: "Fashion"
  }
];

export default function Home() {
  // কার্টের জন্য রিঅ্যাক্ট স্টেট
  const [cart, setCart] = useState<{ id: number; name: string; price: number }[]>([]);

  // কার্টে প্রোডাক্ট যোগ করার ফাংশন
  const addToCart = (product: typeof products[0]) => {
    setCart([...cart, { id: product.id, name: product.name, price: product.price }]);
  };

  // মোট টাকার হিসাব
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* হেডার উইথ লাইভ কার্ট আইকন */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">PremiumShop</h1>
          <div className="flex items-center space-x-4">
            <nav className="space-x-4 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-blue-600">হোম</a>
              <a href="#" className="hover:text-blue-600">শপ</a>
            </nav>
            
            {/* লাইভ কার্ট বাটন */}
            <div className="relative bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* হিরো ব্যানার */}
      <section className="bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-extrabold mb-2">আমাদের প্রিমিয়াম ই-কমার্স</h2>
        <p className="text-blue-100 max-w-md mx-auto text-xs">
          সেরা মানের অরিজিনাল গ্যাজেট ও লাইফস্টাইল প্রোডাক্ট কিনুন সাশ্রয়ী মূল্যে।
        </p>
      </section>

      {/* লাইভ শপিং কার্ট স্ট্যাটাস উইজেট */}
      {cart.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-6 w-full">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-blue-800 font-medium mb-2 sm:mb-0">
              🛍️ আপনি <span className="font-bold text-blue-950">{cart.length} টি</span> প্রোডাক্ট যোগ করেছেন। মোট মূল্য: <span className="font-bold text-lg text-blue-900">{totalPrice.toLocaleString()} ৳</span>
            </div>
            <button 
              onClick={() => setCart([])} 
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition"
            >
              কার্ট খালি করুন
            </button>
          </div>
        </div>
      )}

      {/* প্রোডাক্ট লিস্ট সেকশন */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">
          নতুন কালেকশন
        </h3>
        
        {/* প্রোডাক্ট গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              {/* ছবিতে ক্লিক করলে ডিটেইলস পেজে যাবে */}
              <Link href={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition duration-300"
                />
              </Link>
              <div className="p-5">
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
                {/* নামে ক্লিক করলে ডিটেইলস পেজে যাবে */}
                <Link href={`/product/${product.id}`}>
                  <h4 className="text-lg font-bold text-gray-800 mt-1 mb-2 hover:text-blue-600 transition cursor-pointer">
                    {product.name}
                  </h4>
                </Link>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-extrabold text-gray-900">
                    {product.price.toLocaleString()} ৳
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold py-2 px-4 rounded-lg transition transform"
                  >
                    কার্টে যোগ করুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ফুটার */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center text-xs border-t border-gray-800">
        <p>© ২০২৬ PremiumShop। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
}