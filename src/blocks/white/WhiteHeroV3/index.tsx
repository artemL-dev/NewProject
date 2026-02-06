'use client'

import { FC } from 'react'
import type { WhiteHeroV3Block as WhiteHeroV3BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeroV3Definition: BlockDefinition = {
  type: 'white-hero-v3',
  name: 'White Hero V3',
  description: 'Full-width dark hero with centered text and large image below',
  icon: '🌙',
  category: 'white',
  defaultProps: {
    title: 'Transform Your Experience',
    subtitle: 'Powerful tools for modern needs',
    imageUrl: '',
    btnUrl: '#',
    btnText: 'Start Free',
    backgroundColor: '#0f172a',
    textColor: '#f1f5f9',
    accentColor: '#38bdf8',
  },
}

export const createWhiteHeroV3Block = (): WhiteHeroV3BlockType => ({
  id: uuidv4(),
  type: 'white-hero-v3',
  order: 0,
  props: {
    title: 'Transform Your Experience',
    subtitle: 'Powerful tools for modern needs',
    imageUrl: '',
    btnUrl: '#',
    btnText: 'Start Free',
    backgroundColor: '#0f172a',
    textColor: '#f1f5f9',
    accentColor: '#38bdf8',
  },
})

export const WhiteHeroV3Block: FC<BlockRenderProps<WhiteHeroV3BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, imageUrl, btnUrl, btnText, backgroundColor, textColor, accentColor } = block.props

  return (
    <section
      style={{ backgroundColor, color: textColor }}
      className={`w-full py-20 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold leading-tight">{title}</h1>
        <p className="text-xl mt-4 opacity-70">{subtitle}</p>
        {btnText && (
          <a
            href={btnUrl || '#'}
            style={{ backgroundColor: accentColor, color: '#ffffff' }}
            className="inline-block mt-8 px-8 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
          >
            {btnText}
          </a>
        )}
        {imageUrl && (
          <div className="mt-12">
            <img
              src={imageUrl}
              alt={title}
              className="mx-auto max-w-full rounded-lg shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export const WhiteHeroV3Editor: FC<BlockEditorProps<WhiteHeroV3BlockType>> = ({ block, onChange }) => {
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
          <input
            type="text"
            value={props.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={props.btnText}
            onChange={(e) => onChange({ btnText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
          <input
            type="text"
            value={props.btnUrl}
            onChange={(e) => onChange({ btnUrl: e.target.value })}
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
