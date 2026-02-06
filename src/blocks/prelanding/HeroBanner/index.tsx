'use client'

import { FC } from 'react'
import type { HeroBannerBlock as HeroBannerBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

// ============================================
// DEFINITION
// ============================================

export const heroBannerDefinition: BlockDefinition = {
  type: 'hero-banner',
  name: 'Hero Banner',
  description: 'Full-screen hero with background, logo, bonus headline and CTA',
  icon: 'image',
  category: 'prelanding',
  defaultProps: {
    backgroundImageUrl: '',
    backgroundOverlayColor: '#000000',
    backgroundOverlayOpacity: 40,
    logoUrl: '',
    logoWidth: 180,
    headline: 'Claim your bonus 150% up to $30,000',
    subtitle: 'Play Online on Real Money',
    ctaText: 'PLAY NOW',
    ctaUrl: '#',
    ctaColor: '#22c55e',
    ctaGradient: '',
    showFloatingCoins: false,
    floatingElements: [],
    deviceImageUrl: '',
    clickAnywhere: true,
    minHeight: '80vh',
    textAlign: 'center',
    backgroundColor: '#1a0a2e',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
}

// ============================================
// FACTORY
// ============================================

export const createHeroBannerBlock = (): HeroBannerBlockType => ({
  id: uuidv4(),
  type: 'hero-banner',
  order: 0,
  props: {
    backgroundImageUrl: '',
    backgroundOverlayColor: '#000000',
    backgroundOverlayOpacity: 40,
    logoUrl: '',
    logoWidth: 180,
    headline: 'Claim your bonus 150% up to $30,000',
    subtitle: 'Play Online on Real Money',
    ctaText: 'PLAY NOW',
    ctaUrl: '#',
    ctaColor: '#22c55e',
    ctaGradient: '',
    showFloatingCoins: false,
    floatingElements: [],
    deviceImageUrl: '',
    clickAnywhere: true,
    minHeight: '80vh',
    textAlign: 'center',
    backgroundColor: '#1a0a2e',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
})

// ============================================
// RENDER COMPONENT
// ============================================

export const HeroBannerBlock: FC<BlockRenderProps<HeroBannerBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  const bgStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: props.minHeight === 'auto' ? undefined : props.minHeight,
    backgroundColor: props.backgroundColor,
    color: props.textColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: props.clickAnywhere ? 'pointer' : undefined,
  }

  const ctaBtnStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '16px 48px',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '18px',
    color: '#fff',
    textDecoration: 'none',
    background: props.ctaGradient || props.ctaColor,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={bgStyle}
      onClick={props.clickAnywhere ? () => window.open(props.ctaUrl, '_self') : undefined}
    >
      {/* Background Image */}
      {props.backgroundImageUrl && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${props.backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: props.backgroundOverlayColor,
          opacity: props.backgroundOverlayOpacity / 100,
        }}
      />

      {/* Floating Coins Animation */}
      {props.showFloatingCoins && (
        <style>{`
          @keyframes float-coin {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
          }
          .floating-coin {
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            box-shadow: 0 0 10px rgba(251,191,36,0.5);
          }
        `}</style>
      )}
      {props.showFloatingCoins && Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="floating-coin"
          style={{
            left: `${10 + i * 11}%`,
            animation: `float-coin ${4 + (i % 3)}s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}

      {/* Floating Elements */}
      {props.floatingElements.map((el, i) => (
        <img
          key={i}
          src={el.imageUrl}
          alt=""
          style={{
            position: 'absolute',
            [el.position === 'left' ? 'left' : 'right']: '5%',
            bottom: '10%',
            width: el.size,
            height: 'auto',
            zIndex: 2,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: props.textAlign,
          padding: '60px 24px',
          maxWidth: '600px',
        }}
      >
        {/* Logo */}
        {props.logoUrl && (
          <div style={{ marginBottom: '24px' }}>
            <img
              src={props.logoUrl}
              alt="Logo"
              style={{ width: props.logoWidth, height: 'auto', display: 'inline-block' }}
            />
          </div>
        )}

        {/* Headline */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '12px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {props.headline}
        </h1>

        {/* Subtitle */}
        {props.subtitle && (
          <p
            style={{
              fontSize: '18px',
              opacity: 0.9,
              marginBottom: '32px',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            {props.subtitle}
          </p>
        )}

        {/* Device Image */}
        {props.deviceImageUrl && (
          <div style={{ marginBottom: '24px' }}>
            <img
              src={props.deviceImageUrl}
              alt=""
              style={{ maxWidth: '280px', height: 'auto', margin: '0 auto', display: 'block' }}
            />
          </div>
        )}

        {/* CTA Button */}
        <a
          href={props.ctaUrl}
          style={ctaBtnStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {props.ctaText}
        </a>
      </div>
    </div>
  )
}

// ============================================
// EDITOR COMPONENT
// ============================================

export const HeroBannerEditor: FC<BlockEditorProps<HeroBannerBlockType>> = ({
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input
            type="text"
            value={props.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input
            type="text"
            value={props.logoUrl}
            onChange={(e) => onChange({ logoUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo Width (px)</label>
          <input
            type="number"
            value={props.logoWidth}
            onChange={(e) => onChange({ logoWidth: parseInt(e.target.value) || 180 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Device Image URL</label>
          <input
            type="text"
            value={props.deviceImageUrl}
            onChange={(e) => onChange({ deviceImageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Background */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Background</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
          <input
            type="text"
            value={props.backgroundImageUrl}
            onChange={(e) => onChange({ backgroundImageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overlay Color</label>
            <input
              type="color"
              value={props.backgroundOverlayColor}
              onChange={(e) => onChange({ backgroundOverlayColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overlay Opacity (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={props.backgroundOverlayOpacity}
              onChange={(e) => onChange({ backgroundOverlayOpacity: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Height</label>
          <select
            value={props.minHeight}
            onChange={(e) => onChange({ minHeight: e.target.value as '100vh' | '80vh' | '60vh' | 'auto' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="100vh">100vh (Full Screen)</option>
            <option value="80vh">80vh</option>
            <option value="60vh">60vh</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">CTA</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
          <input
            type="text"
            value={props.ctaText}
            onChange={(e) => onChange({ ctaText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CTA URL</label>
          <input
            type="text"
            value={props.ctaUrl}
            onChange={(e) => onChange({ ctaUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
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
          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Gradient (optional)</label>
          <input
            type="text"
            value={props.ctaGradient}
            onChange={(e) => onChange({ ctaGradient: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="linear-gradient(90deg, #ff6b00, #ff0000)"
          />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Options</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
          <select
            value={props.textAlign}
            onChange={(e) => onChange({ textAlign: e.target.value as 'center' | 'left' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="center">Center</option>
            <option value="left">Left</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="clickAnywhere"
              checked={props.clickAnywhere}
              onChange={(e) => onChange({ clickAnywhere: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="clickAnywhere" className="text-sm text-gray-700">Click Anywhere to Redirect</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showFloatingCoins"
              checked={props.showFloatingCoins}
              onChange={(e) => onChange({ showFloatingCoins: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showFloatingCoins" className="text-sm text-gray-700">Show Floating Coins Animation</label>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Colors</h3>
        <div className="grid grid-cols-3 gap-4">
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
