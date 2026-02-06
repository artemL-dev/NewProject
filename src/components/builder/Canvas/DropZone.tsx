'use client'

import { FC } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'

interface DropZoneProps {
  index: number
}

export const DropZone: FC<DropZoneProps> = ({ index }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `dropzone-${index}`,
    data: {
      index,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[100px] border-2 border-dashed rounded-lg m-4 flex flex-col items-center justify-center
        transition-colors
        ${isOver
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-300 bg-gray-50'
        }
      `}
    >
      <Plus
        size={24}
        className={isOver ? 'text-indigo-500' : 'text-gray-400'}
      />
      <span
        className={`text-sm mt-2 ${isOver ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        {isOver ? 'Drop here' : 'Drag a block here'}
      </span>
    </div>
  )
}
