'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Outfit {
  id: string;
  name: string;
  occasion: string;
  items: {
    id: string;
    type: string;
    image: string;
  }[];
  created: string;
}

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const occasions = [
    'All',
    'Casual',
    'Work',
    'Formal',
    'Sport',
    'Special'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Outfits</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Create New Outfit
          </motion.button>
        </div>

        {/* Occasion Filter */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {occasions.map((occasion) => (
            <button
              key={occasion}
              onClick={() => setActiveFilter(occasion.toLowerCase())}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === occasion.toLowerCase()
                ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {occasion}
            </button>
          ))}
        </div>

        {/* Outfits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfits.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No outfits yet. Create your first outfit!
              </p>
            </div>
          ) : (
            outfits.map((outfit) => (
              <motion.div
                key={outfit.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-1 p-2">
                  {outfit.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="aspect-square relative">
                      <img
                        src={item.image}
                        alt={item.type}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{outfit.name}</h3>
                  <p className="text-gray-500">{outfit.occasion}</p>
                  <p className="text-gray-400 text-sm">{outfit.created}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 