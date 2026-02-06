'use client'

import { FC } from 'react'
import { useDroppable, useDndMonitor } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectBlock, addBlock, reorderBlocks } from '@/store/slices/builderSlice'
import { PhoneFrame } from './PhoneFrame'
import { CanvasBlock } from './CanvasBlock'
import { DropZone } from './DropZone'
import { createBlock } from '@/blocks/registry'
import type { BlockType } from '@/types/blocks'

export const Canvas: FC = () => {
  const dispatch = useAppDispatch()
  const { blocks, selectedBlockId, pageSettings } = useAppSelector(
    (state) => state.builder
  )
  const { devicePreview, canvasZoom, isDragging } = useAppSelector(
    (state) => state.ui
  )

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  })

  const blockIds = blocks.map((b) => b.id)

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Deselect when clicking on empty canvas
    if (e.target === e.currentTarget) {
      dispatch(selectBlock(null))
    }
  }

  return (
    <div
      className="flex-1 bg-gray-100 overflow-auto p-8 flex justify-center"
      onClick={handleCanvasClick}
    >
      <div
        style={{
          transform: `scale(${canvasZoom / 100})`,
          transformOrigin: 'top center',
        }}
      >
        <PhoneFrame device={devicePreview}>
          <div
            ref={setNodeRef}
            className={`
              min-h-full transition-colors
              ${isOver && isDragging ? 'bg-indigo-50' : ''}
            `}
            style={{
              backgroundColor: pageSettings.backgroundColor,
              fontFamily: pageSettings.fontFamily,
            }}
          >
            <SortableContext
              items={blockIds}
              strategy={verticalListSortingStrategy}
            >
              {blocks.length === 0 ? (
                <DropZone index={0} />
              ) : (
                <>
                  {blocks.map((block, index) => (
                    <CanvasBlock
                      key={block.id}
                      block={block}
                      index={index}
                      isSelected={selectedBlockId === block.id}
                    />
                  ))}
                  {isDragging && <DropZone index={blocks.length} />}
                </>
              )}
            </SortableContext>
          </div>
        </PhoneFrame>
      </div>
    </div>
  )
}
