'use client'

import { FC, useState } from 'react'
import type { WhiteBannerV3Block as WhiteBannerV3BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const defaultProps = {
  title: 'Welcome to Our World',
  subtitle: 'Explore endless possibilities with our platform',
  backgroundImageUrl: '',
  btnText: 'Explore Now',
  btnUrl: '#',
  backgroundColor: '#0f172a',
  textColor: '#ffffff',
  accentColor: '#f59e0b',
}

export const whiteBannerV3Definition: BlockDefinition = {
  type: 'white-banner-v3',
  name: 'Banner V3',
  description: 'Full-screen banner with background image overlay',
  icon: 'image',
  category: 'white',
  defaultProps: { ...defaultProps },
}

export const createWhiteBannerV3Block = (): WhiteBannerV3BlockType => ({
  id: uuidv4(),
  type: 'white-banner-v3',
  order: 0,
  props: { ...defaultProps },
})

export const WhiteBannerV3Block: FC<BlockRenderProps<WhiteBannerV3BlockType>> = ({ block, isSelected }) => {
  const { props } = block
  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
    >
      <div className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
        {props.backgroundImageUrl && (
          <img
            src={props.backgroundImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: props.textColor }}
          >
            {props.title}
          </h1>
          <p
            className="text-lg mb-8 opacity-90"
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
      </div>
    </div>
  )
}

export const WhiteBannerV3Editor: FC<BlockEditorProps<WhiteBannerV3BlockType>> = ({ block, onChange }) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
          <input
            type="text"
            value={props.backgroundImageUrl}
            onChange={(e) => onChange({ backgroundImageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://example.com/background.jpg"
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
