import { Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ClubCar from "./pages/ClubCar";
import EzGo from "./pages/EzGo";
import Yamaha from "./pages/Yamaha";
import ClubPro from "./pages/ClubPro";
import Checkout from './pages/Checkout';
import DealerRegistration from "./Components/DealerRegistration";
import GolfCartBuilder from "./pages/GolfCartBuilder";

export default function App() {
  return (
    <CartProvider>
      <div className="app-container">
        {/* Always visible layout */}
        <TopBar />
        <Header />
        <Navigation />

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubcar" element={<ClubCar />} />
          <Route path="/ezgo" element={<EzGo />} />
          <Route path="/yamaha" element={<Yamaha />} />
          <Route path="/clubpro" element={<ClubPro />} />
          <Route path="/dealer-registration" element={<DealerRegistration />} />
          <Route path="/brand/:brandSlug" element={<GolfCartBuilder />} />


          {/* ✅ Checkout page (reusable) */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <Footer />
      </div>
    </CartProvider>
  );
}

