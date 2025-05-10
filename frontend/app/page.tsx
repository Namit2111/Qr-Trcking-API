import Image from 'next/image'
import Link from 'next/link'
import QRGenerator from '@/components/qr-generator'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'QR Code Generator | Create, Customize & Track QR Codes',
  description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator. Perfect for businesses, marketing, and personal use.',
  openGraph: {
    title: 'QR Code Generator | Create, Customize & Track QR Codes',
    description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator.',
  },
}

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Small - QR Code Generator',
  description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'QR Code Generation',
    'Custom Styling',
    'Tracking & Analytics',
    'Dynamic QR Codes'
  ]
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLdData} />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Create Your QR Code</h1>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Generate professional QR codes instantly with our free QR code generator. Create standard, tracking, or dynamic QR codes with custom styling. Perfect for businesses, marketing campaigns, and personal use.
              </p>
            </div>

            <div className="mb-12">
              <QRGenerator />
            </div>

            <section className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">Easy to Use</h2>
                <p className="text-slate-600">Create QR codes in seconds with our intuitive interface. No technical skills required.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">Customizable</h2>
                <p className="text-slate-600">Customize colors, add logos, and choose from multiple QR code styles to match your brand.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">Track & Analyze</h2>
                <p className="text-slate-600">Monitor QR code scans and gather valuable insights about your audience engagement.</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} QR Small. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-slate-500 text-sm hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-500 text-sm hover:text-emerald-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
