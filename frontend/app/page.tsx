import Link from "next/link"
import QRGenerator from "@/components/qr-generator"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  <path d="M12 12v5" />
                  <path d="M8 12v2" />
                  <path d="M16 12v2" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">QR Small</h1>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link href="/" className="text-slate-800 font-medium hover:text-emerald-600 transition-colors">
                    Generator
                  </Link>
                </li>
                {/* <li>
                  <Link href="/dashboard" className="text-slate-600 hover:text-emerald-600 transition-colors">
                    Dashboard
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
