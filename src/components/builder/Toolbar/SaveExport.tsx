'use client'

import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setIsSaving, setLastSaved, setError, setIsPublishing } from '@/store/slices/builderSlice'
import { openModal } from '@/store/slices/uiSlice'
import { Save, Upload, Download, MoreHorizontal, Loader2 } from 'lucide-react'

interface SaveExportProps {
  pageId?: string
}

export const SaveExport: FC<SaveExportProps> = ({ pageId }) => {
  const dispatch = useAppDispatch()
  const { isSaving, isPublishing, isDirty, blocks, pageSettings, pageMetadata } = useAppSelector(
    (state) => state.builder
  )
  const [showMenu, setShowMenu] = useState(false)

  const handleSave = async () => {
    if (!isDirty) return
    dispatch(setIsSaving(true))

    try {
      // This would call the pageService to save
      // For now, we simulate a save
      await new Promise((resolve) => setTimeout(resolve, 500))
      dispatch(setLastSaved(new Date().toISOString()))
    } catch (err: any) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setIsSaving(false))
    }
  }

  const handlePublish = async () => {
    dispatch(setIsPublishing(true))

    try {
      // This would call the pageService to publish
      await new Promise((resolve) => setTimeout(resolve, 1000))
      dispatch(setLastSaved(new Date().toISOString()))
    } catch (err: any) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setIsPublishing(false))
    }
  }

  const handleExport = () => {
    dispatch(openModal('export'))
    setShowMenu(false)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSave}
        disabled={isSaving || !isDirty}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors
          ${isDirty
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {isSaving ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Save size={16} />
        )}
        Save
      </button>

      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {isPublishing ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Upload size={16} />
        )}
        Publish
      </button>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
        >
          <MoreHorizontal size={18} />
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
              <button
                onClick={handleExport}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
