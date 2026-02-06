'use client'

import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeModal } from '@/store/slices/uiSlice'
import { exportService } from '@/services/exportService'
import { downloadService } from '@/services/downloadService'
import type { Page } from '@/types/page'
import { X, Download, FileJson, FileCode, Check, FileType } from 'lucide-react'

interface ExportModalProps {
  page: Page | null
}

export const ExportModal: FC<ExportModalProps> = ({ page }) => {
  const dispatch = useAppDispatch()
  const { activeModal } = useAppSelector((state) => state.ui)
  const { blocks, pageSettings, pageMetadata } = useAppSelector(
    (state) => state.builder
  )
  const [format, setFormat] = useState<'json' | 'html' | 'php'>('html')
  const [includeStyles, setIncludeStyles] = useState(true)
  const [minify, setMinify] = useState(false)
  const [exported, setExported] = useState(false)

  if (activeModal !== 'export') return null

  const handleExport = async () => {
    // Create a pseudo page object from current state if no page exists
    const pageToExport: Page = page || {
      id: 'draft',
      userId: '',
      name: 'Untitled',
      slug: 'untitled-' + Date.now(),
      type: 'general',
      blocks,
      settings: pageSettings,
      metadata: pageMetadata,
      isPublished: false,
      publishedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (format === 'json') {
      exportService.downloadJSON(pageToExport)
    } else if (format === 'php') {
      exportService.downloadPHP(pageToExport)
    } else {
      exportService.downloadHTML(pageToExport, { includeStyles, minify })
    }

    // Track download (non-blocking)
    const fileName = `${pageToExport.slug}.${format}`
    downloadService.trackDownload(
      page?.id || null,
      format,
      fileName
    ).catch(() => {})

    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Export Page</h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormat('html')}
                className={`
                  flex flex-col items-center p-4 rounded-lg border-2 transition-colors
                  ${format === 'html'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <FileCode
                  size={24}
                  className={format === 'html' ? 'text-indigo-600' : 'text-gray-400'}
                />
                <span className="mt-2 font-medium text-sm">HTML</span>
                <span className="text-xs text-gray-500">Standalone</span>
              </button>

              <button
                onClick={() => setFormat('php')}
                className={`
                  flex flex-col items-center p-4 rounded-lg border-2 transition-colors
                  ${format === 'php'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <FileType
                  size={24}
                  className={format === 'php' ? 'text-indigo-600' : 'text-gray-400'}
                />
                <span className="mt-2 font-medium text-sm">PHP</span>
                <span className="text-xs text-gray-500">Server-side</span>
              </button>

              <button
                onClick={() => setFormat('json')}
                className={`
                  flex flex-col items-center p-4 rounded-lg border-2 transition-colors
                  ${format === 'json'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <FileJson
                  size={24}
                  className={format === 'json' ? 'text-indigo-600' : 'text-gray-400'}
                />
                <span className="mt-2 font-medium text-sm">JSON</span>
                <span className="text-xs text-gray-500">Data backup</span>
              </button>
            </div>
          </div>

          {/* HTML options */}
          {format === 'html' && (
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={includeStyles}
                  onChange={(e) => setIncludeStyles(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-700">Include CSS styles</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={minify}
                  onChange={(e) => setMinify(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-700">Minify output</span>
              </label>
            </div>
          )}

          {/* PHP info */}
          {format === 'php' && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              PHP export wraps your HTML in a PHP file. Test with: <code className="bg-blue-100 px-1 rounded">php -S localhost:8080</code>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            {exported ? (
              <>
                <Check size={16} />
                Exported!
              </>
            ) : (
              <>
                <Download size={16} />
                Download {format.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
