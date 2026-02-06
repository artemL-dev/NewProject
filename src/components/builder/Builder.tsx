'use client'

import { FC, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addBlock,
  reorderBlocks,
  setCurrentPage,
  initNewPage,
} from '@/store/slices/builderSlice'
import { setIsDragging, setDragSource } from '@/store/slices/uiSlice'
import { Toolbar } from './Toolbar'
import { LeftSidebar } from './LeftSidebar'
import { Canvas } from './Canvas'
import { RightSidebar } from './RightSidebar'
import { createBlock } from '@/blocks/registry'
import type { Page, PageType } from '@/types/page'
import type { BlockType } from '@/types/blocks'

interface BuilderProps {
  page?: Page
  pageType?: PageType
  projectId?: string | null
}

export const Builder: FC<BuilderProps> = ({ page, pageType, projectId }) => {
  const dispatch = useAppDispatch()
  const { blocks } = useAppSelector((state) => state.builder)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    if (page) {
      dispatch(setCurrentPage(page))
    } else if (pageType) {
      dispatch(initNewPage({ type: pageType, projectId: projectId || null }))
    }
  }, [page, pageType, projectId, dispatch])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const source = (active.data.current as any)?.type === 'library' ? 'library' : 'canvas'
    dispatch(setIsDragging(true))
    dispatch(setDragSource(source))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    dispatch(setIsDragging(false))
    dispatch(setDragSource(null))

    if (!over) return

    const activeData = active.data.current as any
    const overData = over.data.current as any

    // Dragging from library
    if (activeData?.type === 'library') {
      const blockType = activeData.blockType as BlockType
      const newBlock = createBlock(blockType)

      if (newBlock) {
        let insertIndex = blocks.length

        // If dropping on a specific position
        if (over.id.toString().startsWith('dropzone-')) {
          insertIndex = parseInt(over.id.toString().replace('dropzone-', ''))
        } else if (overData?.index !== undefined) {
          insertIndex = overData.index
        }

        dispatch(addBlock({ block: newBlock, index: insertIndex }))
      }
    }
    // Reordering within canvas
    else if (activeData?.type === 'canvas' && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id)
      const newIndex = blocks.findIndex((b) => b.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(blocks, oldIndex, newIndex)
        dispatch(reorderBlocks(newOrder.map((b) => b.id)))
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        <Toolbar pageId={page?.id} pageName={page?.name || 'New Page'} />

        <div className="flex-1 flex overflow-hidden">
          <LeftSidebar />
          <Canvas />
          <RightSidebar />
        </div>
      </div>
    </DndContext>
  )
}
