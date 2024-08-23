"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = [
  'armors',
  'remembrances',
  'weapons',
  'shields',
  'talismans',
  'npcs',
  'bosses',
  'great_runes'
];

function ItemExplorer() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Default to first category
  const [items, setItems] = useState([]);

  // Fetch items whenever the selected category changes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/items/${selectedCategory}/`);
        setItems(response.data);
      } catch (error) {
        console.error(`Error fetching items for category ${selectedCategory}:`, error.response ? error.response.data : error.message);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Elden Ring Item Explorer</h1>

      {/* Category Tabs */}
      <div className="flex justify-center mb-4 border-b">
        {categories.map(category => (
          <button
            key={category}
            className={`mr-4 p-2 ${selectedCategory === category ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item._id} className="border p-4 rounded shadow">
            <h3 className="text-center font-semibold">{item.name}</h3>
            {/* Add more item details here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemExplorer;
