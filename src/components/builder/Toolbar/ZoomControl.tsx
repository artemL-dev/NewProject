'use client'

import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCanvasZoom, zoomIn, zoomOut, resetZoom } from '@/store/slices/uiSlice'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

export const ZoomControl: FC = () => {
  const dispatch = useAppDispatch()
  const canvasZoom = useAppSelector((state) => state.ui.canvasZoom)

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => dispatch(zoomOut())}
        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Zoom out"
        disabled={canvasZoom <= 25}
      >
        <ZoomOut size={18} />
      </button>

      <button
        onClick={() => dispatch(resetZoom())}
        className="min-w-[60px] text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1 transition-colors"
        title="Reset zoom"
      >
        {canvasZoom}%
      </button>

      <button
        onClick={() => dispatch(zoomIn())}
        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Zoom in"
        disabled={canvasZoom >= 200}
      >
        <ZoomIn size={18} />
      </button>
    </div>
  )
}
