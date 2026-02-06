'use client'

import { FC, useState, useCallback, useRef } from 'react'
import type { WheelOfFortuneBlock as WheelOfFortuneBlockType, WheelSegment, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { Plus, Trash2 } from 'lucide-react'

const defaultSegments: WheelSegment[] = [
  { id: '1', text: '$100', color: '#e53e3e', prize: '$100', isWinning: false, weight: 25 },
  { id: '2', text: '$200', color: '#38a169', prize: '$200', isWinning: false, weight: 20 },
  { id: '3', text: 'Free Spin', color: '#3182ce', prize: 'Free Spin', isWinning: false, weight: 30 },
  { id: '4', text: '$500', color: '#d69e2e', prize: '$500', isWinning: false, weight: 10 },
  { id: '5', text: '$50', color: '#9b2c2c', prize: '$50', isWinning: false, weight: 30 },
  { id: '6', text: 'JACKPOT', color: '#276749', prize: 'JACKPOT', isWinning: true, weight: 5 },
  { id: '7', text: '$150', color: '#2b6cb0', prize: '$150', isWinning: false, weight: 20 },
  { id: '8', text: '$75', color: '#b7791f', prize: '$75', isWinning: false, weight: 25 },
]

export const wheelOfFortuneDefinition: BlockDefinition = {
  type: 'wheel-of-fortune',
  name: 'Wheel of Fortune',
  description: 'Spinning prize wheel with CSS conic-gradient',
  icon: 'circle-dot',
  category: 'prelanding',
  defaultProps: {
    title: 'SPIN & WIN',
    subtitle: 'Try your luck and win amazing prizes!',
    segments: defaultSegments,
    spinDuration: 4000,
    numberOfSpins: 5,
    winSegmentIndex: 5,
    winTitle: 'CONGRATULATIONS!',
    winMessage: 'You won an amazing prize!',
    ctaText: 'CLAIM YOUR PRIZE',
    ctaUrl: '#',
    spinButtonText: 'SPIN NOW',
    spinButtonColor: '#22c55e',
    backgroundColor: '#1a0a2e',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    ctaColor: '#22c55e',
  },
}

export const createWheelOfFortuneBlock = (): WheelOfFortuneBlockType => ({
  id: uuidv4(),
  type: 'wheel-of-fortune',
  order: 0,
  props: {
    title: 'SPIN & WIN',
    subtitle: 'Try your luck and win amazing prizes!',
    segments: defaultSegments.map(s => ({ ...s, id: uuidv4() })),
    spinDuration: 4000,
    numberOfSpins: 5,
    winSegmentIndex: 5,
    winTitle: 'CONGRATULATIONS!',
    winMessage: 'You won an amazing prize!',
    ctaText: 'CLAIM YOUR PRIZE',
    ctaUrl: '#',
    spinButtonText: 'SPIN NOW',
    spinButtonColor: '#22c55e',
    backgroundColor: '#1a0a2e',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    ctaColor: '#22c55e',
  },
})

// Build the conic-gradient CSS string from segments
function buildConicGradient(segments: WheelSegment[]): string {
  const segmentAngle = 360 / segments.length
  const stops: string[] = []
  segments.forEach((seg, i) => {
    const startDeg = i * segmentAngle
    const endDeg = (i + 1) * segmentAngle
    stops.push(`${seg.color} ${startDeg}deg ${endDeg}deg`)
  })
  return `conic-gradient(${stops.join(', ')})`
}

export const WheelOfFortuneBlock: FC<BlockRenderProps<WheelOfFortuneBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [showWin, setShowWin] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  const segmentAngle = 360 / props.segments.length

  const spin = useCallback(() => {
    if (isSpinning) return

    setIsSpinning(true)
    setShowWin(false)

    // Calculate final rotation:
    // We need the winning segment to land at the top (under the pointer).
    // The pointer is at the top (12 o'clock / 0 degrees).
    // Each segment center is at: segmentIndex * segmentAngle + segmentAngle / 2
    // We rotate clockwise, so to land a segment at the top pointer:
    // finalAngle = 360 - (winIndex * segmentAngle + segmentAngle / 2)
    const winIndex = Math.max(0, Math.min(props.winSegmentIndex, props.segments.length - 1))
    const targetAngle = 360 - (winIndex * segmentAngle + segmentAngle / 2)
    const fullSpins = props.numberOfSpins * 360
    const newRotation = rotation + fullSpins + targetAngle - (rotation % 360)

    setRotation(newRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setHasSpun(true)
      setShowWin(true)
    }, props.spinDuration)
  }, [isSpinning, rotation, props.winSegmentIndex, props.segments.length, props.numberOfSpins, props.spinDuration, segmentAngle])

  const conicGradient = buildConicGradient(props.segments)

  return (
    <div
      className={`relative overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      {/* Title */}
      <div className="text-center pt-6 pb-2 px-4">
        <h2
          className="text-2xl font-bold tracking-wider"
          style={{ color: props.accentColor }}
        >
          {props.title}
        </h2>
        {props.subtitle && (
          <p className="text-sm mt-1 opacity-80">{props.subtitle}</p>
        )}
      </div>

      {/* Wheel Container */}
      <div className="relative flex justify-center items-center py-6 px-4">
        {/* Pointer / Arrow at top */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: 0,
            height: 0,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: `28px solid ${props.accentColor}`,
            filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.4))`,
          }}
        />

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative rounded-full shadow-2xl"
          style={{
            width: '280px',
            height: '280px',
            background: conicGradient,
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? `transform ${props.spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
              : 'none',
            border: `4px solid ${props.accentColor}`,
            boxShadow: `0 0 20px ${props.accentColor}40, 0 0 60px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Segment Labels */}
          {props.segments.map((seg, i) => {
            const labelAngle = i * segmentAngle + segmentAngle / 2
            return (
              <div
                key={seg.id}
                className="absolute"
                style={{
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                }}
              >
                <div
                  className="absolute font-bold text-white text-xs"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${labelAngle}deg) translateY(-100px)`,
                    transformOrigin: '0 0',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {seg.text}
                  </span>
                </div>
              </div>
            )
          })}

          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: props.accentColor,
              border: '3px solid #fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>

      {/* Spin Button */}
      <div className="px-6 pb-6">
        <button
          onClick={spin}
          disabled={isSpinning}
          className="w-full py-4 rounded-full font-bold text-xl text-white shadow-lg transition-all disabled:opacity-50"
          style={{
            backgroundColor: props.spinButtonColor,
            boxShadow: `0 4px 15px ${props.spinButtonColor}60`,
          }}
        >
          {isSpinning ? '...' : hasSpun ? 'SPIN AGAIN' : props.spinButtonText}
        </button>
      </div>

      {/* Win Overlay */}
      {showWin && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="text-center animate-pulse">
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: props.accentColor }}
            >
              {props.winTitle}
            </div>
            <div
              className="text-4xl font-bold mb-2"
              style={{ color: props.accentColor }}
            >
              {props.segments[props.winSegmentIndex]?.prize || ''}
            </div>
            <p className="text-lg mb-4 opacity-90">{props.winMessage}</p>
            <div className="space-y-2">
              <a
                href={props.ctaUrl}
                className="inline-block px-8 py-3 rounded-full font-bold text-white text-lg"
                style={{ backgroundColor: props.ctaColor }}
              >
                {props.ctaText}
              </a>
              <button
                onClick={() => setShowWin(false)}
                className="block mx-auto text-sm opacity-70 hover:opacity-100 mt-2"
              >
                Spin Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const WheelOfFortuneEditor: FC<BlockEditorProps<WheelOfFortuneBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateSegment = (id: string, updates: Partial<WheelSegment>) => {
    const newSegments = props.segments.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    )
    onChange({ segments: newSegments })
  }

  const addSegment = () => {
    const newSegment: WheelSegment = {
      id: uuidv4(),
      text: 'New Prize',
      color: '#6b46c1',
      prize: 'New Prize',
      isWinning: false,
      weight: 10,
    }
    onChange({ segments: [...props.segments, newSegment] })
  }

  const removeSegment = (id: string) => {
    if (props.segments.length > 2) {
      const newSegments = props.segments.filter((s) => s.id !== id)
      // Adjust winSegmentIndex if it's now out of range
      if (props.winSegmentIndex >= newSegments.length) {
        onChange({ segments: newSegments, winSegmentIndex: newSegments.length - 1 })
      } else {
        onChange({ segments: newSegments })
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Wheel Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Wheel Settings</h3>

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
            Subtitle
          </label>
          <input
            type="text"
            value={props.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Spin Duration (ms)
            </label>
            <input
              type="number"
              value={props.spinDuration}
              onChange={(e) => onChange({ spinDuration: Math.max(1000, Math.min(10000, Number(e.target.value))) })}
              min={1000}
              max={10000}
              step={500}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Spins
            </label>
            <input
              type="number"
              value={props.numberOfSpins}
              onChange={(e) => onChange({ numberOfSpins: Math.max(3, Math.min(10, Number(e.target.value))) })}
              min={3}
              max={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Win Segment Index
          </label>
          <select
            value={props.winSegmentIndex}
            onChange={(e) => onChange({ winSegmentIndex: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            {props.segments.map((seg, index) => (
              <option key={seg.id} value={index}>
                {index}: {seg.text} ({seg.prize})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Segments */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Segments</h3>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {props.segments.map((segment) => (
            <div key={segment.id} className="bg-gray-50 p-3 rounded space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={segment.text}
                  onChange={(e) => updateSegment(segment.id, { text: e.target.value })}
                  placeholder="Text"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  title="Segment text"
                />
                <input
                  type="text"
                  value={segment.prize}
                  onChange={(e) => updateSegment(segment.id, { prize: e.target.value })}
                  placeholder="Prize"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  title="Prize value"
                />
                <button
                  onClick={() => removeSegment(segment.id)}
                  className="text-red-500 hover:text-red-700 disabled:opacity-30"
                  disabled={props.segments.length <= 2}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={segment.color}
                  onChange={(e) => updateSegment(segment.id, { color: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  title="Segment color"
                />
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={segment.isWinning}
                    onChange={(e) => updateSegment(segment.id, { isWinning: e.target.checked })}
                    className="rounded"
                    id={`winning-${segment.id}`}
                  />
                  <label htmlFor={`winning-${segment.id}`} className="text-xs text-gray-600">
                    Winning
                  </label>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <label className="text-xs text-gray-600">Weight:</label>
                  <input
                    type="number"
                    value={segment.weight}
                    onChange={(e) => updateSegment(segment.id, { weight: Math.max(1, Number(e.target.value)) })}
                    min={1}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    title="Probability weight"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addSegment}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add Segment
        </button>
      </div>

      {/* Win Screen */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Win Screen</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Win Title
          </label>
          <input
            type="text"
            value={props.winTitle}
            onChange={(e) => onChange({ winTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Win Message
          </label>
          <input
            type="text"
            value={props.winMessage}
            onChange={(e) => onChange({ winMessage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Button */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Button</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Spin Button Text
          </label>
          <input
            type="text"
            value={props.spinButtonText}
            onChange={(e) => onChange({ spinButtonText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Spin Button Color
          </label>
          <input
            type="color"
            value={props.spinButtonColor}
            onChange={(e) => onChange({ spinButtonColor: e.target.value })}
            className="w-full h-10 rounded-md cursor-pointer"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">CTA</h3>

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
