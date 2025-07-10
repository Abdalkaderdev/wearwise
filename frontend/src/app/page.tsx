import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-rose-500 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-lg text-rose-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts who have already discovered the power of
            AI-driven style recommendations.
          </p>
          <a
            href="/auth/register"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-rose-600 bg-white hover:bg-rose-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </main>
  )
}
