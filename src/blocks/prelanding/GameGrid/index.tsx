'use client'

import { FC } from 'react'
import type { GameGridBlock as GameGridBlockType, GameGridGame, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

// ============================================
// DEFINITION
// ============================================

const defaultGames: GameGridGame[] = [
  { imageUrl: '', title: 'Aviator', url: '#' },
  { imageUrl: '', title: 'Sweet Bonanza', url: '#' },
  { imageUrl: '', title: 'Gates of Olympus', url: '#' },
  { imageUrl: '', title: 'Big Bass Bonanza', url: '#' },
  { imageUrl: '', title: 'Starlight Princess', url: '#' },
  { imageUrl: '', title: 'Sugar Rush', url: '#' },
]

export const gameGridDefinition: BlockDefinition = {
  type: 'game-grid',
  name: 'Game Grid',
  description: 'Grid of game previews with optional center bonus block',
  icon: 'grid',
  category: 'prelanding',
  defaultProps: {
    backgroundImageUrl: '',
    games: defaultGames,
    columns: 3,
    centerTitle: 'BONUS CASINO',
    centerSubtitle: 'WELCOME BONUS: UP TO $3,000 + 100 FREE SPINS!',
    ctaText: 'CLAIM BONUS',
    ctaUrl: '#',
    ctaColor: '#ef4444',
    showCenterBlock: true,
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
}

// ============================================
// FACTORY
// ============================================

export const createGameGridBlock = (): GameGridBlockType => ({
  id: uuidv4(),
  type: 'game-grid',
  order: 0,
  props: {
    backgroundImageUrl: '',
    games: defaultGames,
    columns: 3,
    centerTitle: 'BONUS CASINO',
    centerSubtitle: 'WELCOME BONUS: UP TO $3,000 + 100 FREE SPINS!',
    ctaText: 'CLAIM BONUS',
    ctaUrl: '#',
    ctaColor: '#ef4444',
    showCenterBlock: true,
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
})

// ============================================
// RENDER COMPONENT
// ============================================

export const GameGridBlock: FC<BlockRenderProps<GameGridBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block
  const cols = props.columns

  // Calculate center position for odd-column layouts
  const totalCells = props.games.length + (props.showCenterBlock ? 1 : 0)
  const centerIndex = Math.floor(props.games.length / 2)

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        padding: '24px 16px',
        position: 'relative',
      }}
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
            opacity: 0.3,
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '8px',
        }}
      >
        {props.games.map((game, index) => {
          // Insert center block at the middle
          const items = []

          if (props.showCenterBlock && index === centerIndex) {
            items.push(
              <a
                key="center"
                href={props.ctaUrl}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 8px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${props.accentColor}, ${props.ctaColor})`,
                  textDecoration: 'none',
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 900, marginBottom: '4px' }}>
                  {props.centerTitle}
                </div>
                <div style={{ fontSize: '10px', opacity: 0.9, marginBottom: '8px' }}>
                  {props.centerSubtitle}
                </div>
                <div
                  style={{
                    padding: '6px 16px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {props.ctaText}
                </div>
              </a>
            )
          }

          items.push(
            <a
              key={index}
              href={game.url}
              style={{
                display: 'block',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '1',
                textDecoration: 'none',
              }}
            >
              {game.imageUrl ? (
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${props.accentColor}40, ${props.backgroundColor})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: props.textColor,
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  {game.title}
                </div>
              )}
              {/* Title Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '6px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                {game.title}
              </div>
            </a>
          )

          return items
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: 'center', marginTop: '16px', position: 'relative' }}>
        <a
          href={props.ctaUrl}
          style={{
            display: 'inline-block',
            padding: '14px 48px',
            borderRadius: '9999px',
            backgroundColor: props.ctaColor,
            color: '#fff',
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
          }}
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

export const GameGridEditor: FC<BlockEditorProps<GameGridBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateGame = (index: number, field: string, value: string) => {
    const newGames = [...props.games]
    newGames[index] = { ...newGames[index], [field]: value }
    onChange({ games: newGames })
  }

  const addGame = () => {
    onChange({
      games: [...props.games, { imageUrl: '', title: 'New Game', url: '#' }],
    })
  }

  const removeGame = (index: number) => {
    onChange({ games: props.games.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {/* Layout */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Layout</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
          <select
            value={props.columns}
            onChange={(e) => onChange({ columns: parseInt(e.target.value) as 2 | 3 | 4 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
          </select>
        </div>

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
      </div>

      {/* Center Block */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Center Bonus Block</h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showCenterBlock"
            checked={props.showCenterBlock}
            onChange={(e) => onChange({ showCenterBlock: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="showCenterBlock" className="text-sm text-gray-700">Show Center Block</label>
        </div>

        {props.showCenterBlock && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Center Title</label>
              <input
                type="text"
                value={props.centerTitle}
                onChange={(e) => onChange({ centerTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Center Subtitle</label>
              <input
                type="text"
                value={props.centerSubtitle}
                onChange={(e) => onChange({ centerSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </>
        )}
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
      </div>

      {/* Games */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Games ({props.games.length})</h3>

        {props.games.map((game, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-xs">#{index + 1}</span>
              <button
                onClick={() => removeGame(index)}
                className="text-red-500 text-xs hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={game.title}
                onChange={(e) => updateGame(index, 'title', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                value={game.imageUrl}
                onChange={(e) => updateGame(index, 'imageUrl', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">URL</label>
              <input
                type="text"
                value={game.url}
                onChange={(e) => updateGame(index, 'url', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addGame}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Game
        </button>
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
