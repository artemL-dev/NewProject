'use client'

import { FC } from 'react'
import type { ModalPopupBlock as ModalPopupBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const modalPopupDefinition: BlockDefinition = {
  type: 'modal-popup',
  name: 'Modal Popup',
  description: 'Popup modal with timer/scroll/exit-intent trigger',
  icon: 'message-square',
  category: 'prelanding',
  defaultProps: {
    triggerType: 'timer',
    triggerDelay: 5,
    triggerScrollPercent: 50,
    title: 'Special Offer!',
    message: 'Don\'t miss out on this exclusive deal. Sign up now and get a bonus!',
    imageUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 60,
    modalBackgroundColor: '#ffffff',
    ctaText: 'Claim Now',
    ctaUrl: '#',
    showCloseButton: true,
    animationType: 'fade',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    accentColor: '#f59e0b',
    ctaColor: '#22c55e',
  },
}

export const createModalPopupBlock = (): ModalPopupBlockType => ({
  id: uuidv4(),
  type: 'modal-popup',
  order: 0,
  props: {
    triggerType: 'timer',
    triggerDelay: 5,
    triggerScrollPercent: 50,
    title: 'Special Offer!',
    message: 'Don\'t miss out on this exclusive deal. Sign up now and get a bonus!',
    imageUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 60,
    modalBackgroundColor: '#ffffff',
    ctaText: 'Claim Now',
    ctaUrl: '#',
    showCloseButton: true,
    animationType: 'fade',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    accentColor: '#f59e0b',
    ctaColor: '#22c55e',
  },
})

const triggerLabel = (type: string, delay: number, scrollPercent: number): string => {
  switch (type) {
    case 'timer':
      return `Timer (${delay}s)`
    case 'scroll':
      return `Scroll (${scrollPercent}%)`
    case 'exit-intent':
      return 'Exit Intent'
    case 'click':
      return 'On Click'
    default:
      return type
  }
}

const animationLabel = (type: string): string => {
  switch (type) {
    case 'fade':
      return 'Fade'
    case 'slide-up':
      return 'Slide Up'
    case 'scale':
      return 'Scale'
    default:
      return type
  }
}

export const ModalPopupBlock: FC<BlockRenderProps<ModalPopupBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  return (
    <div
      className={`relative overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      {/* Trigger Badge */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <span
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: props.accentColor + '20',
            color: props.accentColor,
            border: `1px solid ${props.accentColor}40`,
          }}
        >
          Trigger: {triggerLabel(props.triggerType, props.triggerDelay, props.triggerScrollPercent)}
        </span>
        <span
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: props.accentColor + '20',
            color: props.accentColor,
            border: `1px solid ${props.accentColor}40`,
          }}
        >
          {animationLabel(props.animationType)}
        </span>
      </div>

      {/* Preview Label */}
      <div className="text-center pt-4 pb-2 px-4">
        <span className="text-xs font-medium uppercase tracking-wider opacity-50">
          Modal Popup Preview
        </span>
      </div>

      {/* Simulated Overlay Background */}
      <div className="mx-4 mb-4 rounded-xl overflow-hidden" style={{ position: 'relative' }}>
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backgroundColor: props.overlayColor,
            opacity: props.overlayOpacity / 100,
          }}
        />

        {/* Modal Card */}
        <div
          className={`relative mx-auto my-6 max-w-sm rounded-xl shadow-2xl overflow-hidden ${
            props.animationType === 'slide-up' ? 'translate-y-0' : ''
          } ${props.animationType === 'scale' ? 'scale-100' : ''}`}
          style={{
            backgroundColor: props.modalBackgroundColor,
          }}
        >
          {/* Close Button */}
          {props.showCloseButton && (
            <button
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold transition-colors z-10"
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                color: props.textColor,
              }}
            >
              X
            </button>
          )}

          {/* Image */}
          {props.imageUrl && (
            <div className="w-full h-40 overflow-hidden">
              <img
                src={props.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 text-center">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: props.textColor }}
            >
              {props.title}
            </h3>
            <p
              className="text-sm mb-5 leading-relaxed opacity-80"
              style={{ color: props.textColor }}
            >
              {props.message}
            </p>

            {/* CTA Button */}
            <a
              href={props.ctaUrl}
              className="inline-block px-8 py-3 rounded-full font-bold text-white text-sm shadow-lg transition-transform hover:scale-105"
              style={{
                backgroundColor: props.ctaColor,
                boxShadow: `0 4px 15px ${props.ctaColor}50`,
              }}
            >
              {props.ctaText}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// Alias for external usage to avoid type conflict with imported ModalPopupBlockType
export const ModalPopupBlockComponent = ModalPopupBlock

export const ModalPopupEditor: FC<BlockEditorProps<ModalPopupBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  return (
    <div className="space-y-6">
      {/* Trigger Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Trigger</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trigger Type
          </label>
          <select
            value={props.triggerType}
            onChange={(e) => onChange({ triggerType: e.target.value as ModalPopupBlockType['props']['triggerType'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="timer">Timer</option>
            <option value="scroll">Scroll Position</option>
            <option value="exit-intent">Exit Intent</option>
            <option value="click">On Click</option>
          </select>
        </div>

        {props.triggerType === 'timer' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delay (seconds)
            </label>
            <input
              type="number"
              value={props.triggerDelay}
              onChange={(e) => onChange({ triggerDelay: Math.max(0, Number(e.target.value)) })}
              min={0}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}

        {props.triggerType === 'scroll' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scroll Percent (%)
            </label>
            <input
              type="number"
              value={props.triggerScrollPercent}
              onChange={(e) => onChange({ triggerScrollPercent: Math.max(0, Math.min(100, Number(e.target.value))) })}
              min={0}
              max={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Content</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={props.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={props.message}
            onChange={(e) => onChange({ message: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            value={props.imageUrl}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Modal Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Modal</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overlay Color
            </label>
            <input
              type="color"
              value={props.overlayColor}
              onChange={(e) => onChange({ overlayColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modal Background
            </label>
            <input
              type="color"
              value={props.modalBackgroundColor}
              onChange={(e) => onChange({ modalBackgroundColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Overlay Opacity ({props.overlayOpacity}%)
          </label>
          <input
            type="range"
            value={props.overlayOpacity}
            onChange={(e) => onChange({ overlayOpacity: Number(e.target.value) })}
            min={0}
            max={100}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showCloseButton"
            checked={props.showCloseButton}
            onChange={(e) => onChange({ showCloseButton: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="showCloseButton" className="text-sm text-gray-700">
            Show Close Button
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Animation Type
          </label>
          <select
            value={props.animationType}
            onChange={(e) => onChange({ animationType: e.target.value as ModalPopupBlockType['props']['animationType'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="fade">Fade</option>
            <option value="slide-up">Slide Up</option>
            <option value="scale">Scale</option>
          </select>
        </div>
      </div>

      {/* CTA Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">CTA Button</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={props.ctaText}
              onChange={(e) => onChange({ ctaText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Button Color
            </label>
            <input
              type="color"
              value={props.ctaColor}
              onChange={(e) => onChange({ ctaColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA URL
          </label>
          <input
            type="text"
            value={props.ctaUrl}
            onChange={(e) => onChange({ ctaUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Colors</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background
            </label>
            <input
              type="color"
              value={props.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Color
            </label>
            <input
              type="color"
              value={props.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accent Color
            </label>
            <input
              type="color"
              value={props.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Color
            </label>
            <input
              type="color"
              value={props.ctaColor}
              onChange={(e) => onChange({ ctaColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
