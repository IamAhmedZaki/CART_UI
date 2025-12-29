import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "/assets/clubpro_logo.webp";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/30 px-8 py-4 flex items-center justify-between shadow-sm transition-all duration-300">

      {/* Logo */}
      <Link to="/">
        <img
          src={Logo}
          alt="Club Pro Golf Logo"
          className="h-16 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
        />
      </Link>


      {/* Search Bar */}
      <div className="relative group w-96">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#f9c821] transition-colors duration-300" />
        </div>
        <input
          type="text"
          placeholder="ASK THE CADDIE..."
          className="w-full bg-neutral-50 rounded-full pl-12 pr-6 py-3 border border-neutral-200 
                     text-sm font-medium tracking-wide text-primary placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-[#f9c821] 
                     transition-all duration-300 shadow-inner"
        />
      </div>
    </header>

  );
}
