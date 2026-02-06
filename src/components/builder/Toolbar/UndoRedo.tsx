'use client'

import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectCanUndo, selectCanRedo, selectLastHistoryEntry, selectNextHistoryEntry, popFromPast, popFromFuture, pushHistory } from '@/store/slices/historySlice'
import { Undo2, Redo2 } from 'lucide-react'

export const UndoRedo: FC = () => {
  const dispatch = useAppDispatch()
  const canUndo = useAppSelector(selectCanUndo)
  const canRedo = useAppSelector(selectCanRedo)
  const lastEntry = useAppSelector(selectLastHistoryEntry)
  const nextEntry = useAppSelector(selectNextHistoryEntry)
  const { blocks, pageSettings } = useAppSelector((state) => state.builder)

  const handleUndo = () => {
    if (!canUndo || !lastEntry) return

    // Save current state to future before undoing
    dispatch(pushHistory({
      blocks: JSON.parse(JSON.stringify(blocks)),
      settings: JSON.parse(JSON.stringify(pageSettings)),
      timestamp: Date.now(),
    }))

    // Pop from past
    dispatch(popFromPast())

    // Apply the last entry state to builder
    // This would typically dispatch actions to set blocks and settings
    // For now, this is handled via the middleware pattern
  }

  const handleRedo = () => {
    if (!canRedo || !nextEntry) return

    // Pop from future
    dispatch(popFromFuture())
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleUndo}
        disabled={!canUndo}
        className={`
          p-1.5 rounded transition-colors
          ${canUndo
            ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            : 'text-gray-300 cursor-not-allowed'
          }
        `}
        title="Undo (Cmd+Z)"
      >
        <Undo2 size={18} />
      </button>

      <button
        onClick={handleRedo}
        disabled={!canRedo}
        className={`
          p-1.5 rounded transition-colors
          ${canRedo
            ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            : 'text-gray-300 cursor-not-allowed'
          }
        `}
        title="Redo (Cmd+Shift+Z)"
      >
        <Redo2 size={18} />
      </button>
    </div>
  )
}
