import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navigation() {
  const { pathname } = useLocation();

  const links = [
    { name: "Home", path: "/" },
     { name: "Club Car", path: "/brand/club-car" },
  { name: "EZ-GO", path: "/brand/ez-go" },
  { name: "Yamaha", path: "/brand/yamaha" },
    { name: "Club Pro", path: "/brand/clubpro" },
  ];

  return (
    <nav className="bg-white text-[#737a81] border-b border-white/10 shadow-lg relative z-40">
      <div className="container mx-auto px-4 md:px-8 py-0 flex flex-col md:flex-row items-center justify-between">

        <span className="text-xs font-extrabold tracking-[0.2em] text-[#737a81] uppercase hidden md:block py-6 ">
          Select Your Manufacturer
        </span>

        {/* Scrollable Container for Mobile */}
        <div className="w-full md:w-auto overflow-x-auto flex items-center gap-6 md:gap-8 no-scrollbar touch-pan-x py-2 md:py-0 justify-start md:justify-end">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative px-2 py-4 md:py-6 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 group hover:text-[#f9c821] whitespace-nowrap"
            >
              <span className={pathname === link.path ? "text-[##f9c821]" : "text-[#737a81]"}>
                {link.name}
              </span>

              {pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-[#f9c821]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover Effect */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
