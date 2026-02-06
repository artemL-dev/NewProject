'use client'

import { FC } from 'react'
import type { WhiteTextblockV2Block as WhiteTextblockV2BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteTextblockV2Definition: BlockDefinition = {
  type: 'white-textblock-v2',
  name: 'White Textblock V2',
  description: 'Two-column text and image with alternating layout',
  icon: 'text',
  category: 'white',
  defaultProps: {
    title: 'Elevate Your Experience',
    subtitle: 'We bring innovation and quality to every project we undertake. Our commitment to excellence drives us forward.',
    imageUrl: '',
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    accentColor: '#6366f1',
  },
}

export const createWhiteTextblockV2Block = (): WhiteTextblockV2BlockType => ({
  id: uuidv4(),
  type: 'white-textblock-v2',
  order: 0,
  props: {
    title: 'Elevate Your Experience',
    subtitle: 'We bring innovation and quality to every project we undertake. Our commitment to excellence drives us forward.',
    imageUrl: '',
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    accentColor: '#6366f1',
  },
})

export const WhiteTextblockV2Block: FC<BlockRenderProps<WhiteTextblockV2BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, imageUrl, backgroundColor, textColor, accentColor } = block.props

  return (
    <section
      style={{ backgroundColor, color: textColor }}
      className={`w-full py-16 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg leading-relaxed mt-4 opacity-80">{subtitle}</p>
            <div
              className="w-16 h-1 rounded-full mt-6"
              style={{ backgroundColor: accentColor }}
            />
          </div>
          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                alt={title}
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export const WhiteTextblockV2Editor: FC<BlockEditorProps<WhiteTextblockV2BlockType>> = ({ block, onChange }) => {
  const props = block.props

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
          <textarea
            value={props.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={props.imageUrl}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
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
