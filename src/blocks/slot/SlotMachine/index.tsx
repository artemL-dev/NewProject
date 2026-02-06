'use client'

import { FC, useState, useEffect, useRef, useCallback } from 'react'
import type { SlotMachineBlock as SlotMachineBlockType, BlockDefinition, SlotMachineSymbol } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { Plus, Trash2, Volume2, VolumeX } from 'lucide-react'

const defaultSymbols: SlotMachineSymbol[] = [
  { id: '1', image: '🍒', value: 10, weight: 30 },
  { id: '2', image: '🍋', value: 20, weight: 25 },
  { id: '3', image: '🍊', value: 30, weight: 20 },
  { id: '4', image: '🍇', value: 40, weight: 15 },
  { id: '5', image: '💎', value: 100, weight: 7 },
  { id: '6', image: '7️⃣', value: 200, weight: 3 },
]

export const slotMachineDefinition: BlockDefinition = {
  type: 'slot-machine',
  name: 'Slot Machine',
  description: 'Interactive slot machine with spinning reels',
  icon: 'gamepad-2',
  category: 'slot',
  defaultProps: {
    // Game settings
    title: 'MEGA JACKPOT',
    reelsCount: 3,
    rowsCount: 1,
    symbols: defaultSymbols,
    initialBalance: 1000,
    betOptions: [10, 25, 50, 100],
    defaultBet: 10,
    spinDuration: 2000,
    winChance: 30, // percentage for demo

    // Visual settings
    backgroundColor: '#1a0a2e',
    reelBackgroundColor: '#0d0518',
    frameColor: '#ffd700',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    spinButtonColor: '#22c55e',
    spinButtonText: 'SPIN',

    // Win settings
    showWinAnimation: true,
    winMessageTitle: 'YOU WON!',
    ctaText: 'CLAIM PRIZE',
    ctaUrl: '#',
    ctaColor: '#22c55e',

    // Features
    showAutoSpin: true,
    showSoundToggle: true,
    autoSpinCount: 10,
  },
}

export const createSlotMachineBlock = (): SlotMachineBlockType => ({
  id: uuidv4(),
  type: 'slot-machine',
  order: 0,
  props: {
    title: 'MEGA JACKPOT',
    reelsCount: 3,
    rowsCount: 1,
    symbols: defaultSymbols.map(s => ({ ...s, id: uuidv4() })),
    initialBalance: 1000,
    betOptions: [10, 25, 50, 100],
    defaultBet: 10,
    spinDuration: 2000,
    winChance: 30,

    backgroundColor: '#1a0a2e',
    reelBackgroundColor: '#0d0518',
    frameColor: '#ffd700',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    spinButtonColor: '#22c55e',
    spinButtonText: 'SPIN',

    showWinAnimation: true,
    winMessageTitle: 'YOU WON!',
    ctaText: 'CLAIM PRIZE',
    ctaUrl: '#',
    ctaColor: '#22c55e',

    showAutoSpin: true,
    showSoundToggle: true,
    autoSpinCount: 10,
  },
})

// Slot Reel Component
const SlotReel: FC<{
  symbols: SlotMachineSymbol[]
  finalSymbol: string
  isSpinning: boolean
  spinDuration: number
  reelIndex: number
  backgroundColor: string
}> = ({ symbols, finalSymbol, isSpinning, spinDuration, reelIndex, backgroundColor }) => {
  const [displaySymbols, setDisplaySymbols] = useState<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isSpinning) {
      // Spin animation - rapid symbol changes
      const spinInterval = 50 + reelIndex * 20
      intervalRef.current = setInterval(() => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
        setDisplaySymbols([randomSymbol?.image || '❓'])
      }, spinInterval)

      // Stop after duration with staggered delay per reel
      const stopDelay = spinDuration + reelIndex * 300
      setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setDisplaySymbols([finalSymbol])
      }, stopDelay)
    } else {
      setDisplaySymbols([finalSymbol])
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isSpinning, finalSymbol, symbols, spinDuration, reelIndex])

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ backgroundColor }}
    >
      <div className="w-20 h-20 flex items-center justify-center text-5xl">
        {displaySymbols[0] || symbols[0]?.image || '❓'}
      </div>
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />
    </div>
  )
}

export const SlotMachineBlock: FC<BlockRenderProps<SlotMachineBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block
  const [balance, setBalance] = useState(props.initialBalance)
  const [currentBet, setCurrentBet] = useState(props.defaultBet)
  const [lastWin, setLastWin] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [reelResults, setReelResults] = useState<string[]>([])
  const [showWin, setShowWin] = useState(false)
  const [autoSpin, setAutoSpin] = useState(false)
  const [autoSpinRemaining, setAutoSpinRemaining] = useState(props.autoSpinCount)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Initialize reels
  useEffect(() => {
    const initial = Array(props.reelsCount).fill(props.symbols[0]?.image || '❓')
    setReelResults(initial)
  }, [props.reelsCount, props.symbols])

  // Weighted random symbol selection
  const getRandomSymbol = useCallback(() => {
    const totalWeight = props.symbols.reduce((sum, s) => sum + (s.weight || 10), 0)
    let random = Math.random() * totalWeight

    for (const symbol of props.symbols) {
      random -= symbol.weight || 10
      if (random <= 0) {
        return symbol
      }
    }
    return props.symbols[0]
  }, [props.symbols])

  // Check for win
  const checkWin = useCallback((results: string[]) => {
    // All same symbols = jackpot
    if (results.every(r => r === results[0])) {
      const symbol = props.symbols.find(s => s.image === results[0])
      return (symbol?.value || 10) * currentBet
    }

    // Two matching = small win
    const counts: Record<string, number> = {}
    results.forEach(r => {
      counts[r] = (counts[r] || 0) + 1
    })

    const pairs = Object.entries(counts).filter(([, count]) => count >= 2)
    if (pairs.length > 0) {
      const [symbol] = pairs[0]
      const symbolData = props.symbols.find(s => s.image === symbol)
      return Math.floor((symbolData?.value || 10) * currentBet * 0.5)
    }

    return 0
  }, [props.symbols, currentBet])

  const spin = useCallback(() => {
    if (isSpinning || balance < currentBet) return

    setIsSpinning(true)
    setShowWin(false)
    setLastWin(0)
    setBalance(prev => prev - currentBet)

    // Determine result (with win chance)
    const willWin = Math.random() * 100 < props.winChance
    let results: string[]

    if (willWin) {
      // Force a win
      const winSymbol = getRandomSymbol()
      results = Array(props.reelsCount).fill(winSymbol.image)
    } else {
      // Random results
      results = Array(props.reelsCount).fill(null).map(() => getRandomSymbol().image)
    }

    setReelResults(results)

    // Calculate total spin time
    const totalSpinTime = props.spinDuration + (props.reelsCount - 1) * 300 + 200

    setTimeout(() => {
      setIsSpinning(false)

      const winAmount = checkWin(results)
      if (winAmount > 0) {
        setLastWin(winAmount)
        setBalance(prev => prev + winAmount)
        if (props.showWinAnimation) {
          setShowWin(true)
        }
      }
    }, totalSpinTime)
  }, [isSpinning, balance, currentBet, props.winChance, props.reelsCount, props.spinDuration, props.showWinAnimation, getRandomSymbol, checkWin])

  // Auto spin
  useEffect(() => {
    if (autoSpin && !isSpinning && autoSpinRemaining > 0 && balance >= currentBet) {
      const timeout = setTimeout(() => {
        spin()
        setAutoSpinRemaining(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timeout)
    } else if (autoSpinRemaining <= 0 || balance < currentBet) {
      setAutoSpin(false)
      setAutoSpinRemaining(props.autoSpinCount)
    }
  }, [autoSpin, isSpinning, autoSpinRemaining, balance, currentBet, props.autoSpinCount, spin])

  const toggleAutoSpin = () => {
    if (autoSpin) {
      setAutoSpin(false)
      setAutoSpinRemaining(props.autoSpinCount)
    } else {
      setAutoSpin(true)
      setAutoSpinRemaining(props.autoSpinCount)
    }
  }

  return (
    <div
      className={`relative overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      {/* Title */}
      <div className="text-center py-3 px-4">
        <h2
          className="text-xl font-bold tracking-wider"
          style={{ color: props.accentColor }}
        >
          {props.title}
        </h2>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <div className="text-center">
          <div className="text-xs opacity-70">WIN</div>
          <div
            className="font-bold text-lg"
            style={{ color: lastWin > 0 ? props.accentColor : props.textColor }}
          >
            ${lastWin}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs opacity-70">CREDITS</div>
          <div className="font-bold text-lg">${balance}</div>
        </div>
        <div className="text-center">
          <div className="text-xs opacity-70">BET</div>
          <div className="font-bold text-lg">${currentBet}</div>
        </div>
      </div>

      {/* Slot Machine Frame */}
      <div
        className="mx-4 p-4 rounded-xl"
        style={{
          border: `3px solid ${props.frameColor}`,
          boxShadow: `0 0 20px ${props.frameColor}40, inset 0 0 30px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Reels Container */}
        <div
          className="flex justify-center gap-2 p-3 rounded-lg"
          style={{ backgroundColor: props.reelBackgroundColor }}
        >
          {reelResults.map((result, index) => (
            <SlotReel
              key={index}
              symbols={props.symbols}
              finalSymbol={result}
              isSpinning={isSpinning}
              spinDuration={props.spinDuration}
              reelIndex={index}
              backgroundColor="rgba(255,255,255,0.05)"
            />
          ))}
        </div>
      </div>

      {/* Bet Selector */}
      <div className="flex justify-center gap-2 px-4 py-3">
        {props.betOptions.map((bet) => (
          <button
            key={bet}
            onClick={() => !isSpinning && setCurrentBet(bet)}
            disabled={isSpinning}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              currentBet === bet
                ? 'scale-110'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: currentBet === bet ? props.accentColor : 'rgba(255,255,255,0.1)',
              color: currentBet === bet ? '#000' : props.textColor,
            }}
          >
            ${bet}
          </button>
        ))}
      </div>

      {/* Spin Button */}
      <div className="px-4 pb-4">
        <button
          onClick={spin}
          disabled={isSpinning || balance < currentBet}
          className="w-full py-4 rounded-full font-bold text-xl text-white shadow-lg transition-all disabled:opacity-50"
          style={{
            backgroundColor: props.spinButtonColor,
            boxShadow: `0 4px 15px ${props.spinButtonColor}60`,
          }}
        >
          {isSpinning ? '...' : props.spinButtonText}
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 px-4 pb-4">
        {props.showAutoSpin && (
          <button
            onClick={toggleAutoSpin}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              autoSpin ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {autoSpin ? `AUTO (${autoSpinRemaining})` : 'AUTO'}
          </button>
        )}

        {props.showSoundToggle && (
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        )}
      </div>

      {/* Win Modal Overlay */}
      {showWin && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="text-center animate-pulse">
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: props.accentColor }}
            >
              {props.winMessageTitle}
            </div>
            <div
              className="text-5xl font-bold mb-4"
              style={{ color: props.accentColor }}
            >
              ${lastWin}
            </div>
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
                Continue Playing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const SlotMachineEditor: FC<BlockEditorProps<SlotMachineBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateSymbol = (id: string, updates: Partial<SlotMachineSymbol>) => {
    const newSymbols = props.symbols.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    )
    onChange({ symbols: newSymbols })
  }

  const addSymbol = () => {
    const newSymbol: SlotMachineSymbol = {
      id: uuidv4(),
      image: '⭐',
      value: 50,
      weight: 10,
    }
    onChange({ symbols: [...props.symbols, newSymbol] })
  }

  const removeSymbol = (id: string) => {
    if (props.symbols.length > 3) {
      onChange({ symbols: props.symbols.filter((s) => s.id !== id) })
    }
  }

  const updateBetOption = (index: number, value: number) => {
    const newBetOptions = [...props.betOptions]
    newBetOptions[index] = value
    onChange({ betOptions: newBetOptions.sort((a, b) => a - b) })
  }

  const addBetOption = () => {
    const max = Math.max(...props.betOptions)
    onChange({ betOptions: [...props.betOptions, max * 2].sort((a, b) => a - b) })
  }

  const removeBetOption = (index: number) => {
    if (props.betOptions.length > 1) {
      const newBetOptions = props.betOptions.filter((_, i) => i !== index)
      onChange({ betOptions: newBetOptions })
    }
  }

  return (
    <div className="space-y-6">
      {/* Game Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Game Settings</h3>

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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reels Count
            </label>
            <input
              type="number"
              value={props.reelsCount}
              onChange={(e) => onChange({ reelsCount: Math.max(3, Math.min(5, Number(e.target.value))) })}
              min={3}
              max={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Balance
            </label>
            <input
              type="number"
              value={props.initialBalance}
              onChange={(e) => onChange({ initialBalance: Math.max(0, Number(e.target.value)) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Spin Duration (ms)
            </label>
            <input
              type="number"
              value={props.spinDuration}
              onChange={(e) => onChange({ spinDuration: Math.max(500, Math.min(5000, Number(e.target.value))) })}
              min={500}
              max={5000}
              step={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Win Chance (%)
            </label>
            <input
              type="number"
              value={props.winChance}
              onChange={(e) => onChange({ winChance: Math.max(0, Math.min(100, Number(e.target.value))) })}
              min={0}
              max={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* Symbols */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Symbols</h3>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {props.symbols.map((symbol) => (
            <div key={symbol.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
              <input
                type="text"
                value={symbol.image}
                onChange={(e) => updateSymbol(symbol.id, { image: e.target.value })}
                className="w-14 px-2 py-1 border border-gray-300 rounded text-center text-lg"
                title="Emoji or image URL"
              />
              <input
                type="number"
                value={symbol.value}
                onChange={(e) => updateSymbol(symbol.id, { value: Number(e.target.value) })}
                placeholder="Value"
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                title="Win multiplier"
              />
              <input
                type="number"
                value={symbol.weight || 10}
                onChange={(e) => updateSymbol(symbol.id, { weight: Number(e.target.value) })}
                placeholder="Weight"
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                title="Probability weight"
              />
              <button
                onClick={() => removeSymbol(symbol.id)}
                className="text-red-500 hover:text-red-700 disabled:opacity-30"
                disabled={props.symbols.length <= 3}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addSymbol}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add Symbol
        </button>
      </div>

      {/* Bet Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Bet Options</h3>

        <div className="space-y-2">
          {props.betOptions.map((bet, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                value={bet}
                onChange={(e) => updateBetOption(index, Number(e.target.value))}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={() => removeBetOption(index)}
                className="text-red-500 hover:text-red-700 disabled:opacity-30"
                disabled={props.betOptions.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addBetOption}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add Bet Option
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Bet
          </label>
          <select
            value={props.defaultBet}
            onChange={(e) => onChange({ defaultBet: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            {props.betOptions.map((bet) => (
              <option key={bet} value={bet}>
                ${bet}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Settings */}
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
              Reel Background
            </label>
            <input
              type="color"
              value={props.reelBackgroundColor}
              onChange={(e) => onChange({ reelBackgroundColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frame Color
            </label>
            <input
              type="color"
              value={props.frameColor}
              onChange={(e) => onChange({ frameColor: e.target.value })}
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
              Spin Button
            </label>
            <input
              type="color"
              value={props.spinButtonColor}
              onChange={(e) => onChange({ spinButtonColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Spin Button Text */}
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

      {/* Win Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Win Settings</h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showWinAnimation"
            checked={props.showWinAnimation}
            onChange={(e) => onChange({ showWinAnimation: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="showWinAnimation" className="text-sm text-gray-700">
            Show Win Animation
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Win Message Title
          </label>
          <input
            type="text"
            value={props.winMessageTitle}
            onChange={(e) => onChange({ winMessageTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

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

      {/* Features */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Features</h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showAutoSpin"
              checked={props.showAutoSpin}
              onChange={(e) => onChange({ showAutoSpin: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showAutoSpin" className="text-sm text-gray-700">
              Show Auto Spin Button
            </label>
          </div>

          {props.showAutoSpin && (
            <div className="ml-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auto Spin Count
              </label>
              <input
                type="number"
                value={props.autoSpinCount}
                onChange={(e) => onChange({ autoSpinCount: Math.max(1, Math.min(100, Number(e.target.value))) })}
                min={1}
                max={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showSoundToggle"
              checked={props.showSoundToggle}
              onChange={(e) => onChange({ showSoundToggle: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showSoundToggle" className="text-sm text-gray-700">
              Show Sound Toggle
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
