"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { detectContentType } from "@/lib/utils"
import QRPreview from "@/components/qr-preview"
import CustomToggle from "@/components/custom-toggle"
import CustomColorPicker from "@/components/custom-color-picker"
import { saveQRCode } from "@/lib/qr-service"
import Toast, { ToastType } from "@/components/Toast"
import { useUser } from "@/lib/context"

export default function QRGenerator() {
  // QR content state
  const [content, setContent] = useState("")
  const [isUrl, setIsUrl] = useState(false)
  const [qrType, setQrType] = useState<"text" | "url" | "phone" | "sms" | "email" | "contact">("text")
  const [contentType, setContentType] = useState<"url" | "email" | "sms" | "tel" | "text">("text")
  const { user } = useUser()

  // Toast state
  const [toast, setToast] = useState<{
    message: string
    type: ToastType
  } | null>(null)

  // Feature toggles
  const [enableTracking, setEnableTracking] = useState(false)
  const [enableShortUrl, setEnableShortUrl] = useState(false)

  // Customization options
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [logo, setLogo] = useState<string | null>(null)
  const [downloadFormat, setDownloadFormat] = useState<"png" | "svg">("png")

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check if content is a valid URL
  useEffect(() => {
    const type = detectContentType(content)
    setContentType(type)
    setIsUrl(type === "url")

    // If not a URL or user is not logged in, disable tracking
    if (type !== "url" || !user) {
      setEnableTracking(false)
    }
  }, [content, user])

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle logo removal
  const handleRemoveLogo = () => {
    setLogo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleQrTypeChange = (type: typeof qrType) => {
    setQrType(type)
    switch (type) {
      case "url":
        setContent("https://")
        break
      case "phone":
        setContent("tel:+123456789")
        break
      case "sms":
        setContent("sms:+123456789")
        break
      case "email":
        setContent("mailto:example@example.com")
        break
      case "contact":
        setContent(`BEGIN:VCARD\nVERSION:3.0\nFN=John Doe\nTEL=+123456789\nEMAIL=john@example.com\nEND:VCARD`)
        break
      default:
        setContent("")
    }
  }

  // Handle QR code generation and saving
  const handleGenerateQR = () => {
    if (!content) return

    const formattedContent = (() => {
      switch (qrType) {
        case "url":
          return content.startsWith("http") ? content : `https://${content}`
        case "phone":
          return `tel:${content}`
        case "sms":
          return `sms:${content}`
        case "email":
          return `mailto:${content}`
        case "contact":
          return `BEGIN:VCARD\nVERSION:3.0\nFN:${content}\nEND:VCARD`
        default:
          return content
      }
    })()

    // In a real app, this would save to a database
    saveQRCode({
      id: Date.now().toString(),
      content: formattedContent,
      isTracking: enableTracking,
      isShortUrl: enableShortUrl,
      foregroundColor,
      backgroundColor,
      hasLogo: !!logo,
      createdAt: new Date().toISOString(),
      scans: [],
    })

    // Show success toast
    setToast({
      message: "QR Code generated and downloaded successfully!",
      type: "success"
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left panel - QR code options */}
        <div className="lg:col-span-2 p-6">
          <div className="space-y-6">
            {/* Content input */}
            <div>
              {/* <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">
                QR Code Content
              </label> */}
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="content" className="text-sm font-medium text-slate-700">
                  QR Code Content
                </label>
                <div>
                  <select
                    value={qrType}
                    onChange={(e) => handleQrTypeChange(e.target.value as any)}
                    className="text-sm px-3 py-1 border border-slate-300 rounded-md bg-white text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="text">Plain Text</option>
                    <option value="url">URL</option>
                    <option value="phone">Phone</option>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                    <option value="contact">Contact (vCard)</option>
                  </select>
                </div>
              </div>

              <textarea
                id="content"
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder={
                  qrType === "url"
                    ? "Enter URL (e.g. https://example.com)"
                    : qrType === "phone"
                      ? "Enter phone number (e.g. +123456789)"
                      : qrType === "sms"
                        ? "Enter number for SMS"
                        : qrType === "email"
                          ? "Enter email address"
                          : qrType === "contact"
                            ? "Enter contact details in vCard format"
                            : "Enter text for your QR code"
                }
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {contentType !== "text" && (
                <p className="mt-1 text-sm text-emerald-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                  Valid {contentType.toUpperCase()} detected
                </p>
              )}

              {/* Tracking Toggle */}
              <div className="mt-4">
                <CustomToggle
                  id="tracking-toggle"
                  label="Enable QR Code Tracking"
                  description={!user ? "Sign in to enable tracking" : !isUrl ? "Only available for URLs" : "Track scans and analytics for this QR code"}
                  checked={enableTracking}
                  onChange={setEnableTracking}
                  disabled={!user || !isUrl}
                />
              </div>

            </div>

            {/* Customization options */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-slate-800">Customization</h3>

              {/* Color pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomColorPicker label="Foreground Color" value={foregroundColor} onChange={setForegroundColor} />
                <CustomColorPicker label="Background Color" value={backgroundColor} onChange={setBackgroundColor} />
              </div>

              {/* Logo upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Add Logo (Optional)</label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-md text-slate-700 text-sm font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition flex items-center"
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
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <path d="M18 5V3" />
                      <path d="M21 8H3" />
                      <path d="m9 15 3-3 3 3" />
                      <path d="M14 14v4" />
                    </svg>
                    Upload Logo
                  </button>
                  {logo && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                {logo && (
                  <div className="mt-2 inline-block p-1 border border-slate-200 rounded">
                    <img src={logo || "/placeholder.svg"} alt="Logo preview" className="h-8 w-8 object-contain" />
                  </div>
                )}
              </div>

              {/* Download format */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Download Format</label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setDownloadFormat("png")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${downloadFormat === "png"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200"
                      }`}
                  >
                    PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadFormat("svg")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${downloadFormat === "svg"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200"
                      }`}
                  >
                    SVG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel - QR code preview */}
        <div className="p-6">
          <QRPreview
            content={content}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            logo={logo}
            enableTracking={enableTracking}
            enableShortUrl={enableShortUrl}
            downloadFormat={downloadFormat}
            onGenerate={handleGenerateQR}
          />
        </div>
      </div>
    </div>
  )
}
