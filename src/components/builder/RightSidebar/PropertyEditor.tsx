'use client'

import { FC } from 'react'
import type { Block } from '@/types/blocks'
import { TextInput } from './editors/TextInput'
import { ColorPicker } from './editors/ColorPicker'
import { NumberInput } from './editors/NumberInput'
import { SelectInput } from './editors/SelectInput'

interface PropertyEditorProps {
  block: Block
  onChange: (props: Record<string, any>) => void
}

// This is a fallback property editor that auto-generates UI based on the block props
// In practice, each block has its own custom editor component
export const PropertyEditor: FC<PropertyEditorProps> = ({ block, onChange }) => {
  const props = (block as any).props

  const renderField = (key: string, value: any) => {
    if (typeof value === 'string') {
      if (key.toLowerCase().includes('color')) {
        return (
          <ColorPicker
            key={key}
            label={formatLabel(key)}
            value={value}
            onChange={(v) => onChange({ [key]: v })}
          />
        )
      }
      return (
        <TextInput
          key={key}
          label={formatLabel(key)}
          value={value}
          onChange={(v) => onChange({ [key]: v })}
        />
      )
    }

    if (typeof value === 'number') {
      return (
        <NumberInput
          key={key}
          label={formatLabel(key)}
          value={value}
          onChange={(v) => onChange({ [key]: v })}
        />
      )
    }

    if (typeof value === 'boolean') {
      return (
        <div key={key} className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            id={key}
            checked={value}
            onChange={(e) => onChange({ [key]: e.target.checked })}
            className="rounded"
          />
          <label htmlFor={key} className="text-sm text-gray-700">
            {formatLabel(key)}
          </label>
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-4">
      {Object.entries(props).map(([key, value]) => renderField(key, value))}
    </div>
  )
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}
