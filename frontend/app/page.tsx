import Image from 'next/image'
import Link from 'next/link'
import QRGenerator from '@/components/qr-generator'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Create Your QR Code</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Generate standard, tracking, or dynamic QR codes with custom styling. Preview in real-time and download
                in your preferred format.
              </p>
            </div>

            <QRGenerator />
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
