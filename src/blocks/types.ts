import type { FC } from 'react'
import type { Block, BlockType, BlockDefinition } from '@/types/blocks'

// Props passed to block components in render mode
export interface BlockRenderProps<T extends Block = Block> {
  block: T
  isSelected?: boolean
  isHovered?: boolean
  isEditing?: boolean
}

// Props passed to block components in editor mode
export interface BlockEditorProps<T extends Block = Block> {
  block: T
  onChange: (props: Partial<T['props']>) => void
}

// Block component type
export type BlockComponent<T extends Block = Block> = FC<BlockRenderProps<T>>

// Block editor component type
export type BlockEditorComponent<T extends Block = Block> = FC<BlockEditorProps<T>>

// Registry entry for a block
export interface BlockRegistryEntry {
  definition: BlockDefinition
  component: BlockComponent<any>
  editor: BlockEditorComponent<any>
  defaultBlock: () => Block
}

// Block category
export type BlockCategory = 'slot' | 'general' | 'common' | 'prelanding' | 'white'

// Device size configuration
export interface DeviceSize {
  width: number
  height: number
  label: string
}

export const deviceSizes: Record<string, DeviceSize> = {
  mobile: { width: 375, height: 812, label: 'Mobile' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  desktop: { width: 1280, height: 800, label: 'Desktop' },
}
