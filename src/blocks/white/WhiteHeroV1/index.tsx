'use client'

import { FC } from 'react'
import type { WhiteHeroV1Block as WhiteHeroV1BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeroV1Definition: BlockDefinition = {
  type: 'white-hero-v1',
  name: 'White Hero V1',
  description: 'Centered hero section with title, subtitle, button and optional image',
  icon: '🏠',
  category: 'white',
  defaultProps: {
    title: 'Welcome to Our Platform',
    subtitle: 'Discover amazing features and possibilities',
    imageUrl: '',
    btnUrl: '#',
    btnText: 'Get Started',
    backgroundColor: '#ffffff',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
  },
}

export const createWhiteHeroV1Block = (): WhiteHeroV1BlockType => ({
  id: uuidv4(),
  type: 'white-hero-v1',
  order: 0,
  props: {
    title: 'Welcome to Our Platform',
    subtitle: 'Discover amazing features and possibilities',
    imageUrl: '',
    btnUrl: '#',
    btnText: 'Get Started',
    backgroundColor: '#ffffff',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
  },
})

export const WhiteHeroV1Block: FC<BlockRenderProps<WhiteHeroV1BlockType>> = ({ block, isSelected }) => {
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
              className="mx-auto max-w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export const WhiteHeroV1Editor: FC<BlockEditorProps<WhiteHeroV1BlockType>> = ({ block, onChange }) => {
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
