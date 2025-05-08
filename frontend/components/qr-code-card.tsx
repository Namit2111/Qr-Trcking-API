import type { QRCodeData } from "@/lib/types"

interface QRCodeCardProps {
  qrCode: QRCodeData
}

export default function QRCodeCard({ qrCode }: QRCodeCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Get scan stats
  const totalScans = qrCode.scans.length
  const lastScan = qrCode.scans.length > 0 ? formatDate(qrCode.scans[qrCode.scans.length - 1].timestamp) : "Never"

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-slate-800 truncate" title={qrCode.content}>
            {qrCode.content.length > 30 ? qrCode.content.substring(0, 30) + "..." : qrCode.content}
          </h3>
          <p className="text-xs text-slate-500">Created {formatDate(qrCode.createdAt)}</p>
        </div>
        <div className="flex space-x-1">
          {qrCode.isTracking && (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
              Tracking
            </span>
          )}
          {qrCode.isDynamic && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              Dynamic
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-slate-600">Total Scans</p>
            <p className="text-2xl font-semibold text-slate-800">{totalScans}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Last Scan</p>
            <p className="text-sm font-medium text-slate-800">{lastScan}</p>
          </div>
        </div>

        {qrCode.scans.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Activity</h4>
            <div className="space-y-2">
              {qrCode.scans.slice(0, 3).map((scan, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{formatDate(scan.timestamp)}</span>
                  <span className="text-slate-800">{scan.location || "Unknown location"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between">
          <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View Details</button>
          <button className="text-sm text-slate-600 hover:text-slate-800">Download QR</button>
        </div>
      </div>
    </div>
  )
}
