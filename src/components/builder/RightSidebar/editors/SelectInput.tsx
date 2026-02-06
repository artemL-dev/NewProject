'use client'

import { FC } from 'react'

interface SelectInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

export const SelectInput: FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
