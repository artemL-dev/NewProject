import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DevicePreview = 'mobile' | 'tablet' | 'desktop'

export type ModalType =
  | 'export'
  | 'template'
  | 'assetManager'
  | 'pageSettings'
  | 'deleteConfirm'
  | null

export interface UIState {
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  leftSidebarWidth: number
  rightSidebarWidth: number
  devicePreview: DevicePreview
  canvasZoom: number
  isDragging: boolean
  dragSource: 'library' | 'canvas' | null
  activeModal: ModalType
  blockFilter: string
  blockCategoryFilter: 'all' | 'slot' | 'general' | 'common' | 'prelanding' | 'white'
  showGrid: boolean
  snapToGrid: boolean
  previewMode: boolean
}

const initialState: UIState = {
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  leftSidebarWidth: 280,
  rightSidebarWidth: 320,
  devicePreview: 'mobile',
  canvasZoom: 100,
  isDragging: false,
  dragSource: null,
  activeModal: null,
  blockFilter: '',
  blockCategoryFilter: 'all',
  showGrid: false,
  snapToGrid: true,
  previewMode: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebars
    toggleLeftSidebar: (state) => {
      state.leftSidebarOpen = !state.leftSidebarOpen
    },

    toggleRightSidebar: (state) => {
      state.rightSidebarOpen = !state.rightSidebarOpen
    },

    setLeftSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.leftSidebarOpen = action.payload
    },

    setRightSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.rightSidebarOpen = action.payload
    },

    setLeftSidebarWidth: (state, action: PayloadAction<number>) => {
      state.leftSidebarWidth = Math.max(200, Math.min(400, action.payload))
    },

    setRightSidebarWidth: (state, action: PayloadAction<number>) => {
      state.rightSidebarWidth = Math.max(250, Math.min(450, action.payload))
    },

    // Device preview
    setDevicePreview: (state, action: PayloadAction<DevicePreview>) => {
      state.devicePreview = action.payload
    },

    // Zoom
    setCanvasZoom: (state, action: PayloadAction<number>) => {
      state.canvasZoom = Math.max(25, Math.min(200, action.payload))
    },

    zoomIn: (state) => {
      state.canvasZoom = Math.min(200, state.canvasZoom + 10)
    },

    zoomOut: (state) => {
      state.canvasZoom = Math.max(25, state.canvasZoom - 10)
    },

    resetZoom: (state) => {
      state.canvasZoom = 100
    },

    // Dragging
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload
    },

    setDragSource: (state, action: PayloadAction<'library' | 'canvas' | null>) => {
      state.dragSource = action.payload
    },

    // Modals
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.activeModal = action.payload
    },

    closeModal: (state) => {
      state.activeModal = null
    },

    // Block filtering
    setBlockFilter: (state, action: PayloadAction<string>) => {
      state.blockFilter = action.payload
    },

    setBlockCategoryFilter: (state, action: PayloadAction<UIState['blockCategoryFilter']>) => {
      state.blockCategoryFilter = action.payload
    },

    // Grid
    toggleGrid: (state) => {
      state.showGrid = !state.showGrid
    },

    setShowGrid: (state, action: PayloadAction<boolean>) => {
      state.showGrid = action.payload
    },

    toggleSnapToGrid: (state) => {
      state.snapToGrid = !state.snapToGrid
    },

    setSnapToGrid: (state, action: PayloadAction<boolean>) => {
      state.snapToGrid = action.payload
    },

    // Preview mode
    togglePreviewMode: (state) => {
      state.previewMode = !state.previewMode
      if (state.previewMode) {
        state.leftSidebarOpen = false
        state.rightSidebarOpen = false
      } else {
        state.leftSidebarOpen = true
        state.rightSidebarOpen = true
      }
    },

    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.previewMode = action.payload
      if (action.payload) {
        state.leftSidebarOpen = false
        state.rightSidebarOpen = false
      } else {
        state.leftSidebarOpen = true
        state.rightSidebarOpen = true
      }
    },

    // Reset UI
    resetUI: () => initialState,
  },
})

export const {
  toggleLeftSidebar,
  toggleRightSidebar,
  setLeftSidebarOpen,
  setRightSidebarOpen,
  setLeftSidebarWidth,
  setRightSidebarWidth,
  setDevicePreview,
  setCanvasZoom,
  zoomIn,
  zoomOut,
  resetZoom,
  setIsDragging,
  setDragSource,
  openModal,
  closeModal,
  setBlockFilter,
  setBlockCategoryFilter,
  toggleGrid,
  setShowGrid,
  toggleSnapToGrid,
  setSnapToGrid,
  togglePreviewMode,
  setPreviewMode,
  resetUI,
} = uiSlice.actions

export default uiSlice.reducer
