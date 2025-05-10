'use client'

import { FC, useState } from 'react'
import { FAQ as FAQType } from '@/lib/mdx'
import JsonLd from './JsonLd'

interface FAQProps {
  faqs: FAQType[]
}

const FAQ: FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mt-16 border-t border-slate-200 pt-8">
      <JsonLd data={jsonLdData} />
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-lg font-semibold text-slate-800">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-slate-500 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-6 pt-0 text-slate-600">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ 