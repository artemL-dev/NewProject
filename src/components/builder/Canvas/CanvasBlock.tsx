'use client'

import { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectBlock,
  hoverBlock,
  removeBlock,
  duplicateBlock,
} from '@/store/slices/builderSlice'
import { getBlockComponent } from '@/blocks/registry'
import { GripVertical, Copy, Trash2 } from 'lucide-react'
import type { Block } from '@/types/blocks'

interface CanvasBlockProps {
  block: Block
  index: number
  isSelected: boolean
}

export const CanvasBlock: FC<CanvasBlockProps> = ({ block, index, isSelected }) => {
  const dispatch = useAppDispatch()
  const { hoveredBlockId } = useAppSelector((state) => state.builder)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: {
      type: 'canvas',
      block,
      index,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const BlockComponent = getBlockComponent(block.type)
  const isHovered = hoveredBlockId === block.id

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(selectBlock(block.id))
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(removeBlock(block.id))
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(duplicateBlock(block.id))
  }

  if (!BlockComponent) {
    return (
      <div className="p-4 bg-red-50 text-red-600 text-sm">
        Unknown block type: {block.type}
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group
        ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
        ${isHovered && !isSelected ? 'ring-2 ring-indigo-300' : ''}
      `}
      onClick={handleClick}
      onMouseEnter={() => dispatch(hoverBlock(block.id))}
      onMouseLeave={() => dispatch(hoverBlock(null))}
    >
      {/* Block toolbar */}
      <div
        className={`
          absolute -top-8 left-0 right-0 flex items-center justify-between px-2 py-1
          bg-indigo-500 text-white text-xs rounded-t
          transition-opacity z-20
          ${isSelected || isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-indigo-600 rounded"
        >
          <GripVertical size={14} />
        </div>

        {/* Block type label */}
        <span className="font-medium">{block.type}</span>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleDuplicate}
            className="p-1 hover:bg-indigo-600 rounded"
            title="Duplicate"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-red-500 rounded"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Block content */}
      <BlockComponent block={block} isSelected={isSelected} isHovered={isHovered} />
    </div>
  )
}
