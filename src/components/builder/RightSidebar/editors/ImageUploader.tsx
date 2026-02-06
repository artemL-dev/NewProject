'use client'

import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  label: string
  value: string
  onChange: (value: string) => void
  onUpload?: (file: File) => Promise<string>
}

export const ImageUploader: FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  onUpload,
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      if (onUpload) {
        try {
          const url = await onUpload(file)
          onChange(url)
        } catch (err) {
          console.error('Upload failed:', err)
        }
      } else {
        // Fallback to data URL for local preview
        const reader = new FileReader()
        reader.onload = () => {
          onChange(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onChange, onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
    },
    maxFiles: 1,
  })

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-32 object-cover rounded-md border border-gray-200"
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          <input {...getInputProps()} />
          <ImageIcon size={24} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            {isDragActive ? 'Drop image here' : 'Click or drag to upload'}
          </p>
        </div>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste URL..."
        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
      />
    </div>
  )
}
