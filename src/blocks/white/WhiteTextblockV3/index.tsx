'use client'

import { FC } from 'react'
import type { WhiteTextblockV3Block as WhiteTextblockV3BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteTextblockV3Definition: BlockDefinition = {
  type: 'white-textblock-v3',
  name: 'White Textblock V3',
  description: 'Contact section with address, phone and email cards',
  icon: 'text',
  category: 'white',
  defaultProps: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    address: '123 Main Street, City, Country',
    phone: '+1 (555) 000-0000',
    email: 'info@example.com',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#059669',
  },
}

export const createWhiteTextblockV3Block = (): WhiteTextblockV3BlockType => ({
  id: uuidv4(),
  type: 'white-textblock-v3',
  order: 0,
  props: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    address: '123 Main Street, City, Country',
    phone: '+1 (555) 000-0000',
    email: 'info@example.com',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#059669',
  },
})

export const WhiteTextblockV3Block: FC<BlockRenderProps<WhiteTextblockV3BlockType>> = ({ block, isSelected }) => {
  const { title, subtitle, address, phone, email, backgroundColor, textColor, accentColor } = block.props

  return (
    <section
      style={{ backgroundColor, color: textColor }}
      className={`w-full py-16 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-lg mt-2 opacity-70">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="text-center p-8 rounded-xl"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <div className="text-4xl mb-4" role="img" aria-label="Address">
              <span style={{ color: accentColor }}>&#x1F4CD;</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Address</h3>
            <p className="opacity-70">{address}</p>
          </div>
          <div
            className="text-center p-8 rounded-xl"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <div className="text-4xl mb-4" role="img" aria-label="Phone">
              <span style={{ color: accentColor }}>&#x1F4DE;</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Phone</h3>
            <p className="opacity-70">{phone}</p>
          </div>
          <div
            className="text-center p-8 rounded-xl"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <div className="text-4xl mb-4" role="img" aria-label="Email">
              <span style={{ color: accentColor }}>&#x2709;</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="opacity-70">{email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export const WhiteTextblockV3Editor: FC<BlockEditorProps<WhiteTextblockV3BlockType>> = ({ block, onChange }) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={props.address}
            onChange={(e) => onChange({ address: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            value={props.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            value={props.email}
            onChange={(e) => onChange({ email: e.target.value })}
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
