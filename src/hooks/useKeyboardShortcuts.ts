'use client'

import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  copyBlock,
  cutBlock,
  pasteBlock,
  removeBlock,
  duplicateBlock,
  selectBlock,
} from '@/store/slices/builderSlice'
import {
  selectCanUndo,
  selectCanRedo,
} from '@/store/slices/historySlice'
import { zoomIn, zoomOut, resetZoom, togglePreviewMode } from '@/store/slices/uiSlice'

interface UseKeyboardShortcutsOptions {
  onSave?: () => void
  onUndo?: () => void
  onRedo?: () => void
}

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const dispatch = useAppDispatch()
  const { selectedBlockId, blocks, clipboard } = useAppSelector(
    (state) => state.builder
  )
  const canUndo = useAppSelector(selectCanUndo)
  const canRedo = useAppSelector(selectCanRedo)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }

      // Save: Cmd/Ctrl + S
      if (modifier && e.key === 's') {
        e.preventDefault()
        options.onSave?.()
      }

      // Undo: Cmd/Ctrl + Z
      if (modifier && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) options.onUndo?.()
      }

      // Redo: Cmd/Ctrl + Shift + Z or Cmd/Ctrl + Y
      if ((modifier && e.key === 'z' && e.shiftKey) || (modifier && e.key === 'y')) {
        e.preventDefault()
        if (canRedo) options.onRedo?.()
      }

      // Copy: Cmd/Ctrl + C
      if (modifier && e.key === 'c' && selectedBlockId) {
        e.preventDefault()
        dispatch(copyBlock(selectedBlockId))
      }

      // Cut: Cmd/Ctrl + X
      if (modifier && e.key === 'x' && selectedBlockId) {
        e.preventDefault()
        dispatch(cutBlock(selectedBlockId))
      }

      // Paste: Cmd/Ctrl + V
      if (modifier && e.key === 'v' && clipboard) {
        e.preventDefault()
        const selectedIndex = selectedBlockId
          ? blocks.findIndex((b) => b.id === selectedBlockId) + 1
          : undefined
        dispatch(pasteBlock(selectedIndex))
      }

      // Duplicate: Cmd/Ctrl + D
      if (modifier && e.key === 'd' && selectedBlockId) {
        e.preventDefault()
        dispatch(duplicateBlock(selectedBlockId))
      }

      // Delete: Delete or Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBlockId) {
        e.preventDefault()
        dispatch(removeBlock(selectedBlockId))
      }

      // Escape: Deselect
      if (e.key === 'Escape') {
        dispatch(selectBlock(null))
      }

      // Zoom in: Cmd/Ctrl + =
      if (modifier && (e.key === '=' || e.key === '+')) {
        e.preventDefault()
        dispatch(zoomIn())
      }

      // Zoom out: Cmd/Ctrl + -
      if (modifier && e.key === '-') {
        e.preventDefault()
        dispatch(zoomOut())
      }

      // Reset zoom: Cmd/Ctrl + 0
      if (modifier && e.key === '0') {
        e.preventDefault()
        dispatch(resetZoom())
      }

      // Preview mode: Cmd/Ctrl + P
      if (modifier && e.key === 'p') {
        e.preventDefault()
        dispatch(togglePreviewMode())
      }

      // Navigate blocks with arrow keys
      if (selectedBlockId && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault()
        const currentIndex = blocks.findIndex((b) => b.id === selectedBlockId)
        if (currentIndex !== -1) {
          const newIndex =
            e.key === 'ArrowUp'
              ? Math.max(0, currentIndex - 1)
              : Math.min(blocks.length - 1, currentIndex + 1)
          dispatch(selectBlock(blocks[newIndex].id))
        }
      }
    },
    [
      dispatch,
      selectedBlockId,
      blocks,
      clipboard,
      canUndo,
      canRedo,
      options,
    ]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
