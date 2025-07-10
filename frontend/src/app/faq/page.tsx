'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What is WearWise?',
    answer: 'WearWise is an AI-powered virtual closet and stylist app that helps you organize your wardrobe, create outfits, and make sustainable fashion choices.',
  },
  {
    question: 'How does the AI styling work?',
    answer: 'Our AI analyzes your wardrobe, style preferences, body measurements, and current fashion trends to suggest personalized outfit combinations and styling recommendations.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take data security seriously. All your personal information and wardrobe data is encrypted and stored securely. We never share your data with third parties without your explicit consent.',
  },
  {
    question: 'Can I use WearWise on my mobile device?',
    answer: 'Yes, WearWise is fully responsive and works on all devices. We also have native mobile apps available for iOS and Android for an enhanced experience.',
  },
  {
    question: 'How do I add items to my virtual closet?',
    answer: 'You can add items by taking photos, uploading existing images, or using our smart scanning feature. Our AI will automatically categorize and tag your items.',
  },
  {
    question: 'What if I need help or have questions?',
    answer: 'Our support team is available 24/7 through the app\'s chat feature. You can also email us at support@wearwise.com or visit our help center.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about WearWise
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200" />
              <div className="relative bg-white rounded-lg shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left group"
                >
                  <span className="text-lg font-medium text-gray-900 group-hover:text-rose-500 transition-colors">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-rose-500"
                  >
                    ↓
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-gray-100"
                    >
                      <div className="px-6 py-4 text-gray-600 bg-gradient-to-r from-rose-50 to-purple-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 