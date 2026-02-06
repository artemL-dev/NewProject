'use client'

import { FC } from 'react'
import type { WhiteHeroV6Block as WhiteHeroV6BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeroV6Definition: BlockDefinition = {
  type: 'white-hero-v6',
  name: 'White Hero V6',
  description: 'Hero with background image, rating stars, and call-to-action',
  icon: '⭐',
  category: 'white',
  defaultProps: {
    title: 'Rated #1 Platform',
    subtitle: 'Join millions of satisfied users',
    backgroundImageUrl: '',
    btnUrl: '#',
    btnText: 'Join Now',
    rating: '4.9',
    ratingText: 'Based on 10,000+ reviews',
    backgroundColor: '#0c0a09',
    textColor: '#fafaf9',
    accentColor: '#f59e0b',
  },
}

export const createWhiteHeroV6Block = (): WhiteHeroV6BlockType => ({
  id: uuidv4(),
  type: 'white-hero-v6',
  order: 0,
  props: {
    title: 'Rated #1 Platform',
    subtitle: 'Join millions of satisfied users',
    backgroundImageUrl: '',
    btnUrl: '#',
    btnText: 'Join Now',
    rating: '4.9',
    ratingText: 'Based on 10,000+ reviews',
    backgroundColor: '#0c0a09',
    textColor: '#fafaf9',
    accentColor: '#f59e0b',
  },
})

export const WhiteHeroV6Block: FC<BlockRenderProps<WhiteHeroV6BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, backgroundImageUrl, btnUrl, btnText, rating, ratingText, backgroundColor, textColor, accentColor } = block.props

  const ratingValue = parseFloat(rating) || 0
  const fullStars = Math.floor(ratingValue)
  const hasHalfStar = ratingValue - fullStars >= 0.5

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
      <div className="absolute inset-0" style={{ backgroundColor, opacity: 0.75 }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center w-full" style={{ color: textColor }}>
        <div className="flex items-center justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className="w-6 h-6"
              style={{ color: i < fullStars || (i === fullStars && hasHalfStar) ? accentColor : 'rgba(255,255,255,0.3)' }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-lg font-semibold">{rating}</span>
        </div>
        {ratingText && (
          <p className="text-sm opacity-60 mb-6">{ratingText}</p>
        )}
        <h1 className="text-5xl font-bold leading-tight">{title}</h1>
        <p className="text-xl mt-4 opacity-70">{subtitle}</p>
        {btnText && (
          <a
            href={btnUrl || '#'}
            style={{ backgroundColor: accentColor, color: '#000000' }}
            className="inline-block mt-8 px-8 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
          >
            {btnText}
          </a>
        )}
      </div>
    </section>
  )
}

export const WhiteHeroV6Editor: FC<BlockEditorProps<WhiteHeroV6BlockType>> = ({ block, onChange }) => {
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
        <h3 className="font-semibold text-gray-800 border-b pb-2">Rating</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating (e.g. 4.9)</label>
          <input
            type="text"
            value={props.rating}
            onChange={(e) => onChange({ rating: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating Text</label>
          <input
            type="text"
            value={props.ratingText}
            onChange={(e) => onChange({ ratingText: e.target.value })}
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
