'use client'

import { FC } from 'react'
import { DeviceToggle } from './DeviceToggle'
import { ZoomControl } from './ZoomControl'
import { UndoRedo } from './UndoRedo'
import { SaveExport } from './SaveExport'
import { useAppSelector } from '@/store/hooks'
import { Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ToolbarProps {
  pageId?: string
  pageName?: string
}

export const Toolbar: FC<ToolbarProps> = ({ pageId, pageName = 'Untitled' }) => {
  const { isDirty, isSaving, lastSaved } = useAppSelector((state) => state.builder)
  const { previewMode } = useAppSelector((state) => state.ui)

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </Link>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{pageName}</span>
          {isDirty && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Unsaved
            </span>
          )}
        </div>
      </div>

      {/* Center section */}
      <div className="flex items-center gap-2">
        <UndoRedo />
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <DeviceToggle />
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <ZoomControl />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {lastSaved && !isDirty && (
          <span className="text-xs text-gray-500">
            Saved {new Date(lastSaved).toLocaleTimeString()}
          </span>
        )}

        {pageId && (
          <Link
            href={`/preview/${pageId}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Eye size={16} />
            Preview
          </Link>
        )}

        <SaveExport pageId={pageId} />
      </div>
    </div>
  )
}
