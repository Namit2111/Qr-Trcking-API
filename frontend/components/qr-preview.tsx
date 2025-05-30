"use client"

import { useRef, useEffect, useState } from "react"
import QRCode from "qrcode"
import Toast, { ToastType } from "@/components/Toast"

interface QRPreviewProps {
  content: string
  foregroundColor: string
  backgroundColor: string
  logo: string | null
  enableTracking: boolean
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
  enableShortUrl,
  downloadFormat,
  onGenerate,
}: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: ToastType
  } | null>(null)

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
        if (enableTracking) {
          qrContent = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/qr/track?link=${qrContent}`
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
        setToast({
          message: "Error generating QR code. Please try again.",
          type: "error"
        })
      }
    }

    generateQR()
  }, [content, foregroundColor, backgroundColor, logo, enableTracking, enableShortUrl, downloadFormat])

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
    try {
      // If tracking is enabled, validate URL with backend first
      if (enableTracking) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/qr/trackable`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: content }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || 'Invalid URL')
        }

        const data = await response.json()
        // Update QR content with tracking URL
        const qrContent = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${data.tracking_url}`
        
        // Generate QR code with tracking URL
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, qrContent, {
            width: 240,
            margin: 1,
            color: {
              dark: foregroundColor,
              light: backgroundColor,
            },
          })

          // Update data URL
          setQrDataUrl(canvasRef.current.toDataURL(downloadFormat === "png" ? "image/png" : "image/svg+xml"))
        }
      }

      // Call the onGenerate callback
      onGenerate()
      
      // Download the QR code
      if (qrDataUrl) {
        const link = document.createElement("a")
        link.href = qrDataUrl
        link.download = `qrcode-${new Date().getTime()}.${downloadFormat}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Show success toast
        setToast({
          message: "QR Code generated and downloaded successfully!",
          type: "success"
        })
      }
    } catch (error) {
      console.error("Error generating QR code:", error)
      setToast({
        message: error instanceof Error ? error.message : "Error generating QR code. Please try again.",
        type: "error"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <h3 className="text-base font-medium text-slate-800 mb-4">QR Code Preview</h3>

      <div className="flex-1 flex flex-col items-center justify-center">
        {content ? (
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4">
              <canvas ref={canvasRef} width={240} height={240} className="mx-auto" />
            </div>

            <div className="text-sm text-slate-500 mb-4 text-center max-w-xs">
              {enableTracking && <span className="block">✓ Tracking enabled</span>}
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
        <button
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
          {isGenerating ? "Generating..." : "Generate & Download QR Code"}
        </button>
      </div>
    </div>
  )
}
