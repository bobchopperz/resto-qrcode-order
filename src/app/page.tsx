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
} from "lucide-react";

const icons = [
  // Row 1
  { Icon: Soup, key: "soup" },
  { Icon: Cookie, key: "cookie" },
  { Icon: Citrus, key: "citrus" },
  // Row 2
  { Icon: Croissant, key: "croissant" },
  { Icon: Hamburger, key: "hamburger" },
  { Icon: Sandwich, key: "sandwich" },
  // Row 3
  { Icon: HandPlatter, key: "hand-platter" },
  { Icon: CookingPot, key: "cooking-pot" },
  { Icon: CupSoda, key: "cup-soda" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto flex flex-col items-center text-center p-4 md:p-8">
        {/* Foreground Content */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Selamat Datang!
          </h2>
          <p className="text-lg text-gray-600">
            Pindai QR di meja Anda untuk melihat menu dan memesan.
          </p>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-3 gap-12 text-slate-400">
          {icons.map(({ Icon, key }) => (
            <Icon key={key} size={72} strokeWidth={1} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
