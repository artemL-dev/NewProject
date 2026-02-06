'use client'

import { FC } from 'react'
import type { WhiteCardsV1Block as WhiteCardsV1BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const defaultProps = {
  title: 'Why Choose Us',
  subtitle: 'Discover the advantages of our platform',
  items: [
    { title: 'Quality Service', subtitle: 'We deliver excellence in everything we do' },
    { title: 'Expert Team', subtitle: 'Our professionals have years of experience' },
    { title: '24/7 Support', subtitle: 'We are always here to help you succeed' },
  ],
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  accentColor: '#3b82f6',
}

export const whiteCardsV1Definition: BlockDefinition = {
  type: 'white-cards-v1',
  name: 'Cards V1',
  description: 'Grid of cards with left accent border, title and subtitle',
  icon: 'layout-grid',
  category: 'white',
  defaultProps: { ...defaultProps },
}

export const createWhiteCardsV1Block = (): WhiteCardsV1BlockType => ({
  id: uuidv4(),
  type: 'white-cards-v1',
  order: 0,
  props: { ...defaultProps },
})

export const WhiteCardsV1Block: FC<BlockRenderProps<WhiteCardsV1BlockType>> = ({ block, isSelected }) => {
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
              className="p-6 rounded-xl shadow-sm border"
              style={{ borderLeftWidth: '4px', borderLeftColor: props.accentColor }}
            >
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

export const WhiteCardsV1Editor: FC<BlockEditorProps<WhiteCardsV1BlockType>> = ({ block, onChange }) => {
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
