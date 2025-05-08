"use client"

import { useRef, useEffect, useState } from "react"
import QRCode from "qrcode";

interface QRPreviewProps {
  content: string
  foregroundColor: string
  backgroundColor: string
  logo: string | null
  enableTracking: boolean
  enableDynamic: boolean
  enableShortUrl: boolean
  downloadFormat: "png" | "svg"
  onGenerate: () => void
}

export default function QRPreview({
  content,
  foregroundColor,
  backgroundColor,
  logo,
  enableTracking,
  enableDynamic,
  enableShortUrl,
  downloadFormat,
  onGenerate,
}: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate QR code when parameters change
  useEffect(() => {
    if (!content) {
      setQrDataUrl("")
      return
    }

    const generateQR = async () => {
      if (!canvasRef.current) return

      try {
        // Add metadata to content if features are enabled
        let qrContent = content
        if (enableDynamic) {
          // In a real app, this would create a dynamic link with an ID
          qrContent = `dynamic:${content}`
        }
        if (enableTracking) {
          // In a real app, this would add tracking parameters
          qrContent = `tracking:${qrContent}`
        }
        if (enableShortUrl) {
          // In a real app, this would generate a short URL
          qrContent = `shorturl:${qrContent}`
        }

        // Generate QR code on canvas
        await QRCode.toCanvas(canvasRef.current, qrContent, {
          width: 240,
          margin: 1,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
        })

        // If logo is present, draw it on the canvas
        if (logo) {
          const ctx = canvasRef.current.getContext("2d")
          if (ctx) {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = logo
            img.onload = () => {
              const size = canvasRef.current!.width / 4
              const x = (canvasRef.current!.width - size) / 2
              const y = (canvasRef.current!.height - size) / 2

              // Clear the center area
              ctx.fillStyle = backgroundColor
              ctx.fillRect(x, y, size, size)

              // Draw the logo
              ctx.drawImage(img, x, y, size, size)

              // Update data URL
              setQrDataUrl(canvasRef.current!.toDataURL(downloadFormat === "png" ? "image/png" : "image/svg+xml"))
            }
          }
        } else {
          // No logo, just use the canvas as is
          setQrDataUrl(canvasRef.current.toDataURL(downloadFormat === "png" ? "image/png" : "image/svg+xml"))
        }
      } catch (error) {
        console.error("Error generating QR code:", error)
      }
    }

    generateQR()
  }, [content, foregroundColor, backgroundColor, logo, enableTracking, enableDynamic, enableShortUrl, downloadFormat])

  // Handle download
  const handleDownload = () => {
    if (!qrDataUrl || !content) return

    const link = document.createElement("a")
    link.href = qrDataUrl
    link.download = `qrcode-${new Date().getTime()}.${downloadFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle generate button click
  const handleGenerate = async () => {
    if (!content) return

    setIsGenerating(true)
    // Simulate processing time
    setTimeout(() => {
      onGenerate()
      setIsGenerating(false)
    }, 800)
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-base font-medium text-slate-800 mb-4">QR Code Preview</h3>

      <div className="flex-1 flex flex-col items-center justify-center">
        {content ? (
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4">
              <canvas ref={canvasRef} width={240} height={240} className="mx-auto" />
            </div>

            <div className="text-sm text-slate-500 mb-4 text-center max-w-xs">
              {enableTracking && <span className="block">✓ Tracking enabled</span>}
              {enableDynamic && <span className="block">✓ Dynamic QR code</span>}
              {enableShortUrl && <span className="block">✓ Short URL enabled</span>}
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 py-8">
            <div className="w-40 h-40 border-2 border-dashed border-slate-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <p className="text-sm">QR code preview</p>
            </div>
            <p>Enter content to generate a QR code</p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {/* <button
          onClick={handleGenerate}
          disabled={!content || isGenerating}
          className={`w-full py-2.5 px-4 rounded-md font-medium text-white transition ${
            !content
              ? "bg-slate-300 cursor-not-allowed"
              : isGenerating
                ? "bg-emerald-600 opacity-80"
                : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isGenerating ? "Generating..." : "Generate QR Code"}
        </button> */}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            disabled={!qrDataUrl}
            className={`py-2 px-4 rounded-md font-medium transition flex items-center justify-center ${
              !qrDataUrl
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>

          <button
            // disabled={!qrDataUrl}
            disabled={true}
            className={`py-2 px-4 rounded-md font-medium transition flex items-center justify-center ${
              true
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
