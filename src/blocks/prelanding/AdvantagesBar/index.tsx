'use client'

import { FC } from 'react'
import type { AdvantagesBarBlock as AdvantagesBarBlockType, AdvantagesBarItem, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

// ============================================
// DEFINITION
// ============================================

const defaultItems: AdvantagesBarItem[] = [
  { iconUrl: '', text: 'Verified Experts' },
  { iconUrl: '', text: 'Honest Reviews' },
  { iconUrl: '', text: 'Fast Payouts' },
  { iconUrl: '', text: 'Safe & Secure' },
]

export const advantagesBarDefinition: BlockDefinition = {
  type: 'advantages-bar',
  name: 'Advantages Bar',
  description: 'Horizontal bar with icons and advantage text items',
  icon: 'check-circle',
  category: 'prelanding',
  defaultProps: {
    items: defaultItems,
    marqueeOnMobile: false,
    backgroundColor: '#196499',
    textColor: '#ffffff',
    iconSize: 32,
    gap: 40,
  },
}

// ============================================
// FACTORY
// ============================================

export const createAdvantagesBarBlock = (): AdvantagesBarBlockType => ({
  id: uuidv4(),
  type: 'advantages-bar',
  order: 0,
  props: {
    items: defaultItems,
    marqueeOnMobile: false,
    backgroundColor: '#196499',
    textColor: '#ffffff',
    iconSize: 32,
    gap: 40,
  },
})

// ============================================
// DEFAULT ICON COMPONENT
// ============================================

const DefaultIcon: FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

// ============================================
// RENDER COMPONENT
// ============================================

export const AdvantagesBarBlock: FC<BlockRenderProps<AdvantagesBarBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  const itemsContent = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${props.gap}px`,
        flexWrap: 'wrap',
        padding: '14px 16px',
      }}
    >
      {props.items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap',
          }}
        >
          {item.iconUrl ? (
            <img
              src={item.iconUrl}
              alt=""
              style={{ width: props.iconSize, height: props.iconSize }}
            />
          ) : (
            <DefaultIcon size={props.iconSize} color={props.textColor} />
          )}
          <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.text}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        overflow: 'hidden',
      }}
    >
      {props.marqueeOnMobile ? (
        <>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .advantages-marquee {
              display: flex;
              animation: marquee 20s linear infinite;
              width: max-content;
            }
            @media (min-width: 768px) {
              .advantages-marquee {
                animation: none;
                justify-content: center;
                width: 100%;
              }
            }
          `}</style>
          <div className="advantages-marquee" style={{ padding: '14px 0' }}>
            {/* Duplicate items for seamless scrolling */}
            {[...props.items, ...props.items].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  whiteSpace: 'nowrap',
                  marginRight: `${props.gap}px`,
                }}
              >
                {item.iconUrl ? (
                  <img
                    src={item.iconUrl}
                    alt=""
                    style={{ width: props.iconSize, height: props.iconSize }}
                  />
                ) : (
                  <DefaultIcon size={props.iconSize} color={props.textColor} />
                )}
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        itemsContent
      )}
    </div>
  )
}

// ============================================
// EDITOR COMPONENT
// ============================================

export const AdvantagesBarEditor: FC<BlockEditorProps<AdvantagesBarBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...props.items]
    newItems[index] = { ...newItems[index], [field]: value }
    onChange({ items: newItems })
  }

  const addItem = () => {
    onChange({
      items: [...props.items, { iconUrl: '', text: 'New Advantage' }],
    })
  }

  const removeItem = (index: number) => {
    onChange({ items: props.items.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Items ({props.items.length})</h3>

        {props.items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-xs">#{index + 1}</span>
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 text-xs hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
              <input
                type="text"
                value={item.text}
                onChange={(e) => updateItem(index, 'text', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Icon URL (optional)</label>
              <input
                type="text"
                value={item.iconUrl}
                onChange={(e) => updateItem(index, 'iconUrl', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="https://..."
              />
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Item
        </button>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Options</h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="marqueeOnMobile"
            checked={props.marqueeOnMobile}
            onChange={(e) => onChange({ marqueeOnMobile: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="marqueeOnMobile" className="text-sm text-gray-700">Marquee scroll on mobile</label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Size (px)</label>
            <input
              type="number"
              value={props.iconSize}
              onChange={(e) => onChange({ iconSize: parseInt(e.target.value) || 32 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gap (px)</label>
            <input
              type="number"
              value={props.gap}
              onChange={(e) => onChange({ gap: parseInt(e.target.value) || 40 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
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
        </div>
      </div>
    </div>
  )
}
