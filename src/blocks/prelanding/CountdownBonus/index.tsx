'use client'

import { FC, useState, useEffect, useCallback } from 'react'
import type { CountdownBonusBlock as CountdownBonusBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const countdownBonusDefinition: BlockDefinition = {
  type: 'countdown-bonus',
  name: 'Countdown Bonus',
  description: 'Countdown timer with bonus offer and CTA',
  icon: 'timer',
  category: 'prelanding',
  defaultProps: {
    countdownMinutes: 15,
    countdownEndAction: 'reset',
    bonusTitle: 'EXCLUSIVE BONUS',
    bonusAmount: '500 EUR',
    bonusSubtitle: 'Available for new players only',
    urgencyText: 'Limited time offer!',
    showUrgencyPulse: true,
    ctaText: 'CLAIM YOUR BONUS',
    ctaUrl: '#',
    backgroundColor: '#1a0a2e',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    ctaColor: '#22c55e',
  },
}

export const createCountdownBonusBlock = (): CountdownBonusBlockType => ({
  id: uuidv4(),
  type: 'countdown-bonus',
  order: 0,
  props: {
    countdownMinutes: 15,
    countdownEndAction: 'reset',
    bonusTitle: 'EXCLUSIVE BONUS',
    bonusAmount: '500 EUR',
    bonusSubtitle: 'Available for new players only',
    urgencyText: 'Limited time offer!',
    showUrgencyPulse: true,
    ctaText: 'CLAIM YOUR BONUS',
    ctaUrl: '#',
    backgroundColor: '#1a0a2e',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    ctaColor: '#22c55e',
  },
})

// Animated digit component for the countdown
const AnimatedDigit: FC<{ value: string; accentColor: string }> = ({ value, accentColor }) => {
  return (
    <span
      className="inline-flex items-center justify-center w-12 h-14 rounded-lg text-3xl font-mono font-bold transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: accentColor,
        boxShadow: `0 0 10px ${accentColor}30`,
      }}
    >
      {value}
    </span>
  )
}

export const CountdownBonusBlockComponent: FC<BlockRenderProps<CountdownBonusBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block
  const [secondsLeft, setSecondsLeft] = useState(props.countdownMinutes * 60)
  const [isExpired, setIsExpired] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // Reset timer when countdownMinutes prop changes
  useEffect(() => {
    setSecondsLeft(props.countdownMinutes * 60)
    setIsExpired(false)
    setIsHidden(false)
  }, [props.countdownMinutes])

  const handleTimerEnd = useCallback(() => {
    switch (props.countdownEndAction) {
      case 'reset':
        setSecondsLeft(props.countdownMinutes * 60)
        break
      case 'hide':
        setIsHidden(true)
        break
      case 'show-expired':
        setIsExpired(true)
        break
    }
  }, [props.countdownEndAction, props.countdownMinutes])

  useEffect(() => {
    if (isExpired || isHidden) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          // Use setTimeout to avoid state update during render
          setTimeout(handleTimerEnd, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isExpired, isHidden, handleTimerEnd])

  if (isHidden) return null

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return (
    <div
      className={`relative overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      {/* Urgency Text */}
      {props.urgencyText && (
        <div className="text-center pt-5 px-4">
          <span
            className={`inline-block text-sm font-semibold tracking-widest uppercase ${
              props.showUrgencyPulse ? 'animate-pulse' : ''
            }`}
            style={{ color: props.accentColor }}
          >
            {props.urgencyText}
          </span>
        </div>
      )}

      {/* Bonus Title */}
      <div className="text-center pt-4 px-4">
        <h2
          className="text-2xl font-bold tracking-wider"
          style={{ color: props.accentColor }}
        >
          {props.bonusTitle}
        </h2>
      </div>

      {/* Bonus Amount */}
      <div className="text-center pt-2 px-4">
        <div
          className="text-5xl font-extrabold"
          style={{ color: props.accentColor }}
        >
          {props.bonusAmount}
        </div>
      </div>

      {/* Bonus Subtitle */}
      {props.bonusSubtitle && (
        <div className="text-center pt-2 px-4">
          <p className="text-sm opacity-80">{props.bonusSubtitle}</p>
        </div>
      )}

      {/* Countdown Timer */}
      <div className="flex justify-center items-center gap-2 py-6 px-4">
        {isExpired ? (
          <div
            className="text-xl font-bold opacity-70"
            style={{ color: props.accentColor }}
          >
            OFFER EXPIRED
          </div>
        ) : (
          <>
            <AnimatedDigit value={mm[0]} accentColor={props.accentColor} />
            <AnimatedDigit value={mm[1]} accentColor={props.accentColor} />
            <span
              className="text-3xl font-bold mx-1 animate-pulse"
              style={{ color: props.accentColor }}
            >
              :
            </span>
            <AnimatedDigit value={ss[0]} accentColor={props.accentColor} />
            <AnimatedDigit value={ss[1]} accentColor={props.accentColor} />
          </>
        )}
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-6">
        <a
          href={props.ctaUrl}
          className="block w-full py-4 rounded-full font-bold text-xl text-white text-center shadow-lg transition-all hover:opacity-90"
          style={{
            backgroundColor: props.ctaColor,
            boxShadow: `0 4px 15px ${props.ctaColor}60`,
          }}
        >
          {props.ctaText}
        </a>
      </div>
    </div>
  )
}

// Alias for the render component export
export const CountdownBonusBlock = CountdownBonusBlockComponent

export const CountdownBonusEditor: FC<BlockEditorProps<CountdownBonusBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  return (
    <div className="space-y-6">
      {/* Timer Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Timer Settings</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Countdown Minutes
          </label>
          <input
            type="number"
            value={props.countdownMinutes}
            onChange={(e) => onChange({ countdownMinutes: Math.max(1, Math.min(1440, Number(e.target.value))) })}
            min={1}
            max={1440}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            On Timer End
          </label>
          <select
            value={props.countdownEndAction}
            onChange={(e) => onChange({ countdownEndAction: e.target.value as 'reset' | 'hide' | 'show-expired' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="reset">Reset Timer</option>
            <option value="hide">Hide Block</option>
            <option value="show-expired">Show Expired Message</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Content</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bonus Title
          </label>
          <input
            type="text"
            value={props.bonusTitle}
            onChange={(e) => onChange({ bonusTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bonus Amount
          </label>
          <input
            type="text"
            value={props.bonusAmount}
            onChange={(e) => onChange({ bonusAmount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bonus Subtitle
          </label>
          <input
            type="text"
            value={props.bonusSubtitle}
            onChange={(e) => onChange({ bonusSubtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Text
          </label>
          <input
            type="text"
            value={props.urgencyText}
            onChange={(e) => onChange({ urgencyText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showUrgencyPulse"
            checked={props.showUrgencyPulse}
            onChange={(e) => onChange({ showUrgencyPulse: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="showUrgencyPulse" className="text-sm text-gray-700">
            Show Urgency Pulse Animation
          </label>
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">CTA Button</h3>

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
      </div>
    </div>
  )
}
