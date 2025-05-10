'use client'

import { FC } from 'react'

const CTASection: FC = () => {
  const scrollToGenerator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="mt-20 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Create Your QR Code?</h2>
      <p className="max-w-2xl mx-auto mb-6 text-white/90">
        Generate professional QR codes in seconds with our free, easy-to-use tool. No sign-up required.
      </p>
      <a 
        href="#generator" 
        onClick={scrollToGenerator}
        className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
      >
        Create QR Code Now
      </a>
    </section>
  )
}

export default CTASection 