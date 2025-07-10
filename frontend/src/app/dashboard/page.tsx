'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalItems: number;
  totalOutfits: number;
  favoriteCategories: { name: string; count: number }[];
  recentActivity: {
    id: string;
    type: string;
    description: string;
    date: string;
  }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    totalOutfits: 0,
    favoriteCategories: [],
    recentActivity: []
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-gray-500 mb-2">Total Items</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalItems}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-gray-500 mb-2">Total Outfits</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOutfits}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-gray-500 mb-2">Most Worn</h3>
            <p className="text-3xl font-bold text-gray-900">Casual</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-gray-500 mb-2">Style Score</h3>
            <p className="text-3xl font-bold text-gray-900">4.8</p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Favorite Categories */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-1 bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Favorite Categories
            </h2>
            <div className="space-y-4">
              {stats.favoriteCategories.map((category) => (
                <div key={category.name} className="flex justify-between items-center">
                  <span className="text-gray-700">{category.name}</span>
                  <span className="text-gray-500">{category.count} items</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <div>
                    <p className="text-gray-700">{activity.description}</p>
                    <p className="text-gray-400 text-sm">{activity.date}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 