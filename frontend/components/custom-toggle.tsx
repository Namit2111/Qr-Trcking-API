"use client"

interface CustomToggleProps {
  id: string
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function CustomToggle({ id, label, description, checked, onChange }: CustomToggleProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 pt-0.5">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
            checked ? "bg-emerald-600" : "bg-slate-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  )
}
