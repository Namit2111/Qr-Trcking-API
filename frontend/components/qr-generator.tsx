"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { isValidUrl } from "@/lib/utils"
import QRPreview from "@/components/qr-preview"
import CustomToggle from "@/components/custom-toggle"
import CustomColorPicker from "@/components/custom-color-picker"
import { saveQRCode } from "@/lib/qr-service"

export default function QRGenerator() {
  // QR content state
  const [content, setContent] = useState("")
  const [isUrl, setIsUrl] = useState(false)

  // Feature toggles
  const [enableTracking, setEnableTracking] = useState(false)
  const [enableDynamic, setEnableDynamic] = useState(false)
  const [enableShortUrl, setEnableShortUrl] = useState(false)
  const [privateKey, setPrivateKey] = useState("")

  // Dynamic content (if enabled)
  const [dynamicContent, setDynamicContent] = useState("")

  // Customization options
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [logo, setLogo] = useState<string | null>(null)
  const [downloadFormat, setDownloadFormat] = useState<"png" | "svg">("png")

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check if content is a valid URL
  useEffect(() => {
    const valid = isValidUrl(content)
    setIsUrl(valid)

    // If not a URL, disable tracking and short URL options
    if (!valid) {
      setEnableTracking(false)
      setEnableShortUrl(false)
    }
  }, [content])

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

  // Handle QR code generation and saving
  const handleGenerateQR = () => {
    if (!content) return

    // In a real app, this would save to a database
    saveQRCode({
      id: Date.now().toString(),
      content,
      dynamicContent: enableDynamic ? dynamicContent : undefined,
      isTracking: enableTracking,
      isShortUrl: enableShortUrl,
      isDynamic: enableDynamic,
      privateKey: privateKey || undefined,
      foregroundColor,
      backgroundColor,
      hasLogo: !!logo,
      createdAt: new Date().toISOString(),
      scans: [],
    })

    // Show success message or redirect to dashboard
    alert("QR Code generated successfully!")
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left panel - QR code options */}
        <div className="lg:col-span-2 p-6">
          <div className="space-y-6">
            {/* Content input */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">
                QR Code Content
              </label>
              <textarea
                id="content"
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="Enter text or URL for your QR code"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {isUrl && (
                <p className="mt-1 text-sm text-emerald-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                  Valid URL detected
                </p>
              )}
            </div>

            {/* Feature toggles */}
            {/* <div className="space-y-4"> */}
              {/* <h3 className="text-base font-medium text-slate-800">Features</h3> */}

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isUrl && (
                  <CustomToggle
                    id="tracking"
                    label="Enable Tracking"
                    description="Track scans, timestamps, and location data"
                    checked={enableTracking}
                    onChange={setEnableTracking}
                  />
                )}

                <CustomToggle
                  id="dynamic"
                  label="Dynamic QR Code"
                  description="Update content later without changing the QR code"
                  checked={enableDynamic}
                  onChange={setEnableDynamic}
                />

                {isUrl && (
                  <CustomToggle
                    id="shorturl"
                    label="Create Short URL"
                    description="Generate a shorter URL for your link"
                    checked={enableShortUrl}
                    onChange={setEnableShortUrl}
                  />
                )}
              </div> */}

              {/* Private key input (only if tracking is enabled) */}
              {/* {enableTracking && (
                <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200">
                  <label htmlFor="privateKey" className="block text-sm font-medium text-slate-700 mb-1">
                    Private Key (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="privateKey"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      placeholder="e.g., client-xyz"
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Add a private key to hide this QR code from the public dashboard
                  </p>
                </div>
              )} */}

              {/* Dynamic content input (only if dynamic is enabled) */}
              {/* {enableDynamic && (
                <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200">
                  <label htmlFor="dynamicContent" className="block text-sm font-medium text-slate-700 mb-1">
                    Dynamic Content (Optional)
                  </label>
                  <textarea
                    id="dynamicContent"
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="Content that can be updated later"
                    value={dynamicContent}
                    onChange={(e) => setDynamicContent(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    This content can be changed later without regenerating the QR code
                  </p>
                </div>
              )} */}
            {/* </div> */}

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
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      downloadFormat === "png"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadFormat("svg")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      downloadFormat === "svg"
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
            enableDynamic={enableDynamic}
            enableShortUrl={enableShortUrl}
            downloadFormat={downloadFormat}
            onGenerate={handleGenerateQR}
          />
        </div>
      </div>
    </div>
  )
}
