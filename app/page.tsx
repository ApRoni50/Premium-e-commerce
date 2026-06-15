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
  // কার্টের জন্য স্টেট
  const [cart, setCart] = useState<{ id: number; name: string; price: number; image: string }[]>([]);
  // কার্ট ড্রয়ার ওপেন/ক্লোজ করার স্টেট
  const [isCartOpen, setIsCartOpen] = useState(false);

  // কার্টে প্রোডাক্ট যোগ করার ফাংশন
  const addToCart = (product: typeof products[0]) => {
    setCart([...cart, { id: product.id, name: product.name, price: product.price, image: product.image }]);
    setIsCartOpen(true); // প্রোডাক্ট যোগ করার সাথে সাথে কার্ট ড্রয়ারটি অটোমেটিক ওপেন হবে
  };

  // কার্ট থেকে নির্দিষ্ট প্রোডাক্ট মুছে ফেলার ফাংশন
  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // মোট টাকার হিসাব
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between relative overflow-x-hidden">
      
      {/* ১. কার্ট ড্রয়ারের ব্যাকড্রপ (পেছনের অন্ধকার স্ক্রিন) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* ২. কার্ট ড্রয়ার প্যানেল (ডান দিক থেকে স্লাইড হবে) */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ড্রয়ার হেডার */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="text-base font-bold text-gray-800">শপিং কার্ট ({cart.length})</h3>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* ড্রয়ারের ভেতরের প্রোডাক্ট লিস্ট */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <span className="text-4xl block mb-2">🛒</span>
              <p className="text-sm">আপনার কার্টটি খালি আছে</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-800">{item.name}</h4>
                  <p className="text-xs text-blue-600 font-semibold mt-1">{item.price.toLocaleString()} ৳</p>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold p-1"
                >
                  মুছুন
                </button>
              </div>
            ))
          )}
        </div>

        {/* ড্রয়ার ফুটার (টোটাল প্রাইস ও চেকআউট) */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-gray-800">
              <span>মোট মূল্য:</span>
              <span className="text-base text-blue-600">{totalPrice.toLocaleString()} ৳</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setCart([])}
                className="border border-red-500 text-red-500 hover:bg-red-50 text-xs font-bold py-2.5 px-4 rounded-lg transition"
              >
                খালি করুন
              </button>
              <button 
                onClick={() => alert("অর্ডার সফল হয়েছে! ধন্যবাদ।")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition text-center"
              >
                চেকআউট
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ৩. হেডার উইথ লাইভ কার্ট আইকন */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">PremiumShop</h1>
          <div className="flex items-center space-x-4">
            <nav className="space-x-4 text-sm font-medium text-gray-600">
              <Link href="#" className="hover:text-blue-600">হোম</Link>
              <Link href="#" className="hover:text-blue-600">শপ</Link>
            </nav>
            
            {/* কার্ট আইকনে ক্লিক করলে ড্রয়ার ওপেন হবে */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition focus:outline-none"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ৪. হিরো ব্যানার */}
      <section className="bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-extrabold mb-2">আমাদের প্রিমিয়াম ই-কমার্স</h2>
        <p className="text-blue-100 max-w-md mx-auto text-xs">
          সেরা মানের অরিজিনাল গ্যাজেট ও লাইফস্টাইল প্রোডাক্ট কিনুন সাশ্রয়ী মূল্যে।
        </p>
      </section>

      {/* ৫. প্রোডাক্ট লিস্ট সেকশন */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">
          নতুন কালেকশন
        </h3>
        
        {/* প্রোডাক্ট গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
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