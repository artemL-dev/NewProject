'use client'

import { FC, useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeModal } from '@/store/slices/uiSlice'
import { assetService, Asset } from '@/services/assetService'
import { X, Upload, Trash2, Image as ImageIcon, Loader2, Check } from 'lucide-react'

interface AssetManagerProps {
  pageId?: string
  onSelect?: (url: string) => void
}

export const AssetManager: FC<AssetManagerProps> = ({ pageId, onSelect }) => {
  const dispatch = useAppDispatch()
  const { activeModal } = useAppSelector((state) => state.ui)
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  useEffect(() => {
    if (activeModal === 'assetManager' && pageId) {
      loadAssets()
    }
  }, [activeModal, pageId])

  const loadAssets = async () => {
    if (!pageId) return
    try {
      setLoading(true)
      const data = await assetService.getAssets(pageId)
      setAssets(data)
    } catch (err) {
      console.error('Failed to load assets:', err)
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!pageId) return

      setUploading(true)
      try {
        for (const file of acceptedFiles) {
          const asset = await assetService.uploadAsset({
            file,
            pageId,
          })
          setAssets((prev) => [asset, ...prev])
        }
      } catch (err) {
        console.error('Upload failed:', err)
      } finally {
        setUploading(false)
      }
    },
    [pageId]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
    },
  })

  const handleDelete = async (id: string) => {
    try {
      await assetService.deleteAsset(id)
      setAssets((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleSelect = () => {
    if (selectedAsset && onSelect) {
      const asset = assets.find((a) => a.id === selectedAsset)
      if (asset) {
        onSelect(asset.url)
        dispatch(closeModal())
      }
    }
  }

  const handleClose = () => {
    dispatch(closeModal())
  }

  if (activeModal !== 'assetManager') return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Asset Manager</h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Upload zone */}
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-6
              ${isDragActive
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 size={32} className="animate-spin text-indigo-600 mb-2" />
                <span className="text-sm text-gray-600">Uploading...</span>
              </div>
            ) : (
              <>
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop files here'
                    : 'Drag & drop files or click to upload'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supports PNG, JPG, GIF, WebP, SVG
                </p>
              </>
            )}
          </div>

          {/* Asset grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="animate-spin text-indigo-600" />
            </div>
          ) : assets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No assets uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className={`
                    relative group rounded-lg overflow-hidden border-2 cursor-pointer
                    ${selectedAsset === asset.id
                      ? 'border-indigo-500'
                      : 'border-transparent hover:border-gray-300'
                    }
                  `}
                  onClick={() => setSelectedAsset(asset.id)}
                >
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-24 object-cover"
                  />

                  {/* Selection indicator */}
                  {selectedAsset === asset.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(asset.id)
                    }}
                    className="absolute top-2 left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>

                  {/* File name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                    {asset.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {onSelect && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              disabled={!selectedAsset}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select
            </button>
          </div>
        )}
      </div>
    </>
  )
}
