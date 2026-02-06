'use client'

import { FC } from 'react'

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiline?: boolean
}

export const TextInput: FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      )}
    </div>
  )
}
