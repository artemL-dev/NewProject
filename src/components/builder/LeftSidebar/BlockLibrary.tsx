'use client'

import { FC, useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import {
  getSlotBlocks,
  getGeneralBlocks,
  getCommonBlocks,
  getPrelandingBlocks,
  getWhiteBlocks,
} from '@/blocks/registry'
import { BlockItem } from './BlockItem'
import type { BlockDefinition } from '@/types/blocks'

export const BlockLibrary: FC = () => {
  const { blockFilter, blockCategoryFilter } = useAppSelector((state) => state.ui)
  const { pageType } = useAppSelector((state) => state.builder)

  const filteredBlocks = useMemo(() => {
    let blocks: BlockDefinition[] = []

    // Get blocks based on category filter
    if (blockCategoryFilter === 'all') {
      switch (pageType) {
        case 'slot':
          blocks = [...getSlotBlocks(), ...getCommonBlocks()]
          break
        case 'prelanding':
          blocks = [...getPrelandingBlocks(), ...getCommonBlocks()]
          break
        case 'white':
          blocks = [...getWhiteBlocks(), ...getCommonBlocks()]
          break
        case 'general':
          blocks = [...getGeneralBlocks(), ...getCommonBlocks()]
          break
        default:
          blocks = [...getSlotBlocks(), ...getPrelandingBlocks(), ...getWhiteBlocks(), ...getGeneralBlocks(), ...getCommonBlocks()]
      }
    } else if (blockCategoryFilter === 'slot') {
      blocks = getSlotBlocks()
    } else if (blockCategoryFilter === 'general') {
      blocks = getGeneralBlocks()
    } else if (blockCategoryFilter === 'prelanding') {
      blocks = getPrelandingBlocks()
    } else if (blockCategoryFilter === 'white') {
      blocks = getWhiteBlocks()
    } else {
      blocks = getCommonBlocks()
    }

    // Filter by search term
    if (blockFilter) {
      const search = blockFilter.toLowerCase()
      blocks = blocks.filter(
        (b) =>
          b.name.toLowerCase().includes(search) ||
          b.description.toLowerCase().includes(search)
      )
    }

    return blocks
  }, [blockFilter, blockCategoryFilter, pageType])

  // Group blocks by category
  const groupedBlocks = useMemo(() => {
    const groups: Record<string, BlockDefinition[]> = {}

    filteredBlocks.forEach((block) => {
      const category = block.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(block)
    })

    return groups
  }, [filteredBlocks])

  const categoryLabels: Record<string, string> = {
    slot: 'Slot Blocks',
    general: 'General Blocks',
    common: 'Common',
    prelanding: 'Prelanding Blocks',
    white: 'White Blocks',
  }

  if (filteredBlocks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        No blocks found
      </div>
    )
  }

  return (
    <div className="p-3">
      {Object.entries(groupedBlocks).map(([category, blocks]) => (
        <div key={category} className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
            {categoryLabels[category] || category}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {blocks.map((block) => (
              <BlockItem key={block.type} definition={block} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
