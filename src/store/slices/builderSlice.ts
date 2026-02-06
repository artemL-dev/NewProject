import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Block, BlockType } from '@/types/blocks'
import type { Page, PageSettings, PageMetadata, PageType, defaultPageSettings, defaultPageMetadata } from '@/types/page'

export interface BuilderState {
  // Current page
  currentPage: Page | null
  pageType: PageType | null

  // Blocks
  blocks: Block[]
  selectedBlockId: string | null
  hoveredBlockId: string | null

  // Clipboard
  clipboard: Block | null

  // Settings
  pageSettings: PageSettings
  pageMetadata: PageMetadata

  // Status
  isDirty: boolean
  isSaving: boolean
  isPublishing: boolean
  lastSaved: string | null
  error: string | null
}

const defaultSettings: PageSettings = {
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'Inter, sans-serif',
  baseFontSize: 16,
  maxWidth: 480,
  padding: 16,
}

const defaultMetadata: PageMetadata = {
  title: 'New Page',
  description: '',
  language: 'en',
}

const initialState: BuilderState = {
  currentPage: null,
  pageType: null,
  blocks: [],
  selectedBlockId: null,
  hoveredBlockId: null,
  clipboard: null,
  pageSettings: defaultSettings,
  pageMetadata: defaultMetadata,
  isDirty: false,
  isSaving: false,
  isPublishing: false,
  lastSaved: null,
  error: null,
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    // Page actions
    setCurrentPage: (state, action: PayloadAction<Page | null>) => {
      state.currentPage = action.payload
      if (action.payload) {
        state.pageType = action.payload.type
        state.blocks = action.payload.blocks
        state.pageSettings = action.payload.settings
        state.pageMetadata = action.payload.metadata
      }
      state.isDirty = false
    },

    setPageType: (state, action: PayloadAction<PageType>) => {
      state.pageType = action.payload
    },

    // Block actions
    addBlock: (state, action: PayloadAction<{ block: Block; index?: number }>) => {
      const { block, index } = action.payload
      if (index !== undefined) {
        state.blocks.splice(index, 0, block)
      } else {
        state.blocks.push(block)
      }
      // Reorder blocks
      state.blocks = state.blocks.map((b, i) => ({ ...b, order: i }))
      state.isDirty = true
    },

    removeBlock: (state, action: PayloadAction<string>) => {
      state.blocks = state.blocks.filter(b => b.id !== action.payload)
      state.blocks = state.blocks.map((b, i) => ({ ...b, order: i }))
      if (state.selectedBlockId === action.payload) {
        state.selectedBlockId = null
      }
      state.isDirty = true
    },

    updateBlock: (state, action: PayloadAction<{ id: string; props: Partial<Block['props']> }>) => {
      const { id, props } = action.payload
      const block = state.blocks.find(b => b.id === id)
      if (block) {
        (block as any).props = { ...(block as any).props, ...props }
      }
      state.isDirty = true
    },

    moveBlock: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload
      const [removed] = state.blocks.splice(fromIndex, 1)
      state.blocks.splice(toIndex, 0, removed)
      state.blocks = state.blocks.map((b, i) => ({ ...b, order: i }))
      state.isDirty = true
    },

    reorderBlocks: (state, action: PayloadAction<string[]>) => {
      const orderedIds = action.payload
      state.blocks = orderedIds
        .map(id => state.blocks.find(b => b.id === id))
        .filter(Boolean) as Block[]
      state.blocks = state.blocks.map((b, i) => ({ ...b, order: i }))
      state.isDirty = true
    },

    duplicateBlock: (state, action: PayloadAction<string>) => {
      const blockIndex = state.blocks.findIndex(b => b.id === action.payload)
      if (blockIndex !== -1) {
        const block = state.blocks[blockIndex]
        const newBlock = {
          ...JSON.parse(JSON.stringify(block)),
          id: crypto.randomUUID(),
        }
        state.blocks.splice(blockIndex + 1, 0, newBlock)
        state.blocks = state.blocks.map((b, i) => ({ ...b, order: i }))
        state.selectedBlockId = newBlock.id
        state.isDirty = true
      }
    },

    // Selection
    selectBlock: (state, action: PayloadAction<string | null>) => {
      state.selectedBlockId = action.payload
    },

    hoverBlock: (state, action: PayloadAction<string | null>) => {
      state.hoveredBlockId = action.payload
    },

    // Clipboard
    copyBlock: (state, action: PayloadAction<string>) => {
      const block = state.blocks.find(b => b.id === action.payload)
      if (block) {
        state.clipboard = JSON.parse(JSON.stringify(block))
      }
    },

    cutBlock: (state, action: PayloadAction<string>) => {
      const block = state.blocks.find(b => b.id === action.payload)
      if (block) {
        state.clipboard = JSON.parse(JSON.stringify(block))
        state.blocks = state.blocks.filter(b => b.id !== action.payload)
        state.blocks = state.blocks.map((b, i) => ({ ...b, order: i }))
        if (state.selectedBlockId === action.payload) {
          state.selectedBlockId = null
        }
        state.isDirty = true
      }
    },

    pasteBlock: (state, action: PayloadAction<number | undefined>) => {
      if (state.clipboard) {
        const newBlock = {
          ...JSON.parse(JSON.stringify(state.clipboard)),
          id: crypto.randomUUID(),
        }
        const index = action.payload ?? state.blocks.length
        state.blocks.splice(index, 0, newBlock)
        state.blocks = state.blocks.map((b, i) => ({ ...b, order: i }))
        state.selectedBlockId = newBlock.id
        state.isDirty = true
      }
    },

    // Settings
    updatePageSettings: (state, action: PayloadAction<Partial<PageSettings>>) => {
      state.pageSettings = { ...state.pageSettings, ...action.payload }
      state.isDirty = true
    },

    updatePageMetadata: (state, action: PayloadAction<Partial<PageMetadata>>) => {
      state.pageMetadata = { ...state.pageMetadata, ...action.payload }
      state.isDirty = true
    },

    // Status
    setIsDirty: (state, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload
    },

    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload
    },

    setIsPublishing: (state, action: PayloadAction<boolean>) => {
      state.isPublishing = action.payload
    },

    setLastSaved: (state, action: PayloadAction<string | null>) => {
      state.lastSaved = action.payload
      state.isDirty = false
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    // Reset
    resetBuilder: () => initialState,

    // Initialize new page
    initNewPage: (state, action: PayloadAction<PageType>) => {
      state.currentPage = null
      state.pageType = action.payload
      state.blocks = []
      state.selectedBlockId = null
      state.hoveredBlockId = null
      state.clipboard = null
      state.pageSettings = defaultSettings
      state.pageMetadata = defaultMetadata
      state.isDirty = false
      state.error = null
    },
  },
})

export const {
  setCurrentPage,
  setPageType,
  addBlock,
  removeBlock,
  updateBlock,
  moveBlock,
  reorderBlocks,
  duplicateBlock,
  selectBlock,
  hoverBlock,
  copyBlock,
  cutBlock,
  pasteBlock,
  updatePageSettings,
  updatePageMetadata,
  setIsDirty,
  setIsSaving,
  setIsPublishing,
  setLastSaved,
  setError,
  resetBuilder,
  initNewPage,
} = builderSlice.actions

export default builderSlice.reducer
