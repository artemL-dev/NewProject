import type { Block, BlockType } from '@/types/blocks'
import { createBlock } from '@/blocks/registry'
import { generateId } from './idGenerator'

export function cloneBlock(block: Block): Block {
  return {
    ...JSON.parse(JSON.stringify(block)),
    id: generateId(),
  }
}

export function reorderBlocks(blocks: Block[], fromIndex: number, toIndex: number): Block[] {
  const result = [...blocks]
  const [removed] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, removed)
  return result.map((block, index) => ({ ...block, order: index }))
}

export function insertBlock(blocks: Block[], block: Block, index: number): Block[] {
  const result = [...blocks]
  result.splice(index, 0, block)
  return result.map((b, i) => ({ ...b, order: i }))
}

export function removeBlockById(blocks: Block[], id: string): Block[] {
  return blocks
    .filter((b) => b.id !== id)
    .map((b, i) => ({ ...b, order: i }))
}

export function updateBlockById(
  blocks: Block[],
  id: string,
  updates: Partial<Block['props']>
): Block[] {
  return blocks.map((block) =>
    block.id === id
      ? { ...block, props: { ...(block as any).props, ...updates } }
      : block
  )
}

export function findBlockById(blocks: Block[], id: string): Block | undefined {
  return blocks.find((b) => b.id === id)
}

export function getBlockIndex(blocks: Block[], id: string): number {
  return blocks.findIndex((b) => b.id === id)
}

export function moveBlockUp(blocks: Block[], id: string): Block[] {
  const index = getBlockIndex(blocks, id)
  if (index <= 0) return blocks
  return reorderBlocks(blocks, index, index - 1)
}

export function moveBlockDown(blocks: Block[], id: string): Block[] {
  const index = getBlockIndex(blocks, id)
  if (index === -1 || index >= blocks.length - 1) return blocks
  return reorderBlocks(blocks, index, index + 1)
}

export function createDefaultBlock(type: BlockType): Block | undefined {
  return createBlock(type)
}
