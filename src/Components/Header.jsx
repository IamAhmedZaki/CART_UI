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
    
    </header>

  );
}
