import { FC } from 'react'
import { FAQ as FAQType } from '@/lib/mdx'
import JsonLd from './JsonLd'

interface FAQProps {
  faqs: FAQType[]
}

const FAQ: FC<FAQProps> = ({ faqs }) => {
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

  return (
    <section className="mt-16 border-t border-slate-200 pt-8">
      <JsonLd data={jsonLdData} />
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">{faq.question}</h3>
            <p className="text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ 