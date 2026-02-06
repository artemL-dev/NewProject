'use client'

import { FC } from 'react'
import type { TopBarBlock as TopBarBlockType, TopBarBadge, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

// ============================================
// DEFINITION
// ============================================

const defaultBadges: TopBarBadge[] = [
  { iconUrl: '', text: 'India Players' },
  { iconUrl: '', text: 'Safe & Secure' },
  { iconUrl: '', text: 'Fast Payout' },
]

export const topBarDefinition: BlockDefinition = {
  type: 'top-bar',
  name: 'Top Bar',
  description: 'Header bar with headline and trust badges',
  icon: 'layout',
  category: 'prelanding',
  defaultProps: {
    headline: 'Top Rated Best Online Casinos',
    badges: defaultBadges,
    backgroundGradient: 'linear-gradient(90deg, #def1ff 0%, #bde2fc 100%)',
    headlineColor: '#00518a',
    badgeColor: '#00518a',
    backgroundColor: '#def1ff',
    textColor: '#00518a',
    accentColor: '#00518a',
  },
}

// ============================================
// FACTORY
// ============================================

export const createTopBarBlock = (): TopBarBlockType => ({
  id: uuidv4(),
  type: 'top-bar',
  order: 0,
  props: {
    headline: 'Top Rated Best Online Casinos',
    badges: defaultBadges,
    backgroundGradient: 'linear-gradient(90deg, #def1ff 0%, #bde2fc 100%)',
    headlineColor: '#00518a',
    badgeColor: '#00518a',
    backgroundColor: '#def1ff',
    textColor: '#00518a',
    accentColor: '#00518a',
  },
})

// ============================================
// DEFAULT BADGE ICON
// ============================================

const BadgeIcon: FC<{ color: string }> = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

// ============================================
// RENDER COMPONENT
// ============================================

export const TopBarBlock: FC<BlockRenderProps<TopBarBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        background: props.backgroundGradient || props.backgroundColor,
        padding: '20px 16px',
      }}
    >
      {/* Headline */}
      <h1
        style={{
          fontSize: '20px',
          fontWeight: 800,
          color: props.headlineColor,
          textAlign: 'center',
          marginBottom: '14px',
          lineHeight: 1.3,
        }}
      >
        {props.headline}
      </h1>

      {/* Badges */}
      {props.badges.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {props.badges.map((badge, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                fontSize: '12px',
                fontWeight: 600,
                color: props.badgeColor,
              }}
            >
              {badge.iconUrl ? (
                <img src={badge.iconUrl} alt="" style={{ width: '16px', height: '16px' }} />
              ) : (
                <BadgeIcon color={props.badgeColor} />
              )}
              {badge.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// EDITOR COMPONENT
// ============================================

export const TopBarEditor: FC<BlockEditorProps<TopBarBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateBadge = (index: number, field: string, value: string) => {
    const newBadges = [...props.badges]
    newBadges[index] = { ...newBadges[index], [field]: value }
    onChange({ badges: newBadges })
  }

  const addBadge = () => {
    onChange({
      badges: [...props.badges, { iconUrl: '', text: 'New Badge' }],
    })
  }

  const removeBadge = (index: number) => {
    onChange({ badges: props.badges.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Content</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input
            type="text"
            value={props.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Gradient</label>
          <input
            type="text"
            value={props.backgroundGradient}
            onChange={(e) => onChange({ backgroundGradient: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="linear-gradient(90deg, #def1ff 0%, #bde2fc 100%)"
          />
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Badges ({props.badges.length})</h3>

        {props.badges.map((badge, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-xs">#{index + 1}</span>
              <button
                onClick={() => removeBadge(index)}
                className="text-red-500 text-xs hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
              <input
                type="text"
                value={badge.text}
                onChange={(e) => updateBadge(index, 'text', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Icon URL (optional)</label>
              <input
                type="text"
                value={badge.iconUrl}
                onChange={(e) => updateBadge(index, 'iconUrl', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="https://..."
              />
            </div>
          </div>
        ))}

        <button
          onClick={addBadge}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Badge
        </button>
      </div>

      {/* Colors */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline Color</label>
            <input
              type="color"
              value={props.headlineColor}
              onChange={(e) => onChange({ headlineColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Color</label>
            <input
              type="color"
              value={props.badgeColor}
              onChange={(e) => onChange({ badgeColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent</label>
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
