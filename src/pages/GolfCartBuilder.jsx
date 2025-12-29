import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Bookmark, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import cardImg from "/assets/cpm_club_car.webp";
import logo from "/assets/e-z-go.webp";
import yamaha from "/assets/yamaha.webp";
import clubPro from "/assets/clubpro_logo.webp";
import clubCar from "/assets/clubcar.webp";
import { api } from "../utils/api";
import { getSelectionsData, setSelectionData } from "../Components/data";

// ...imports remain the same
export default function GolfCartBuilder() {
  const { brandSlug } = useParams();
  const [brand, setBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [brandLogo, setBrandLogo] = useState(false);

  const { addItem } = useCart();
  const navigate = useNavigate();

  const [openSection, setOpenSection] = useState(null);
  const [selections, setSelections] = useState({ items: {} });

  // Fetch brand and default model
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const brandMap = { "ez-go": 3, "club-car": 1, "yamaha": 4, "clubpro": 2 };
        const data = await api.get(`/brands/${brandMap[brandSlug]}`);
        setBrand(data);
        if (data.models?.length) setSelectedModel(data.models[0]);
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };
    fetchBrand();
  }, [brandSlug]);

  // Fetch model products
  useEffect(() => {
    if (!selectedModel?.id) {
      setGroupedProducts({});
      return;
    }
    setLoading(true);
    api.get(`/models/${selectedModel.id}`)
      .then((modelData) => {
        const grouped = modelData.products.reduce((acc, product) => {
          const typeName = product.productType.name;
          if (!acc[typeName]) acc[typeName] = [];
          acc[typeName].push({ ...product, price: parseFloat(product.salePrice || product.regularPrice) });
          return acc;
        }, {});
        setGroupedProducts(grouped);

        setSelections({ model: { name: selectedModel.name, price: selectedModel.price || 0 }, items: {} });

        const firstCategory = Object.keys(grouped)[0];
        if (firstCategory) setOpenSection(firstCategory);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedModel]);

  // Set brand logo
  useEffect(() => {
    const logos = { "ez-go": logo, "club-car": clubCar, "yamaha": yamaha, "clubpro": clubPro };
    setBrandLogo(logos[brandSlug] || false);
  }, [brandSlug]);

  // Helpers
  const isMultiSelectCategory = (category) => !["Enclosure", "Color"].includes(category);
  const getSelectedForCategory = (category) => selections.items[category] || (isMultiSelectCategory(category) ? [] : null);
  const isSelected = (category, product) => isMultiSelectCategory(category)
    ? (selections.items[category] || []).some(p => p.id === product.id)
    : selections.items[category]?.id === product.id;

  const handleSelect = (category, product) => {
    if (product.stock === 0) return; // Cannot select out-of-stock products

    if (isMultiSelectCategory(category)) {
      setSelections(prev => {
        const current = prev.items[category] || [];
        const exists = current.find(p => p.id === product.id);
        return {
          ...prev,
          items: {
            ...prev.items,
            [category]: exists ? current.filter(p => p.id !== product.id) : [...current, product],
          },
        };
      });
    } else {
      setSelections(prev => ({
        ...prev,
        items: {
          ...prev.items,
          [category]: prev.items[category]?.id === product.id ? null : product,
        },
      }));
    }
  };

  const handleSaveBuild = () => {
    const selectedProducts = [];
    Object.values(selections.items).forEach(selected => {
      if (!selected) return;
      if (Array.isArray(selected)) {
        selected.forEach(item => selectedProducts.push({ ...item, qty: 1 }));
      } else {
        selectedProducts.push({ ...selected, qty: 1 });
      }
    });
    addItem(selectedProducts);
    navigate("/checkout");
  };

  const totalPrice = (
    (selections.model?.price || 0) +
    Object.values(selections.items).flat().reduce((sum, item) => sum + (item?.price || 0), 0)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans pt-8 pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex items-center gap-4 text-xs md:text-sm tracking-widest text-gray-500 mb-2">
          <span className="text-[#f9c821]">HOME</span> / {brand?.name?.toUpperCase()}
        </div>
        <h1 className="flex items-center justify-between text-3xl md:text-5xl font-serif font-bold">
          <div className="flex items-center gap-2">
            <span className="text-gray-900">Build Your</span>
            <span className="text-[#f9c821]">{brand?.name}</span>
          </div>
          <img src={brandLogo} alt={`${brand?.name} Logo`} className="h-6 md:h-10 object-contain" />
        </h1>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left */}
        <div className="lg:w-[65%]">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 h-[400px] lg:h-[700px] group">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${cardImg})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
              <span className="bg-[#f9c821]/90 text-white px-4 py-3 rounded-full text-xs font-bold tracking-widest">
                PREMIUM SERIES
              </span>
              <button
                onClick={handleSaveBuild}
                className="bg-white/90 backdrop-blur-md border border-gray-300 px-6 py-3 rounded-full shadow-lg text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-[#f9c821] hover:text-white transition-all"
              >
                SAVE BUILD <Bookmark className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-2xl font-bold">{selectedModel?.name || "Select Model"}</p>
              <p className="text-4xl font-serif">${totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-[35%]">
          <div className="sticky top-24">
            {/* Model Selection */}
            <h2 className="text-xs font-bold text-[#f9c821] mb-6 tracking-[0.2em] uppercase border-b border-gray-300 pb-4">
              Select Your Model
            </h2>
            <div className="flex flex-wrap gap-3 mb-12">
              {brand?.models?.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`
                    text-xs font-bold px-4 py-2 rounded-lg transition-all border
                    ${selectedModel?.id === m.id
                      ? 'bg-[#f9c821] text-white border-[#f9c821] shadow-lg shadow-[#f9c821]/20'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}
                  `}
                >
                  {m.name}
                </button>
              ))}
            </div>

            {/* Categories */}
            {loading ? (
              <p className="text-center text-gray-500">Loading options...</p>
            ) : Object.keys(groupedProducts).length === 0 ? (
              <p className="text-center text-gray-500">Select a model to see options</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedProducts).map(([categoryName, products], index) => (
                  <motion.div
                    key={categoryName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="rounded-xl overflow-hidden border border-gray-300 bg-white shadow-md"
                  >
                    <button
                      onClick={() => setOpenSection(openSection === categoryName ? null : categoryName)}
                      className={`w-full flex justify-between items-center px-6 py-5 transition-all hover:bg-gray-50 ${openSection === categoryName ? 'bg-gray-50' : ''}`}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-700">
                        {categoryName}
                      </span>
                      {openSection === categoryName ? <Minus className="w-4 h-4 text-[#f9c821]" /> : <Plus className="w-4 h-4 text-gray-500" />}
                    </button>

                    <AnimatePresence>
                      {openSection === categoryName && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-gray-50"
                        >
                          <div className="p-6 space-y-3">
                            {products.map((product) => {
                              const active = isSelected(categoryName, product);
                              const isOutOfStock = product.stock === 0;

                              return (
                                <div
                                  key={product.id}
                                  onClick={() => !isOutOfStock && handleSelect(categoryName, product)}
                                  className={`
                                    flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all border
                                    ${active
                                      ? 'bg-[#f9c821]/10 border-[#f9c821] text-[#f9c821]'
                                      : 'bg-white border-gray-200 hover:bg-gray-100'}
                                    ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}
                                  `}
                                >
                                  <div>
                                    <span className="text-sm font-medium">{product.name}</span>
                                    {product.color && <span className="block text-xs text-gray-500">{product.color}</span>}
                                    {isOutOfStock && <span className="block text-xs text-red-600">Out of stock</span>}
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
                                    {active && <ArrowRight className="w-5 h-5 text-[#f9c821]" />}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
