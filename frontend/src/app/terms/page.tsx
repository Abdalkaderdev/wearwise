'use client'

import { motion } from 'framer-motion'

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using WearWise, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.`,
  },
  {
    title: 'User Accounts',
    content: `• You must be 13 years or older to use this service
    • You are responsible for maintaining the security of your account
    • You are responsible for all activities under your account
    • You must notify us immediately of any security breach
    • You may not use another user's account without permission`,
  },
  {
    title: 'User Content',
    content: `• You retain rights to content you upload
    • You grant us license to use your content for service operation
    • You must not upload illegal or infringing content
    • We may remove content that violates these terms
    • We are not responsible for user-generated content`,
  },
  {
    title: 'Service Usage',
    content: `• Use the service only for lawful purposes
    • Do not interfere with service operation
    • Do not attempt to access restricted areas
    • Do not use automated systems without permission
    • Respect rate limits and technical restrictions`,
  },
  {
    title: 'Intellectual Property',
    content: `• Our service and content are protected by copyright
    • Our trademarks may not be used without permission
    • We respect intellectual property rights of others
    • Report copyright infringement to legal@wearwise.com
    • We will investigate and take appropriate action`,
  },
  {
    title: 'Termination',
    content: `• We may terminate or suspend your account at any time
    • You may terminate your account at any time
    • All provisions survive termination
    • We are not liable for termination
    • You may lose access to your content upon termination`,
  },
]

export default function TermsOfService() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <motion.section
              key={index}
              variants={sectionVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </motion.section>
          ))}

          <motion.section
            variants={sectionVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@wearwise.com
              <br />
              Address: 123 Fashion Street, Style City, ST 12345
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
} 