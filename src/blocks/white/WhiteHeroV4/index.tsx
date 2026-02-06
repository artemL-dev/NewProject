'use client'

import { FC } from 'react'
import type { WhiteHeroV4Block as WhiteHeroV4BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeroV4Definition: BlockDefinition = {
  type: 'white-hero-v4',
  name: 'White Hero V4',
  description: 'Two-column hero with features list and image',
  icon: '✅',
  category: 'white',
  defaultProps: {
    title: 'Everything You Need',
    subtitle: 'All-in-one solution for your business',
    imageUrl: '',
    btnUrl: '#',
    btnText: 'Try Now',
    features: ['Feature One', 'Feature Two', 'Feature Three'],
    backgroundColor: '#ffffff',
    textColor: '#111827',
    accentColor: '#10b981',
  },
}

export const createWhiteHeroV4Block = (): WhiteHeroV4BlockType => ({
  id: uuidv4(),
  type: 'white-hero-v4',
  order: 0,
  props: {
    title: 'Everything You Need',
    subtitle: 'All-in-one solution for your business',
    imageUrl: '',
    btnUrl: '#',
    btnText: 'Try Now',
    features: ['Feature One', 'Feature Two', 'Feature Three'],
    backgroundColor: '#ffffff',
    textColor: '#111827',
    accentColor: '#10b981',
  },
})

export const WhiteHeroV4Block: FC<BlockRenderProps<WhiteHeroV4BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, imageUrl, btnUrl, btnText, features, backgroundColor, textColor, accentColor } = block.props

  return (
    <section
      style={{ backgroundColor, color: textColor }}
      className={`w-full py-20 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:grid grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight">{title}</h1>
          <p className="text-lg mt-4 opacity-70">{subtitle}</p>
          {features && features.length > 0 && (
            <ul className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: accentColor }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
          {btnText && (
            <a
              href={btnUrl || '#'}
              style={{ backgroundColor: accentColor, color: '#ffffff' }}
              className="inline-block mt-8 px-8 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
            >
              {btnText}
            </a>
          )}
        </div>
        <div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export const WhiteHeroV4Editor: FC<BlockEditorProps<WhiteHeroV4BlockType>> = ({ block, onChange }) => {
  const props = block.props

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(props.features || [])]
    newFeatures[index] = value
    onChange({ features: newFeatures })
  }

  const addFeature = () => {
    const newFeatures = [...(props.features || []), '']
    onChange({ features: newFeatures })
  }

  const removeFeature = (index: number) => {
    const newFeatures = [...(props.features || [])]
    newFeatures.splice(index, 1)
    onChange({ features: newFeatures })
  }

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
        <h3 className="font-semibold text-gray-800 border-b pb-2">Features</h3>
        {(props.features || []).map((feature, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder={`Feature ${index + 1}`}
            />
            <button
              onClick={() => removeFeature(index)}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addFeature}
          className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
        >
          + Add Feature
        </button>
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
