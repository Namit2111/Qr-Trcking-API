"use client"

import type React from "react"

import { useState } from "react"

interface PrivateKeyAccessProps {
  onSubmit: (key: string) => void
}

export default function PrivateKeyAccess({ onSubmit }: PrivateKeyAccessProps) {
  const [key, setKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (key.trim()) {
      onSubmit(key.trim())
    }
  }

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
      <h3 className="text-base font-medium text-slate-800 mb-2">Access Private Dashboard</h3>
      <p className="text-sm text-slate-600 mb-4">Enter your private key to view QR codes associated with that key.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter private key"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={!key.trim()}
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            !key.trim() ? "bg-slate-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          Access
        </button>
      </form>
    </div>
  )
}
