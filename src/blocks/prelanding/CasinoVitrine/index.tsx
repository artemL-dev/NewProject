'use client'

import { FC } from 'react'
import type { CasinoVitrineBlock as CasinoVitrineBlockType, CasinoVitrineItem, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

// ============================================
// DEFINITION
// ============================================

const defaultItems: CasinoVitrineItem[] = [
  {
    logoUrl: '',
    name: 'Casino Royale',
    badge: 'BEST ONLINE CASINO',
    reputationText: 'Excellent Reputation',
    rating: 5,
    bonusLine1: 'up to $105,000',
    bonusLine2: 'Min Dep $100',
    ctaText: 'PLAY NOW',
    ctaUrl: '#',
    paymentIcons: [],
  },
  {
    logoUrl: '',
    name: 'Lucky Spin',
    badge: 'TOP RATED',
    reputationText: 'Very Good Reputation',
    rating: 4,
    bonusLine1: 'up to $50,000',
    bonusLine2: 'Min Dep $50',
    ctaText: 'PLAY NOW',
    ctaUrl: '#',
    paymentIcons: [],
  },
  {
    logoUrl: '',
    name: 'Golden Palace',
    badge: '',
    reputationText: 'Good Reputation',
    rating: 4,
    bonusLine1: 'up to $25,000',
    bonusLine2: 'Min Dep $25',
    ctaText: 'PLAY NOW',
    ctaUrl: '#',
    paymentIcons: [],
  },
]

export const casinoVitrineDefinition: BlockDefinition = {
  type: 'casino-vitrine',
  name: 'Casino Vitrine',
  description: 'Casino list with logos, ratings, bonuses and CTA buttons',
  icon: 'trophy',
  category: 'prelanding',
  defaultProps: {
    title: 'Top Rated Best Online Casinos',
    updatedDate: 'January 2026',
    items: defaultItems,
    cardBorderColor: '#e5e7eb',
    cardBackgroundColor: '#ffffff',
    ctaColor: '#22c55e',
    ctaTextColor: '#ffffff',
    badgeColor: '#ef4444',
    backgroundColor: '#f8fafc',
    textColor: '#1a1a1a',
    accentColor: '#f59e0b',
  },
}

// ============================================
// FACTORY
// ============================================

export const createCasinoVitrineBlock = (): CasinoVitrineBlockType => ({
  id: uuidv4(),
  type: 'casino-vitrine',
  order: 0,
  props: {
    title: 'Top Rated Best Online Casinos',
    updatedDate: 'January 2026',
    items: defaultItems,
    cardBorderColor: '#e5e7eb',
    cardBackgroundColor: '#ffffff',
    ctaColor: '#22c55e',
    ctaTextColor: '#ffffff',
    badgeColor: '#ef4444',
    backgroundColor: '#f8fafc',
    textColor: '#1a1a1a',
    accentColor: '#f59e0b',
  },
})

// ============================================
// STAR RATING COMPONENT
// ============================================

const StarRating: FC<{ rating: number; color: string }> = ({ rating, color }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? color : '#d1d5db'}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

// ============================================
// RENDER COMPONENT
// ============================================

export const CasinoVitrineBlock: FC<BlockRenderProps<CasinoVitrineBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        padding: '24px 16px',
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700 }}>{props.title}</h2>
        {props.updatedDate && (
          <p style={{ fontSize: '13px', opacity: 0.6, marginTop: '4px' }}>
            Updated: {props.updatedDate}
          </p>
        )}
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        {props.items.map((item, index) => (
          <div
            key={index}
            style={{
              background: props.cardBackgroundColor,
              border: `1px solid ${props.cardBorderColor}`,
              borderRadius: '12px',
              padding: '16px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Badge */}
            {item.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: props.badgeColor,
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderBottomLeftRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {item.badge}
              </div>
            )}

            {/* Top: Logo + Name + Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '20px',
                  }}
                >
                  {item.name.charAt(0)}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{item.name}</div>
                <StarRating rating={item.rating} color={props.accentColor} />
                {item.reputationText && (
                  <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '2px' }}>
                    {item.reputationText}
                  </div>
                )}
              </div>
            </div>

            {/* Bonus */}
            <div
              style={{
                textAlign: 'center',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: `${props.accentColor}10`,
                marginBottom: '12px',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: 800, color: props.accentColor }}>
                {item.bonusLine1}
              </div>
              {item.bonusLine2 && (
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
                  {item.bonusLine2}
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href={item.ctaUrl}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: props.ctaColor,
                color: props.ctaTextColor,
                fontWeight: 700,
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              {item.ctaText}
            </a>

            {/* Payment Icons */}
            {item.paymentIcons.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                {item.paymentIcons.map((icon, i) => (
                  <img key={i} src={icon} alt="" style={{ height: '20px' }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// EDITOR COMPONENT
// ============================================

export const CasinoVitrineEditor: FC<BlockEditorProps<CasinoVitrineBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...props.items]
    newItems[index] = { ...newItems[index], [field]: value }
    onChange({ items: newItems })
  }

  const addItem = () => {
    onChange({
      items: [
        ...props.items,
        {
          logoUrl: '',
          name: 'New Casino',
          badge: '',
          reputationText: 'Good Reputation',
          rating: 4,
          bonusLine1: 'up to $10,000',
          bonusLine2: 'Min Dep $50',
          ctaText: 'PLAY NOW',
          ctaUrl: '#',
          paymentIcons: [],
        },
      ],
    })
  }

  const removeItem = (index: number) => {
    onChange({ items: props.items.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Header</h3>

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Updated Date</label>
          <input
            type="text"
            value={props.updatedDate}
            onChange={(e) => onChange({ updatedDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Casino Items */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">
          Casino Items ({props.items.length})
        </h3>

        {props.items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">#{index + 1} - {item.name}</span>
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Badge</label>
                <input
                  type="text"
                  value={item.badge}
                  onChange={(e) => updateItem(index, 'badge', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Logo URL</label>
              <input
                type="text"
                value={item.logoUrl}
                onChange={(e) => updateItem(index, 'logoUrl', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={item.rating}
                  onChange={(e) => updateItem(index, 'rating', parseInt(e.target.value) || 1)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Reputation</label>
                <input
                  type="text"
                  value={item.reputationText}
                  onChange={(e) => updateItem(index, 'reputationText', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bonus Line 1</label>
                <input
                  type="text"
                  value={item.bonusLine1}
                  onChange={(e) => updateItem(index, 'bonusLine1', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bonus Line 2</label>
                <input
                  type="text"
                  value={item.bonusLine2}
                  onChange={(e) => updateItem(index, 'bonusLine2', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">CTA Text</label>
                <input
                  type="text"
                  value={item.ctaText}
                  onChange={(e) => updateItem(index, 'ctaText', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">CTA URL</label>
                <input
                  type="text"
                  value={item.ctaUrl}
                  onChange={(e) => updateItem(index, 'ctaUrl', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Casino
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <input
              type="color"
              value={props.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Color</label>
            <input
              type="color"
              value={props.ctaColor}
              onChange={(e) => onChange({ ctaColor: e.target.value })}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Border</label>
            <input
              type="color"
              value={props.cardBorderColor}
              onChange={(e) => onChange({ cardBorderColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
