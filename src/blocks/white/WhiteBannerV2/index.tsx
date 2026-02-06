'use client'

import { FC, useState } from 'react'
import type { WhiteBannerV2Block as WhiteBannerV2BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const defaultProps = {
  title: 'Experience the Difference',
  subtitle: 'Our platform brings you the best features and tools',
  imageUrl: '',
  btnText: 'Get Started',
  btnUrl: '#',
  backgroundColor: '#f8fafc',
  textColor: '#1e293b',
  accentColor: '#6366f1',
}

export const whiteBannerV2Definition: BlockDefinition = {
  type: 'white-banner-v2',
  name: 'Banner V2',
  description: 'Split banner with image on one side and text on the other',
  icon: 'image',
  category: 'white',
  defaultProps: { ...defaultProps },
}

export const createWhiteBannerV2Block = (): WhiteBannerV2BlockType => ({
  id: uuidv4(),
  type: 'white-banner-v2',
  order: 0,
  props: { ...defaultProps },
})

export const WhiteBannerV2Block: FC<BlockRenderProps<WhiteBannerV2BlockType>> = ({ block, isSelected }) => {
  const { props } = block
  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:flex md:items-center md:gap-12">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: props.textColor }}
          >
            {props.title}
          </h1>
          <p
            className="text-lg mb-8 opacity-80"
            style={{ color: props.textColor }}
          >
            {props.subtitle}
          </p>
          <a
            href={props.btnUrl}
            className="inline-block px-8 py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: props.accentColor }}
          >
            {props.btnText}
          </a>
        </div>
        <div className="md:w-1/2">
          {props.imageUrl ? (
            <img
              src={props.imageUrl}
              alt={props.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
              <span className="text-sm">No image set</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const WhiteBannerV2Editor: FC<BlockEditorProps<WhiteBannerV2BlockType>> = ({ block, onChange }) => {
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={props.imageUrl}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://example.com/image.jpg"
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
