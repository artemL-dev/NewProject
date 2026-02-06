'use client'

import { FC } from 'react'
import type { WhiteHeroV2Block as WhiteHeroV2BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeroV2Definition: BlockDefinition = {
  type: 'white-hero-v2',
  name: 'White Hero V2',
  description: 'Two-column hero with slug, avatars row and large image',
  icon: '👥',
  category: 'white',
  defaultProps: {
    title: 'Join Our Community',
    subtitle: 'Be part of something extraordinary',
    slug: 'Trusted by thousands worldwide',
    imageUrl: '',
    avatars: [],
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    accentColor: '#6366f1',
  },
}

export const createWhiteHeroV2Block = (): WhiteHeroV2BlockType => ({
  id: uuidv4(),
  type: 'white-hero-v2',
  order: 0,
  props: {
    title: 'Join Our Community',
    subtitle: 'Be part of something extraordinary',
    slug: 'Trusted by thousands worldwide',
    imageUrl: '',
    avatars: [],
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    accentColor: '#6366f1',
  },
})

export const WhiteHeroV2Block: FC<BlockRenderProps<WhiteHeroV2BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, slug, imageUrl, avatars, backgroundColor, textColor, accentColor } = block.props

  return (
    <section
      style={{ backgroundColor, color: textColor }}
      className={`w-full py-20 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:grid grid-cols-2 gap-12 items-center">
        <div>
          {slug && (
            <p
              className="text-sm uppercase tracking-wider font-semibold mb-4"
              style={{ color: accentColor }}
            >
              {slug}
            </p>
          )}
          <h1 className="text-4xl font-bold leading-tight">{title}</h1>
          <p className="text-lg mt-4 opacity-70">{subtitle}</p>
          {avatars && avatars.length > 0 && (
            <div className="flex -space-x-2 mt-6">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  title={avatar.name}
                  className="w-10 h-10 rounded-full border-2 object-cover"
                  style={{ borderColor: backgroundColor }}
                />
              ))}
            </div>
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

export const WhiteHeroV2Editor: FC<BlockEditorProps<WhiteHeroV2BlockType>> = ({ block, onChange }) => {
  const props = block.props

  const handleAvatarChange = (index: number, field: 'imageUrl' | 'name', value: string) => {
    const newAvatars = [...(props.avatars || [])]
    newAvatars[index] = { ...newAvatars[index], [field]: value }
    onChange({ avatars: newAvatars })
  }

  const addAvatar = () => {
    const newAvatars = [...(props.avatars || []), { imageUrl: '', name: '' }]
    onChange({ avatars: newAvatars })
  }

  const removeAvatar = (index: number) => {
    const newAvatars = [...(props.avatars || [])]
    newAvatars.splice(index, 1)
    onChange({ avatars: newAvatars })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Content</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            value={props.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
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
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Avatars</h3>
        {(props.avatars || []).map((avatar, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={avatar.name}
                onChange={(e) => handleAvatarChange(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={avatar.imageUrl}
                onChange={(e) => handleAvatarChange(index, 'imageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <button
              onClick={() => removeAvatar(index)}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addAvatar}
          className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
        >
          + Add Avatar
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
