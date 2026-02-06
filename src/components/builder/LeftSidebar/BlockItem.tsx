'use client'

import { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'
import type { BlockDefinition } from '@/types/blocks'
import {
  Crown, Gamepad2, Grid3X3, SlidersHorizontal, Trophy, TrendingUp, Download,
  LayoutDashboard, Type, Image, GalleryHorizontal, ListChecks, Quote, FileInput, Video,
  BadgeCheck, PanelBottom, MousePointerClick, MoveVertical, Minus, Code,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  crown: Crown,
  'gamepad-2': Gamepad2,
  'grid-3x3': Grid3X3,
  'sliders-horizontal': SlidersHorizontal,
  trophy: Trophy,
  'trending-up': TrendingUp,
  download: Download,
  'layout-dashboard': LayoutDashboard,
  type: Type,
  image: Image,
  images: GalleryHorizontal,
  'list-checks': ListChecks,
  quote: Quote,
  'file-input': FileInput,
  video: Video,
  'badge-check': BadgeCheck,
  'layout-bottom': PanelBottom,
  'mouse-pointer-click': MousePointerClick,
  'move-vertical': MoveVertical,
  minus: Minus,
  code: Code,
}

interface BlockItemProps {
  definition: BlockDefinition
}

export const BlockItem: FC<BlockItemProps> = ({ definition }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${definition.type}`,
    data: {
      type: 'library',
      blockType: definition.type,
    },
  })

  const Icon = iconMap[definition.icon] || Code

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`
        flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg
        border border-gray-200 cursor-grab hover:bg-gray-100 hover:border-gray-300
        transition-colors select-none
        ${isDragging ? 'shadow-lg ring-2 ring-indigo-500' : ''}
      `}
    >
      <Icon size={24} className="text-gray-600 mb-2" />
      <span className="text-xs text-gray-700 text-center font-medium">
        {definition.name}
      </span>
    </div>
  )
}
