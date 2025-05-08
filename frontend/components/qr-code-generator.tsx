"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Upload, RefreshCw, Link2 } from "lucide-react"
import QRPreview from "./qr-preview"
import FeatureToggle from "./feature-toggle"
import ColorPicker from "./color-picker"
import { isValidUrl } from "@/lib/utils"

export default function QRCodeGenerator() {
  // QR content state
  const [content, setContent] = useState("")
  const [isUrl, setIsUrl] = useState(false)

  // Feature toggles
  const [enableTracking, setEnableTracking] = useState(false)
  const [enableDynamic, setEnableDynamic] = useState(false)
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
    setIsUrl(isValidUrl(content))

    // If not a URL, disable tracking and short URL options
    if (!isValidUrl(content)) {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left panel - QR code options */}
      <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">QR Code Content</h2>

        {/* Content input */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Text or URL
          </label>
          <textarea
            id="content"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            placeholder="Enter text or URL for your QR code"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Feature toggles */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium text-gray-800">Features</h3>

          {isUrl && (
            <FeatureToggle
              id="tracking"
              label="Enable Tracking"
              description="Track scans, timestamps, and location data"
              enabled={enableTracking}
              onChange={setEnableTracking}
              icon={<RefreshCw className="h-5 w-5" />}
            />
          )}

          <FeatureToggle
            id="dynamic"
            label="Dynamic QR Code"
            description="Update content later without changing the QR code"
            enabled={enableDynamic}
            onChange={setEnableDynamic}
            icon={<RefreshCw className="h-5 w-5" />}
          />

          {isUrl && (
            <FeatureToggle
              id="shorturl"
              label="Create Short URL"
              description="Generate a shorter URL for your link"
              enabled={enableShortUrl}
              onChange={setEnableShortUrl}
              icon={<Link2 className="h-5 w-5" />}
            />
          )}
        </div>

        {/* Customization options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Customization</h3>

          {/* Color pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorPicker label="Foreground Color" color={foregroundColor} onChange={setForegroundColor} />
            <ColorPicker label="Background Color" color={backgroundColor} onChange={setBackgroundColor} />
          </div>

          {/* Logo upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Logo (Optional)</label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </button>
              {logo && (
                <button type="button" onClick={handleRemoveLogo} className="text-sm text-red-600 hover:text-red-800">
                  Remove
                </button>
              )}
              <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
            </div>
          </div>

          {/* Download format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Download Format</label>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setDownloadFormat("png")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  downloadFormat === "png"
                    ? "bg-teal-100 text-teal-800 border border-teal-200"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                PNG
              </button>
              <button
                type="button"
                onClick={() => setDownloadFormat("svg")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  downloadFormat === "svg"
                    ? "bg-teal-100 text-teal-800 border border-teal-200"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                SVG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - QR code preview */}
      <div className="lg:col-span-2">
        <QRPreview
          content={content}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          logo={logo}
          enableTracking={enableTracking}
          enableDynamic={enableDynamic}
          enableShortUrl={enableShortUrl}
          downloadFormat={downloadFormat}
        />
      </div>
    </div>
  )
}
