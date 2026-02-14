"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = [
  'Armors',
  'Remembrances',
  'Weapons',
  'Shields',
  'Talismans',
  'NPCs',
  'Bosses',
  'Great Runes'
];

function ItemExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('Bosses'); // Default to Bosses
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Fetch items whenever the selected category changes
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://elden-ring-catalog-8gcm.vercel.app/items/${selectedCategory}/`);
        setItems(response.data);
      } catch (error) {
        console.error(`Error fetching items for category ${selectedCategory}:`, error.response ? error.response.data : error.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Atmospheric Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gold/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-orange/25 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Elden Ring symbol inspired background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-gold/10 via-orange/5 to-transparent rounded-full blur-3xl"></div>

        <div className="relative px-6 py-16 text-center">
          {/* Decorative elements */}
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-0.5 bg-gold/50"></div>
            <div className="mx-4 w-3 h-3 border border-gold/50 rotate-45"></div>
            <div className="w-16 h-0.5 bg-gold/50"></div>
          </div>

          <h1 className="font-cinzel text-6xl md:text-7xl font-bold text-gold mb-4 tracking-wider text-shadow-elden-ring">
            ELDEN RING
          </h1>

          {/* Subtitle with decorative elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-0.5 bg-gold/30"></div>
            <h2 className="font-cinzel text-2xl md:text-3xl font-semibold text-white/90 mx-4">
              Item Explorer
            </h2>
            <div className="w-8 h-0.5 bg-gold/30"></div>
          </div>

          {/* Central decorative line */}
          <div className="w-40 h-1 bg-gold-gradient mx-auto rounded-full shadow-glow"></div>

          {/* Bottom decorative elements */}
          <div className="flex justify-center items-center mt-6">
            <div className="w-12 h-0.5 bg-gold/40"></div>
            <div className="mx-3 w-2 h-2 border border-gold/40 rotate-45"></div>
            <div className="w-12 h-0.5 bg-gold/40"></div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 p-4 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-gold/20 shadow-elden-ring">
            {categories.map(category => (
              <button
                key={category}
                className={`px-8 py-4 rounded-2xl font-crimson text-lg font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${selectedCategory === category
                  ? 'bg-gold-gradient text-slate-900 shadow-glow border-2 border-gold text-shadow-glow'
                  : 'text-slate-300 hover:text-gold hover:bg-elden-ring-gradient border-2 border-transparent hover:border-gold/40 hover:shadow-glow-orange'
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {/* Button background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-gold/30 border-t-gold shadow-glow"></div>
                <div className="absolute inset-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-r-orange/50 shadow-glow-orange" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <div className="mt-6 font-crimson text-lg text-gold/80 animate-pulse">
                Seeking the Elden Ring...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {items.map((item, index) => (
                <div key={item._id || index}>
                  <button type="button" onClick={() => handleOpen(item)} className="w-full h-full">
                    <div
                      className="group relative bg-slate-900/70 backdrop-blur-md rounded-3xl p-8 border border-gold/20 hover:border-gold/60 transition-all duration-500 transform hover:scale-105 hover:shadow-elden-ring cursor-pointer overflow-hidden"
                    >
                      {/* Background atmospheric effects */}
                      <div className="absolute inset-0 bg-elden-ring-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-orange/3 to-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Corner decorative elements */}
                      <div className="absolute top-3 left-3 w-2 h-2 border-l-2 border-t-2 border-gold/30 group-hover:border-gold transition-colors duration-300"></div>
                      <div className="absolute top-3 right-3 w-2 h-2 border-r-2 border-t-2 border-gold/30 group-hover:border-gold transition-colors duration-300"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 border-l-2 border-b-2 border-gold/30 group-hover:border-gold transition-colors duration-300"></div>
                      <div className="absolute bottom-3 right-3 w-2 h-2 border-r-2 border-b-2 border-gold/30 group-hover:border-gold transition-colors duration-300"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div>
                          {item.name}
                          {item.image && <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mt-2" />}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {isModalOpen && selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={handleClose}>
              <div className="bg-slate-900/90 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-bold text-2xl">{selectedItem.name}</h2>
                  <button type="button" className="text-white text-2xl leading-none ml-4" onClick={handleClose} aria-label="Close">&times;</button>
                </div>
                {selectedItem.image && <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-48 object-cover rounded-lg mb-4" />}
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{selectedItem.description}</p>
              </div>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto border-4 border-gold/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-gold/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border border-gold/40 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="font-crimson text-2xl text-gold/80 mb-4">
                The {selectedCategory} have been scattered...
              </div>
              <div className="font-crimson text-lg text-slate-400 mb-6">
                No items found in this realm
              </div>
              <div className="flex justify-center items-center">
                <div className="w-12 h-0.5 bg-gold/30"></div>
                <div className="mx-4 w-2 h-2 border border-gold/30 rotate-45"></div>
                <div className="w-12 h-0.5 bg-gold/30"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemExplorer;
