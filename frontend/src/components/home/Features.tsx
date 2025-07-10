'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'Smart Wardrobe Organization',
    description:
      'Digitize and categorize your clothing items with AI-powered tagging and organization.',
    icon: '👕',
  },
  {
    title: 'AI Style Recommendations',
    description:
      'Get personalized outfit suggestions based on your style preferences, weather, and occasions.',
    icon: '🎯',
  },
  {
    title: 'Outfit Planning',
    description:
      'Plan your outfits ahead of time with our smart calendar integration and weather forecasts.',
    icon: '📅',
  },
  {
    title: 'Style Analytics',
    description:
      'Gain insights into your fashion preferences and discover new style combinations.',
    icon: '📊',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Revolutionize Your Wardrobe
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of fashion with our AI-powered features designed to make
            your style journey effortless and enjoyable.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative group h-[250px]"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200 h-full flex flex-col items-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-sm flex-grow flex items-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 