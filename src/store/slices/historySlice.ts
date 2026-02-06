import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Block } from '@/types/blocks'
import type { PageSettings } from '@/types/page'

export interface HistoryEntry {
  blocks: Block[]
  settings: PageSettings
  timestamp: number
}

export interface HistoryState {
  past: HistoryEntry[]
  future: HistoryEntry[]
  maxHistorySize: number
}

const initialState: HistoryState = {
  past: [],
  future: [],
  maxHistorySize: 50,
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    pushHistory: (state, action: PayloadAction<HistoryEntry>) => {
      state.past.push(action.payload)
      // Limit history size
      if (state.past.length > state.maxHistorySize) {
        state.past.shift()
      }
      // Clear future on new action
      state.future = []
    },

    undo: (state) => {
      if (state.past.length === 0) return
      // Note: The actual state update happens in the builder slice
      // This just tracks history entries
    },

    redo: (state) => {
      if (state.future.length === 0) return
      // Note: The actual state update happens in the builder slice
      // This just tracks history entries
    },

    moveToFuture: (state, action: PayloadAction<HistoryEntry>) => {
      const lastPast = state.past.pop()
      if (lastPast) {
        state.future.unshift(action.payload)
      }
    },

    moveToPast: (state, action: PayloadAction<HistoryEntry>) => {
      const firstFuture = state.future.shift()
      if (firstFuture) {
        state.past.push(action.payload)
      }
    },

    popFromPast: (state) => {
      return {
        ...state,
        past: state.past.slice(0, -1),
      }
    },

    popFromFuture: (state) => {
      return {
        ...state,
        future: state.future.slice(1),
      }
    },

    clearHistory: (state) => {
      state.past = []
      state.future = []
    },

    setMaxHistorySize: (state, action: PayloadAction<number>) => {
      state.maxHistorySize = action.payload
      // Trim history if needed
      if (state.past.length > state.maxHistorySize) {
        state.past = state.past.slice(-state.maxHistorySize)
      }
    },
  },
})

export const {
  pushHistory,
  undo,
  redo,
  moveToFuture,
  moveToPast,
  popFromPast,
  popFromFuture,
  clearHistory,
  setMaxHistorySize,
} = historySlice.actions

export default historySlice.reducer

// Selectors
export const selectCanUndo = (state: { history: HistoryState }) =>
  state.history.past.length > 0

export const selectCanRedo = (state: { history: HistoryState }) =>
  state.history.future.length > 0

export const selectLastHistoryEntry = (state: { history: HistoryState }) =>
  state.history.past[state.history.past.length - 1] ?? null

export const selectNextHistoryEntry = (state: { history: HistoryState }) =>
  state.history.future[0] ?? null
