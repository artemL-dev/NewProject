import { configureStore } from '@reduxjs/toolkit'
import builderReducer from './slices/builderSlice'
import historyReducer from './slices/historySlice'
import uiReducer from './slices/uiSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      builder: builderReducer,
      history: historyReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['builder/setCurrentPage'],
        },
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
