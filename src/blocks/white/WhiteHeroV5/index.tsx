'use client'

import { FC } from 'react'
import type { WhiteHeroV5Block as WhiteHeroV5BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeroV5Definition: BlockDefinition = {
  type: 'white-hero-v5',
  name: 'White Hero V5',
  description: 'Full-width hero with background image, overlay and optional foreground image',
  icon: '🖼️',
  category: 'white',
  defaultProps: {
    title: 'Explore New Horizons',
    subtitle: 'Adventure awaits at every corner',
    imageUrl: '',
    backgroundImageUrl: '',
    btnUrl: '#',
    btnText: 'Discover',
    backgroundColor: '#1e1b4b',
    textColor: '#e0e7ff',
    accentColor: '#818cf8',
  },
}

export const createWhiteHeroV5Block = (): WhiteHeroV5BlockType => ({
  id: uuidv4(),
  type: 'white-hero-v5',
  order: 0,
  props: {
    title: 'Explore New Horizons',
    subtitle: 'Adventure awaits at every corner',
    imageUrl: '',
    backgroundImageUrl: '',
    btnUrl: '#',
    btnText: 'Discover',
    backgroundColor: '#1e1b4b',
    textColor: '#e0e7ff',
    accentColor: '#818cf8',
  },
})

export const WhiteHeroV5Block: FC<BlockRenderProps<WhiteHeroV5BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, imageUrl, backgroundImageUrl, btnUrl, btnText, backgroundColor, textColor, accentColor } = block.props

  return (
    <section
      className={`w-full relative min-h-[500px] flex items-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ backgroundColor }}
    >
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="absolute inset-0" style={{ backgroundColor, opacity: 0.7 }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center w-full" style={{ color: textColor }}>
        <h1 className="text-5xl font-bold leading-tight">{title}</h1>
        <p className="text-xl mt-4 opacity-80">{subtitle}</p>
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
              className="mx-auto max-w-md w-full rounded-lg shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export const WhiteHeroV5Editor: FC<BlockEditorProps<WhiteHeroV5BlockType>> = ({ block, onChange }) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Foreground Image URL</label>
          <input
            type="text"
            value={props.imageUrl}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
          <input
            type="text"
            value={props.backgroundImageUrl}
            onChange={(e) => onChange({ backgroundImageUrl: e.target.value })}
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
