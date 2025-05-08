"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface CustomColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function CustomColorPicker({ label, value, onChange }: CustomColorPickerProps) {
  // Local state to manage the input value
  const [inputValue, setInputValue] = useState(value)
  // Debounce timer reference
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  // Debounce delay in milliseconds
  const DEBOUNCE_DELAY = 300
  
  // Update local state when prop changes
  useEffect(() => {
    setInputValue(value)
  }, [value])
  
  // Debounced color update function
  const debouncedColorUpdate = useCallback((newValue: string) => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      // Basic validation to ensure it's a valid hex color
      if (/^#([0-9A-F]{3}){1,2}$/i.test(newValue)) {
        onChange(newValue)
      }
      debounceTimerRef.current = null
    }, DEBOUNCE_DELAY)
  }, [onChange])
  
  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    // Debounce the update to parent component
    if (newValue.length === 7) {
      debouncedColorUpdate(newValue)
    }
  }
  
  // Handle native color picker changes
  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    // Debounce the color picker changes
    debouncedColorUpdate(newValue)
  }

  // Handle blur event to ensure value is applied
  const handleBlur = () => {
    // If there's a pending update, cancel it and update immediately
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }
    
    if (/^#([0-9A-F]{3}){1,2}$/i.test(inputValue)) {
      onChange(inputValue)
    }
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <div 
          className="w-8 h-8 rounded-md border border-slate-300" 
          style={{ backgroundColor: inputValue }} 
        />
        <input
          type="color"
          value={inputValue}
          onChange={handleColorPickerChange}
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
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-24 px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}