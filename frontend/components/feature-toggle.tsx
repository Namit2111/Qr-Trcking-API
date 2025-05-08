"use client"

import type { ReactNode } from "react"

interface FeatureToggleProps {
  id: string
  label: string
  description: string
  enabled: boolean
  onChange: (enabled: boolean) => void
  icon?: ReactNode
}

export default function FeatureToggle({ id, label, description, enabled, onChange, icon }: FeatureToggleProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 pt-0.5">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
            enabled ? "bg-teal-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          {icon && <span className="mr-2 text-gray-500">{icon}</span>}
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>
    </div>
  )
}
