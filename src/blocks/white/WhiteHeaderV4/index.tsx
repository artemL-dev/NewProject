'use client'

import { FC, useState } from 'react'
import type { WhiteHeaderV4Block as WhiteHeaderV4BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeaderV4Definition: BlockDefinition<WhiteHeaderV4BlockType> = {
  type: 'white-header-v4',
  name: 'Header V4 - Phone',
  category: 'white',
  description: 'Header with phone number instead of CTA button. Logo left, nav center, phone right.',
  factory: (): WhiteHeaderV4BlockType => ({
    id: uuidv4(),
    type: 'white-header-v4',
    props: {
      logoText: 'Business',
      logoImageUrl: '',
      navItems: [
        { label: 'Services', url: '#' },
        { label: 'Portfolio', url: '#' },
        { label: 'Team', url: '#' },
      ],
      phone: '+1 (555) 123-4567',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      accentColor: '#059669',
    },
  }),
}

export const WhiteHeaderV4Render: FC<BlockRenderProps<WhiteHeaderV4BlockType>> = ({ block }) => {
  const { logoText, logoImageUrl, navItems, phone, backgroundColor, textColor, accentColor } = block.props
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header style={{ backgroundColor, color: textColor }} className="w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoImageUrl ? (
              <img src={logoImageUrl} alt={logoText} className="h-8 w-auto" />
            ) : (
              <span className="text-xl font-bold" style={{ color: accentColor }}>{logoText}</span>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.url}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: textColor }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Phone */}
          <div className="hidden md:flex items-center space-x-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a
              href={`tel:${phone.replace(/[^+\d]/g, '')}`}
              className="text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: accentColor }}
            >
              {phone}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={textColor} strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t" style={{ borderColor: `${textColor}20` }}>
            <nav className="flex flex-col space-y-2 pt-4">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  className="px-3 py-2 text-sm font-medium rounded-md hover:opacity-80"
                  style={{ color: textColor }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                className="mx-3 mt-2 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md"
                style={{ color: accentColor, border: `1px solid ${accentColor}` }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{phone}</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export const WhiteHeaderV4Editor: FC<BlockEditorProps<WhiteHeaderV4BlockType>> = ({ block, onChange }) => {
  const props = block.props

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Content</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo Text</label>
          <input type="text" value={props.logoText} onChange={(e) => onChange({ logoText: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image URL</label>
          <input type="text" value={props.logoImageUrl} onChange={(e) => onChange({ logoImageUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="Leave empty to use text logo" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input type="text" value={props.phone} onChange={(e) => onChange({ phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
        </div>
        <div>
          <p className="text-xs text-gray-500 italic">Navigation items can be edited in the JSON</p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
            <input type="color" value={props.backgroundColor} onChange={(e) => onChange({ backgroundColor: e.target.value })} className="w-full h-10 rounded-md cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
            <input type="color" value={props.textColor} onChange={(e) => onChange({ textColor: e.target.value })} className="w-full h-10 rounded-md cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent</label>
            <input type="color" value={props.accentColor} onChange={(e) => onChange({ accentColor: e.target.value })} className="w-full h-10 rounded-md cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}
