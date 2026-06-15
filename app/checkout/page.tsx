"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod"
  });
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  // ব্রাউজারের localStorage থেকে কার্টের ডাটা রিড করা
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const shippingFee = subtotal > 0 ? 120 : 0; // বাংলাদেশের জন্য স্ট্যান্ডার্ড ১২০ টাকা
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    // র্যান্ডম অর্ডার আইডি তৈরি করা
    const randomId = "PS-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setIsOrdered(true);
    
    // অর্ডার সফল হওয়ার পর কার্ট খালি করা
    localStorage.removeItem("cart");
  };

  // অর্ডার সম্পন্ন হওয়ার পর থ্যাংক ইউ স্ক্রিন
  if (isOrdered) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <span className="text-6xl block mb-4">🎉</span>
          <h1 className="text-2xl font-bold text-green-600 mb-2">অর্ডারটি সফল হয়েছে!</h1>
          <p className="text-gray-600 text-sm mb-4">অর্ডার দেওয়ার জন্য আপনাকে অনেক ধন্যবাদ।</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider">আপনার অর্ডার আইডি</p>
            <p className="text-lg font-bold text-gray-800">{orderId}</p>
          </div>
          <Link 
            href="/" 
            className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center text-sm"
          >
            আরো শপিং করুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* হেডার */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">PremiumShop</Link>
          <Link href="/" className="text-xs font-semibold text-blue-600 border border-blue-600 py-2.5 px-4 rounded-lg hover:bg-blue-50 transition">
            🏠 হোমে ফিরুন
          </Link>
        </div>
      </header>

      {/* মেইন চেকআউট সেকশন */}
      <main className="max-w-4xl mx-auto px-6 py-8 flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* শিপিং ফর্ম */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">শিপিং এড্রেস ও পেমেন্ট</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">আপনার নাম *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                placeholder="যেমন: সায়মন আহমেদ"
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">মোবাইল নাম্বার *</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange}
                placeholder="যেমন: ০১৭XXXXXXXX"
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">পূর্ণ ঠিকানা *</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange}
                placeholder="আপনার গ্রাম, রোড, থানা এবং জেলা উল্লেখ করুন"
                className="w-full text-sm border border-gray-200 rounded-lg p-3 h-24 focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">পেমেন্ট মেথড *</label>
              <select 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleInputChange}
                className="w-full text-sm border border-gray-200 bg-white rounded-lg p-3 focus:outline-none focus:border-blue-600"
              >
                <option value="cod">ক্যাশ অন ডেলিভারি (COD)</option>
                <option value="bkash">বিকাশ / রকেট / নগদ</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition text-sm mt-4 shadow-sm"
            >
              অর্ডার কনফার্ম করুন
            </button>
          </form>
        </div>

        {/* অর্ডার রিভিউ (সামারি) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">অর্ডার রিভিউ</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <p className="text-sm text-gray-500">আপনার কার্টে কোনো প্রোডাক্ট নেই।</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 border-b border-gray-50 pb-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-800">{item.name}</h4>
                      <p className="text-xs text-blue-600 font-semibold mt-0.5">{item.price.toLocaleString()} ৳</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* টোটাল হিসাব */}
          <div className="border-t border-gray-100 pt-4 mt-6 space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>সাবটোটাল:</span>
              <span>{subtotal.toLocaleString()} ৳</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>ডেলিভারি চার্জ:</span>
              <span>{shippingFee.toLocaleString()} ৳</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-gray-800 border-t border-gray-50 pt-2 mt-2">
              <span>সর্বমোট মূল্য:</span>
              <span className="text-lg text-blue-600">{grandTotal.toLocaleString()} ৳</span>
            </div>
          </div>
        </div>

      </main>

      {/* ফুটার */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-xs">
        <p>© ২০২৬ PremiumShop। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
}