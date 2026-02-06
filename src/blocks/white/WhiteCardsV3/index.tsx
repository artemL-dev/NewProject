'use client'

import { FC } from 'react'
import type { WhiteCardsV3Block as WhiteCardsV3BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const defaultProps = {
  title: 'Features',
  subtitle: 'Everything you need in one place',
  items: [
    { title: 'Fast Performance', subtitle: 'Lightning-fast load times', iconUrl: '' },
    { title: 'Secure', subtitle: 'Enterprise-grade security', iconUrl: '' },
    { title: 'Scalable', subtitle: 'Grows with your business', iconUrl: '' },
  ],
  backgroundColor: '#ffffff',
  textColor: '#111827',
  accentColor: '#10b981',
}

export const whiteCardsV3Definition: BlockDefinition = {
  type: 'white-cards-v3',
  name: 'Cards V3',
  description: 'Feature cards with icon circle, title and subtitle',
  icon: 'layout-grid',
  category: 'white',
  defaultProps: { ...defaultProps },
}

export const createWhiteCardsV3Block = (): WhiteCardsV3BlockType => ({
  id: uuidv4(),
  type: 'white-cards-v3',
  order: 0,
  props: { ...defaultProps },
})

export const WhiteCardsV3Block: FC<BlockRenderProps<WhiteCardsV3BlockType>> = ({ block, isSelected }) => {
  const { props } = block
  return (
    <div
      className={`py-16 px-6 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ color: props.textColor }}>
            {props.title}
          </h2>
          <p className="text-lg opacity-70" style={{ color: props.textColor }}>
            {props.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {props.items.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-sm border text-center"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${props.accentColor}20` }}
              >
                {item.iconUrl ? (
                  <img src={item.iconUrl} alt={item.title} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="text-lg font-bold" style={{ color: props.accentColor }}>
                    {item.title.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg" style={{ color: props.textColor }}>
                {item.title}
              </h3>
              <p className="text-sm opacity-70 mt-2" style={{ color: props.textColor }}>
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const WhiteCardsV3Editor: FC<BlockEditorProps<WhiteCardsV3BlockType>> = ({ block, onChange }) => {
  const { props } = block
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Content</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={props.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            value={props.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-500">
          Items can be configured in block settings
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
            <input
              type="color"
              value={props.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
            <input
              type="color"
              value={props.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
            <input
              type="color"
              value={props.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
