'use client'

import { motion } from 'framer-motion'

const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, including:
    • Personal information (name, email, etc.)
    • Body measurements and preferences
    • Photos of your clothing items
    • Style preferences and fashion choices
    • Usage data and interaction with our services`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the collected information to:
    • Provide and improve our AI styling services
    • Personalize your experience
    • Process your requests and transactions
    • Send you updates and marketing communications
    • Analyze and enhance our services
    • Ensure platform security and prevent fraud`,
  },
  {
    title: 'Data Storage and Security',
    content: `Your data security is our priority:
    • All data is encrypted in transit and at rest
    • Regular security audits and updates
    • Strict access controls and monitoring
    • Industry-standard security protocols
    • Regular backups and disaster recovery`,
  },
  {
    title: 'Third-Party Services',
    content: `We may share data with trusted third parties:
    • Payment processors
    • Analytics providers
    • Cloud storage services
    • Marketing services
    All third parties must adhere to our privacy standards.`,
  },
  {
    title: 'Your Rights and Choices',
    content: `You have the right to:
    • Access your personal data
    • Correct inaccurate data
    • Delete your account and data
    • Opt-out of marketing communications
    • Export your data
    Contact us to exercise these rights.`,
  },
]

export default function PrivacyPolicy() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
            Privacy Policy
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
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
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@wearwise.com
              <br />
              Address: 123 Fashion Street, Style City, ST 12345
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
} 