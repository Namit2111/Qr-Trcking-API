"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import QRCodeList from "@/components/qr-code-list"
import PrivateKeyAccess from "@/components/private-key-access"
import type { QRCodeData } from "@/lib/types"
import { getQRCodes } from "@/lib/qr-service"

export default function Dashboard() {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])
  const [privateKey, setPrivateKey] = useState<string>("")
  const [isPrivateView, setIsPrivateView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching QR codes from an API
    setIsLoading(true)
    const codes = getQRCodes(privateKey)
    setQRCodes(codes)
    setIsLoading(false)
  }, [privateKey])

  const handlePrivateKeySubmit = (key: string) => {
    setPrivateKey(key)
    setIsPrivateView(true)
  }

  const handleClearPrivateKey = () => {
    setPrivateKey("")
    setIsPrivateView(false)
  }

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
                  <Link href="/" className="text-slate-600 hover:text-emerald-600 transition-colors">
                    Generator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-slate-800 font-medium hover:text-emerald-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {isPrivateView ? (
              <>
                <div className="mb-6">
                  <button
                    onClick={handleClearPrivateKey}
                    className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to public dashboard
                  </button>
                </div>
                <DashboardHeader
                  title={`Private Dashboard: ${privateKey}`}
                  description="Viewing QR codes associated with your private key"
                />
              </>
            ) : (
              <>
                <DashboardHeader
                  title="QR Code Dashboard"
                  description="Track and manage your QR codes. View analytics for public QR codes or access your private dashboard."
                />
                <div className="mb-8">
                  <PrivateKeyAccess onSubmit={handlePrivateKeySubmit} />
                </div>
              </>
            )}

            <QRCodeList qrCodes={qrCodes} isLoading={isLoading} isPrivateView={isPrivateView} />
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
