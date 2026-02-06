'use client'

import { FC, useState } from 'react'
import type { WhiteHeaderV5Block as WhiteHeaderV5BlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const whiteHeaderV5Definition: BlockDefinition<WhiteHeaderV5BlockType> = {
  type: 'white-header-v5',
  name: 'Header V5 - Minimal',
  category: 'white',
  description: 'Minimal clean header with logo left, nav and button right. Thin bottom border.',
  factory: (): WhiteHeaderV5BlockType => ({
    id: uuidv4(),
    type: 'white-header-v5',
    props: {
      logoText: 'Studio',
      logoImageUrl: '',
      navItems: [
        { label: 'Work', url: '#' },
        { label: 'About', url: '#' },
        { label: 'Contact', url: '#' },
      ],
      btnText: 'Hire Us',
      btnUrl: '#',
      backgroundColor: '#fafafa',
      textColor: '#18181b',
      accentColor: '#f97316',
    },
  }),
}

export const WhiteHeaderV5Render: FC<BlockRenderProps<WhiteHeaderV5BlockType>> = ({ block }) => {
  const { logoText, logoImageUrl, navItems, btnText, btnUrl, backgroundColor, textColor, accentColor } = block.props
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header style={{ backgroundColor, color: textColor, borderBottom: `1px solid ${textColor}15` }} className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoImageUrl ? (
              <img src={logoImageUrl} alt={logoText} className="h-7 w-auto" />
            ) : (
              <span className="text-lg font-bold tracking-tight" style={{ color: textColor }}>{logoText}</span>
            )}
          </div>

          {/* Desktop Nav + Button (right-aligned together) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.url}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: textColor }}
              >
                {item.label}
              </a>
            ))}
            <a
              href={btnUrl}
              className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              {btnText}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={textColor} strokeWidth={2}>
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
          <div className="md:hidden pb-4 border-t" style={{ borderColor: `${textColor}15` }}>
            <nav className="flex flex-col space-y-2 pt-4">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  className="px-3 py-2 text-sm font-medium rounded-md hover:opacity-70"
                  style={{ color: textColor }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={btnUrl}
                className="mx-3 mt-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full text-white"
                style={{ backgroundColor: accentColor }}
              >
                {btnText}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export const WhiteHeaderV5Editor: FC<BlockEditorProps<WhiteHeaderV5BlockType>> = ({ block, onChange }) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input type="text" value={props.btnText} onChange={(e) => onChange({ btnText: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
          <input type="text" value={props.btnUrl} onChange={(e) => onChange({ btnUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
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
