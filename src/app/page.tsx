'use client';

import { useState, useMemo, useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {
  Citrus,
  Cookie,
  CookingPot,
  Croissant,
  CupSoda,
  Hamburger,
  HandPlatter,
  Sandwich,
  Soup,
  ShoppingCart,
  Minus,
  Plus,
  X,
} from "lucide-react";

const icons = [
  // Row 1
  { Icon: Soup, key: "soup-1" },
  { Icon: Cookie, key: "cookie-1" },
  { Icon: Citrus, key: "citrus-1" },
  // Row 2
  { Icon: Croissant, key: "croissant-1" },
  { Icon: Hamburger, key: "hamburger-1" },
  { Icon: Sandwich, key: "sandwich-1" },
  // Row 3
  { Icon: HandPlatter, key: "hand-platter-1" },
  { Icon: CookingPot, key: "cooking-pot-1" },
  { Icon: CupSoda, key: "cup-soda-1" },
  // Row 4
  { Icon: Soup, key: "soup-2" },
  { Icon: Cookie, key: "cookie-2" },
  { Icon: Citrus, key: "citrus-2" },
  // Row 5
  { Icon: Croissant, key: "croissant-2" },
  { Icon: Hamburger, key: "hamburger-2" },
  { Icon: Sandwich, key: "sandwich-2" },
];

interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerWa, setCustomerWa] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/menu`);
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        // Item sudah ada, tambah quantity
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Item baru, tambahkan ke keranjang
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemName: string, amount: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.name === itemName) {
            return { ...item, quantity: item.quantity + amount };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Hapus item jika quantity 0 atau kurang
      return updatedCart;
    });
  };

  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.totalPrice += item.price * item.quantity;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [cart]);

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      alert("Keranjang Kakak masih kosong.");
      return;
    }
    if (!customerName.trim() || !customerWa.trim()) {
      alert("Mohon isi Nama dan Nomor WhatsApp Kakak ya");
      return;
    }

    const orderData = {
      customer: {
        name: customerName,
        whatsapp: customerWa,
      },
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total: totalPrice,
    };

    console.log("Data yang akan dikirim ke backend:", orderData);
    alert("Sipp Kakak pesanannya sedang diproses, silakan menunggu ");

    // Reset state untuk kembali ke tampilan awal setelah alert ditutup
    setIsModalOpen(false);
    setCart([]);
    setCustomerName("");
    setCustomerWa("");

    // NANTINYA: Kirim data ke backend
    // try {
    //   const response = await fetch('https://api.backend-anda.com/order', {
    //     // ... fetch options
    //   });
    //   if (!response.ok) throw new Error('Gagal mengirim pesanan');
    //   alert('Pesanan berhasil dikirim!');
    // } catch (error) {
    //   alert('Terjadi kesalahan saat mengirim pesanan.');
    // }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Navbar />

      {/* Main Content */}
      <main className="relative flex-grow container mx-auto flex flex-col items-center text-center p-4 md:p-8 overflow-hidden">
        {/* Background Icon Grid */}
        <div className="absolute inset-0 z-0 grid grid-cols-3 gap-12 text-slate-200 opacity-75 blur-sm">
          {icons.map(({ Icon, key }) => (
            <Icon key={key} size={72} strokeWidth={1} />
          ))}
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Selamat Datang di Bakso Pedas Nikmat
            </h2>
            <p className="text-lg text-gray-600">
              Silakan pilih menu favoritmu
            </p>
          </div>

          {/* Menu Grid */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {menu.map((item) => {
                const cartItem = cart.find(ci => ci.name === item.name);
                return (
                  <div key={item.name} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex flex-col">
                    <img src={`${process.env.NEXT_PUBLIC_EXTERNAL_APACHE}${item.imageUrl}`} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 my-2 flex-grow">{item.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-semibold text-emerald-600">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                        {cartItem ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleUpdateQuantity(item.name, -1)} className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors">
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg w-8 text-center">{cartItem.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.name, 1)} className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => handleAddToCart(item)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
                            Tambah
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Order Summary Bar */}
      {cart.length > 0 && (
        <div className="sticky bottom-0 z-20 bg-white shadow-2xl p-4 border-t-2 border-emerald-500">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <ShoppingCart className="text-emerald-600" />
                  <div className="text-xl font-bold text-gray-600">Total Pesanan ({totalItems} item)</div>
              </h3>
              <p className="text-2xl font-bold text-emerald-700">Rp {totalPrice.toLocaleString("id-ID")}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg w-full md:w-auto hover:bg-emerald-700 transition-colors whitespace-nowrap"
            >
              Rincian Pesanan
            </button>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Konfirmasi Pesanan</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.name} className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      Rp {(item.quantity * item.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-2xl font-bold mb-6 text-emerald-700">
                <span>Total</span>
                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Kakak"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-700"
                />
                <input
                  type="tel"
                  placeholder="Nomor WhatsApp Kakak (cth: 08123456789)"
                  value={customerWa}
                  onChange={(e) => setCustomerWa(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-700"
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-lg">
              <p className="text-center text-sm text-gray-500 mb-4">
                Ketika pesanan sudah ready, kami akan konfirmasi ke nomor WhatsApp Kakak.
              </p>
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors text-lg"
              >
                Lanjutkan Pesanan
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
