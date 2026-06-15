import Link from 'next/link';

// ডেমো প্রোডাক্ট ডাটা (ডিটেইলস সহ)
const products = [
  {
    id: 1,
    name: "প্রিমিয়াম ব্লুটুথ হেডফোন",
    price: 4500,
    description: "এটি একটি চমৎকার কোয়ালিটির ব্লুটুথ হেডফোন যা আপনাকে দেবে ক্রিস্টাল ক্লিয়ার সাউন্ড এবং দীর্ঘস্থায়ী ব্যাটারি লাইফ। গান শোনা বা গেমিংয়ের জন্য এটি সেরা পছন্দ। এটিতে অ্যাক্টিভ নয়েজ ক্যান্সেলেশন ফিচার রয়েছে।",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    specs: ["ব্লুটুথ ভার্সন: ৫.২", "ব্যাটারি লাইফ: ৩০ ঘণ্টা", "নয়েজ ক্যান্সেলেশন: হ্যাঁ"]
  },
  {
    id: 2,
    name: "স্মার্ট ফিটনেস ওয়াচ",
    price: 3200,
    description: "স্বাস্থ্য সচেতন মানুষের জন্য সেরা গ্যাজেট। হার্ট রেট ট্র্যাকিং, স্লিপ মনিটরিং এবং স্পোর্টস মোড সহ এটি আপনার ফিটনেস ট্র্যাক করতে এবং প্রতিদিনের কার্যক্রম মনিটর করতে সাহায্য করবে।",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Gadgets",
    specs: ["ডিসপ্লে: ১.৪ ইঞ্চি AMOLED", "ওয়াটারপ্রুফ: IP68", "ব্যাটারি ব্যাকআপ: ১০ দিন"]
  },
  {
    id: 3,
    name: "লেদার ট্রাভেল ব্যাগ",
    price: 5800,
    description: "আসল চামড়া দিয়ে তৈরি একটি ট্রাভেল ব্যাগ যা আপনার যেকোনো ভ্রমণের অভিজ্ঞতাকে করবে আরও আরামদায়ক এবং স্টাইলিশ। এতে রয়েছে প্রচুর স্টোরেজ স্পেস এবং অত্যন্ত টেকসই চেইন।",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80",
    category: "Fashion",
    specs: ["উপাদান: ১০০% আসল চামড়া", "সাইজ: লার্জ ট্রাভেল সাইজ", "ওয়ারেন্টি: ১ বছর"]
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  // প্রোডাক্ট খুঁজে না পেলে
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
        <h1 className="text-2xl font-bold text-red-500">প্রোডাক্টটি পাওয়া যায়নি!</h1>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">হোমে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* হেডার */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">PremiumShop</Link>
          <Link href="/" className="text-xs font-semibold text-blue-600 border border-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition">
            🏠 হোমে ফিরুন
          </Link>
        </div>
      </header>

      {/* প্রোডাক্ট ডিটেইলস কার্ড */}
      <main className="max-w-4xl mx-auto px-6 py-8 flex-1 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden md:flex">
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-64 md:h-full object-cover" />
          </div>
          <div className="p-6 md:p-10 md:w-1/2 flex flex-col justify-between">
            <div>
              <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">{product.category}</span>
              <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-800 mb-2">স্পেসিফিকেশন:</h2>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 border-t border-gray-100 pt-6">
              <span className="text-2xl font-extrabold text-gray-900">{product.price.toLocaleString()} ৳</span>
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 px-6 rounded-lg transition text-center">
                হোমে গিয়ে কিনুন
              </Link>
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