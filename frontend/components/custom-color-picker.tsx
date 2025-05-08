"use client"

interface CustomColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function CustomColorPicker({ label, value, onChange }: CustomColorPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-md border border-slate-300" style={{ backgroundColor: value }} />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          id={`color-${label}`}
        />
        <label
          htmlFor={`color-${label}`}
          className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-md text-slate-700 text-sm hover:bg-slate-200 cursor-pointer"
        >
          Choose
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}
