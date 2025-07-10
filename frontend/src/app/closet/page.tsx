'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  image: string;
}

export default function ClosetPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState<ClothingItem[]>([]);

  const categories = [
    'All',
    'Tops',
    'Bottoms',
    'Dresses',
    'Outerwear',
    'Shoes',
    'Accessories'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Closet</h1>
        
        {/* Category Filter */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category.toLowerCase())}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category.toLowerCase()
                ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Add Item Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          + Add New Item
        </motion.button>

        {/* Clothing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                Your closet is empty. Start by adding some items!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="aspect-square relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500">{item.category}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 