import type { QRCodeData } from "@/lib/types"
import QRCodeCard from "@/components/qr-code-card"

interface QRCodeListProps {
  qrCodes: QRCodeData[]
  isLoading: boolean
  isPrivateView: boolean
}

export default function QRCodeList({ qrCodes, isLoading, isPrivateView }: QRCodeListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
        <p className="mt-4 text-slate-600">Loading QR codes...</p>
      </div>
    )
  }

  if (qrCodes.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 mx-auto text-slate-400 mb-4"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 7h.01" />
          <path d="M17 7h.01" />
          <path d="M7 17h.01" />
          <path d="M17 17h.01" />
          <path d="M7 12h10" />
        </svg>
        <h3 className="text-lg font-medium text-slate-800 mb-1">No QR Codes Found</h3>
        <p className="text-slate-600">
          {isPrivateView
            ? "No QR codes associated with this private key."
            : "No public QR codes available. Generate a QR code to get started."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {qrCodes.map((qrCode) => (
        <QRCodeCard key={qrCode.id} qrCode={qrCode} />
      ))}
    </div>
  )
}
