'use client'

import { FC, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export const ColorPicker: FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <div
            className="w-6 h-6 rounded border border-gray-200"
            style={{ backgroundColor: value }}
          />
          <span className="font-mono text-gray-600">{value}</span>
        </button>

        {showPicker && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowPicker(false)}
            />
            <div className="absolute top-full left-0 mt-2 z-20 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
              <HexColorPicker color={value} onChange={onChange} />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full mt-2 px-2 py-1 border border-gray-300 rounded text-sm font-mono"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
