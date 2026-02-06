'use client'

import { FC } from 'react'
import type { AgeGateBlock as AgeGateBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

// ============================================
// DEFINITION
// ============================================

export const ageGateDefinition: BlockDefinition = {
  type: 'age-gate',
  name: 'Age Gate (18+)',
  description: 'Age verification overlay with confirm/decline buttons',
  icon: 'shield',
  category: 'prelanding',
  defaultProps: {
    title: '18+',
    message: 'This website contains age-restricted content. By entering, you confirm that you are at least 18 years old.',
    confirmText: 'I am 18 or older - Enter',
    declineText: 'I am under 18 - Exit',
    confirmUrl: '#',
    declineUrl: 'https://google.com',
    overlayColor: '#000000',
    overlayOpacity: 85,
    modalBackgroundColor: '#1a1a2e',
    confirmButtonColor: '#22c55e',
    declineButtonColor: '#6b7280',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
}

// ============================================
// FACTORY
// ============================================

export const createAgeGateBlock = (): AgeGateBlockType => ({
  id: uuidv4(),
  type: 'age-gate',
  order: 0,
  props: {
    title: '18+',
    message: 'This website contains age-restricted content. By entering, you confirm that you are at least 18 years old.',
    confirmText: 'I am 18 or older - Enter',
    declineText: 'I am under 18 - Exit',
    confirmUrl: '#',
    declineUrl: 'https://google.com',
    overlayColor: '#000000',
    overlayOpacity: 85,
    modalBackgroundColor: '#1a1a2e',
    confirmButtonColor: '#22c55e',
    declineButtonColor: '#6b7280',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
})

// ============================================
// RENDER COMPONENT
// ============================================

export const AgeGateBlock: FC<BlockRenderProps<AgeGateBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.overlayColor,
        position: 'relative',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: props.overlayColor,
          opacity: props.overlayOpacity / 100,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: props.modalBackgroundColor,
          color: props.textColor,
          borderRadius: '20px',
          padding: '48px 32px',
          maxWidth: '420px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* 18+ Badge */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: `3px solid ${props.accentColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '32px',
            fontWeight: 900,
            color: props.accentColor,
          }}
        >
          {props.title}
        </div>

        {/* Message */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            opacity: 0.85,
            marginBottom: '32px',
          }}
        >
          {props.message}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href={props.confirmUrl}
            style={{
              display: 'block',
              padding: '14px 24px',
              borderRadius: '12px',
              backgroundColor: props.confirmButtonColor,
              color: '#fff',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            {props.confirmText}
          </a>

          <a
            href={props.declineUrl}
            style={{
              display: 'block',
              padding: '14px 24px',
              borderRadius: '12px',
              backgroundColor: props.declineButtonColor,
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              opacity: 0.8,
              transition: 'opacity 0.2s',
            }}
          >
            {props.declineText}
          </a>
        </div>
      </div>
    </div>
  )
}

// ============================================
// EDITOR COMPONENT
// ============================================

export const AgeGateEditor: FC<BlockEditorProps<AgeGateBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  return (
    <div className="space-y-6">
      {/* Content */}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            value={props.message}
            onChange={(e) => onChange({ message: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Buttons</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Text</label>
          <input
            type="text"
            value={props.confirmText}
            onChange={(e) => onChange({ confirmText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm URL</label>
          <input
            type="text"
            value={props.confirmUrl}
            onChange={(e) => onChange({ confirmUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Decline Text</label>
          <input
            type="text"
            value={props.declineText}
            onChange={(e) => onChange({ declineText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Decline URL</label>
          <input
            type="text"
            value={props.declineUrl}
            onChange={(e) => onChange({ declineUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Colors</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overlay Color</label>
            <input
              type="color"
              value={props.overlayColor}
              onChange={(e) => onChange({ overlayColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overlay Opacity (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={props.overlayOpacity}
              onChange={(e) => onChange({ overlayOpacity: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modal Background</label>
            <input
              type="color"
              value={props.modalBackgroundColor}
              onChange={(e) => onChange({ modalBackgroundColor: e.target.value })}
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Button</label>
            <input
              type="color"
              value={props.confirmButtonColor}
              onChange={(e) => onChange({ confirmButtonColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Decline Button</label>
            <input
              type="color"
              value={props.declineButtonColor}
              onChange={(e) => onChange({ declineButtonColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
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
  )
}
