'use client'

import { FC } from 'react'
import type { WhiteTextblockV1Block as WhiteTextblockV1BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteTextblockV1Definition: BlockDefinition = {
  type: 'white-textblock-v1',
  name: 'White Textblock V1',
  description: 'Two-column layout with image on left and items list on right',
  icon: 'text',
  category: 'white',
  defaultProps: {
    title: 'Why Choose Us',
    subtitle: 'Our key advantages',
    imageUrl: '',
    items: [
      { title: 'Professional', subtitle: 'Years of expertise' },
      { title: 'Reliable', subtitle: 'Trusted by thousands' },
    ],
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
  },
}

export const createWhiteTextblockV1Block = (): WhiteTextblockV1BlockType => ({
  id: uuidv4(),
  type: 'white-textblock-v1',
  order: 0,
  props: {
    title: 'Why Choose Us',
    subtitle: 'Our key advantages',
    imageUrl: '',
    items: [
      { title: 'Professional', subtitle: 'Years of expertise' },
      { title: 'Reliable', subtitle: 'Trusted by thousands' },
    ],
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
  },
})

export const WhiteTextblockV1Block: FC<BlockRenderProps<WhiteTextblockV1BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, imageUrl, items, backgroundColor, textColor, accentColor } = block.props

  return (
    <section
      style={{ backgroundColor, color: textColor }}
      className={`w-full py-16 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                alt={title}
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          )}
          <div className={!imageUrl ? 'md:col-span-2' : ''}>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg mt-2 opacity-70">{subtitle}</p>
            <div className="mt-8 space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-70">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const WhiteTextblockV1Editor: FC<BlockEditorProps<WhiteTextblockV1BlockType>> = ({ block, onChange }) => {
  const props = block.props

  const updateItem = (index: number, field: 'title' | 'subtitle', value: string) => {
    const newItems = [...props.items]
    newItems[index] = { ...newItems[index], [field]: value }
    onChange({ items: newItems })
  }

  const addItem = () => {
    onChange({ items: [...props.items, { title: 'New Item', subtitle: 'Item description' }] })
  }

  const removeItem = (index: number) => {
    const newItems = props.items.filter((_, i) => i !== index)
    onChange({ items: newItems })
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
          {props.items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-3 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500">Item {index + 1}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(index, 'title', e.target.value)}
                placeholder="Item title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
              />
              <input
                type="text"
                value={item.subtitle}
                onChange={(e) => updateItem(index, 'subtitle', e.target.value)}
                placeholder="Item subtitle"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          ))}
          <button
            onClick={addItem}
            className="text-sm text-blue-600 hover:text-blue-800 mt-1"
          >
            + Add Item
          </button>
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
