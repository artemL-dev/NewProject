'use client'

import { FC } from 'react'

interface NumberInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export const NumberInput: FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  )
}
