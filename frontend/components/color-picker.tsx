"use client"

interface ColorPickerProps {
  label: string
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-md border border-gray-300" style={{ backgroundColor: color }} />
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          id={`color-${label}`}
        />
        <label
          htmlFor={`color-${label}`}
          className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-200 cursor-pointer"
        >
          Choose
        </label>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}
