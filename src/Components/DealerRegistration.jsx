import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import hero1 from "/assets/hero1.webp";
import hero2 from "/assets/hero2.webp";
import hero3 from "/assets/hero3.webp";
import yellowfadedcar from "../assets/image2.png";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Header from "./Header";
// import hero3 from "/assets/hero3.webp";

const images = [hero1, hero2, hero3];

const DealerRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mobile: "",
    fax: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",
    commercialStreet: "",
    commercialCity: "",
    commercialState: "",
    commercialZip: "",
    commercialCountry: "",
    hasShowroom: "",
    interestedBrands: [],
    sellBrands: [],
    authorizedDealer: [],
  });

  const interestedBrandOptions = [
    "Axles",
    "Clutch Kits / Belts",
    "Enclosures",
    "Engine Parts",
    "Lift Kits / Off-Road",
    "Light Kits",
    "Maintenance",
    "Mirrors",
    "Motors & Controllers",
    "Portals/Suspension",
    "Seat Kits",
    "Snorkel Kits",
    "Tires & Wheels",
    "Tops / Windshields / Doors",
    "Check All",
  ];

  const sellBrandOptions = [
    "Club Car",
    "E-Z-GO",
    "Yamaha",
    "Other",
    "Check All",
  ];

  const authorizedDealerOptions = [
    "Polaris",
    "Can-Am",
    "Yamaha",
    "Honda",
    "Kawasaki",
    "CF Moto",
    "Check All",
  ];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (
      name === "interestedBrands" ||
      name === "sellBrands" ||
      name === "authorizedDealer"
    ) {
      let options = [];
      if (name === "interestedBrands") options = interestedBrandOptions;
      if (name === "sellBrands") options = sellBrandOptions;
      if (name === "authorizedDealer") options = authorizedDealerOptions;

      const realOptions = options.filter((item) => item !== "Check All");

      setFormData((prev) => {
        let updated = [...prev[name]];

        if (value === "Check All") {
          updated = checked ? [...realOptions] : [];
        } else {
          if (checked) {
            updated = [...new Set([...updated, value])]; // avoid duplicates
          } else {
            updated = updated.filter((item) => item !== value);
          }

          // If all real options are now selected, ensure "Check All" appears checked (handled in render)
          // If any is unchecked, "Check All" will auto uncheck (also handled in render)
        }

        return {
          ...prev,
          [name]: updated,
        };
      });
    }
  };
  const handleOtherChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/dealer-registration", {
        // const res = await fetch('https://cart-backend-s1wz.onrender.com/api/dealer-registration', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Registration submitted successfully!");
        console.log("Saved dealer:", result.dealer);
        // Reset form if needed
        setFormData({
          companyName: "",
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          mobile: "",
          fax: "",
          billingStreet: "",
          billingCity: "",
          billingState: "",
          billingZip: "",
          billingCountry: "",
          commercialStreet: "",
          commercialCity: "",
          commercialState: "",
          commercialZip: "",
          commercialCountry: "",
          hasShowroom: "",
          interestedBrands: [],
          sellBrands: [],
          authorizedDealer: [],
        });
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Hero ${currentIndex + 1}`}
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </AnimatePresence>

          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Partner With Us
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              Join the Club Pro family as an authorized licensed dealer. Our
              goal is to provide your customers the right help for success by
              choosing an off-road vehicle brand that has been focused on
              customers' needs for years.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Benefits */}
          <div className="lg:col-span-1">
            <div className="bg-[#ffd042] text-white p-6 ">
              <h2 className="text-2xl font-bold mb-4">
                That's Why You Choose Club Pro
              </h2>
              <p className="mb-6 text-sm leading-relaxed">
                For over 50 years Club Pro has been supplying the UTV and ATV
                segments with innovative, high quality, thoroughly tested
                products at a low MSRP, bringing significant value to our
                dealers and consumers. Come and be part of the Club Pro family,
                create value from your business and take your business to the
                top.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Product Lines</h3>
                  <p className="text-sm">
                    We manufacture, distribute, and sell the biggest goods made
                    exclusively for all off-road model including Sport UTV and
                    ATV markets.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Pricing</h3>
                  <p className="text-sm">
                    We price our models and highly competitive structure with
                    seasoned MSRPs to grow your business.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Sales Team</h3>
                  <p className="text-sm">
                    We have one of the best trained and Club Pro-focused
                    customer service and dedicated sales teams for the industry.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">
                    Product Distribution
                  </h3>
                  <p className="text-sm">
                    At Club Pro, we have carefully managed logistics, streamline
                    products to speed up the time of delivery out of door
                    distribution from local distributors.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Club Pro Online</h3>
                  <p className="text-sm">
                    Our contemporary and latest website keeps all your delivered
                    content is always updated so up to date. We also publish new
                    data content to bring value to customer engagement.
                  </p>
                </div>
              </div>
            </div>

            <div className=" overflow-hidden shadow-lg">
              <img
                src={yellowfadedcar}
                alt="Off-road vehicle"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold mb-2">Dealer Registration</h2>
              <p className="text-gray-600 mb-6">
                Not a licensed?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Find a dealer near you →
                </a>
              </p>
              <p className="text-sm text-gray-700 mb-8">
                Fill out the form below and one of our customer service
                representatives will contact you within one business day to
                complete your dealer sign-up process.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Company Information */}
                <h3 className="text-xl font-bold mb-4">Company Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div></div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div className="flex items-end">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Fax
                    </label>
                    <input
                      type="tel"
                      name="fax"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <h3 className="text-xl font-bold mb-4">Billing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Street*
                    </label>
                    <input
                      type="text"
                      name="billingStreet"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="billingCity"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State / Province*
                    </label>
                    <input
                      type="text"
                      name="billingState"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Postal / Zip Code*
                    </label>
                    <input
                      type="text"
                      name="billingZip"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country*
                    </label>
                    <select
                      name="billingCountry"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    >
                      <option value="">Select</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="MX">Mexico</option>
                    </select>
                  </div>
                </div>

                {/* Commercial Address */}
                <h3 className="text-xl font-bold mb-4">
                  Commercial Address (Ship-to location)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Street*
                    </label>
                    <input
                      type="text"
                      name="commercialStreet"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="commercialCity"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State / Province*
                    </label>
                    <input
                      type="text"
                      name="commercialState"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Postal / Zip Code*
                    </label>
                    <input
                      type="text"
                      name="commercialZip"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country*
                    </label>
                    <select
                      name="commercialCountry"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleOtherChange}
                    >
                      <option value="">Select</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="MX">Mexico</option>
                    </select>
                  </div>
                </div>

                {/* Short Questionnaire */}
                <h3 className="text-xl font-bold mb-4">Short Questionnaire</h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Do you have a showroom?*
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasShowroom"
                        value="yes"
                        required
                        className="mr-2"
                        onChange={handleOtherChange}
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasShowroom"
                        value="no"
                        required
                        className="mr-2"
                        onChange={handleOtherChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Which product categories are you most interested in? (Select
                    all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interestedBrandOptions.map((brand) => {
                      const isCheckAll = brand === "Check All";
                      const cleanOptions = interestedBrandOptions.filter(
                        (item) => item !== "Check All"
                      );
                      const allSelected =
                        formData.interestedBrands.length ===
                        cleanOptions.length;
                      const isChecked = isCheckAll
                        ? allSelected
                        : formData.interestedBrands.includes(brand);

                      return (
                        <label
                          key={brand}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            value={brand}
                            name="interestedBrands"
                            checked={isChecked}
                            onChange={handleChange}
                          />
                          <span className="ml-2">{brand}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Are you an authorized dealer for any of the following PTV
                    brands? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sellBrandOptions.map((brand) => {
                      const isCheckAll = brand === "Check All";
                      const cleanOptions = sellBrandOptions.filter(
                        (item) => item !== "Check All"
                      );
                      const allSelected =
                        formData.sellBrands.length === cleanOptions.length;
                      const isChecked = isCheckAll
                        ? allSelected
                        : formData.sellBrands.includes(brand);

                      return (
                        <label
                          key={brand}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            value={brand}
                            name="sellBrands"
                            checked={isChecked}
                            onChange={handleChange}
                          />
                          <span className="ml-2">{brand}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Are you an authorized dealer for any of the following UTV
                    brands? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {authorizedDealerOptions.map((brand) => {
                      const isCheckAll = brand === "Check All";
                      const cleanOptions = authorizedDealerOptions.filter(
                        (item) => item !== "Check All"
                      );
                      const allSelected =
                        formData.authorizedDealer.length ===
                        cleanOptions.length;
                      const isChecked = isCheckAll
                        ? allSelected
                        : formData.authorizedDealer.includes(brand);

                      return (
                        <label
                          key={brand}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            value={brand}
                            name="authorizedDealer"
                            checked={isChecked}
                            onChange={handleChange}
                          />
                          <span className="ml-2">{brand}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center text-sm">
                    * Indicates required field
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition-colors"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DealerRegistration;
