'use client'

import { FC, ReactNode } from 'react'
import { deviceSizes } from '@/blocks/types'
import type { DevicePreview } from '@/store/slices/uiSlice'

interface PhoneFrameProps {
  device: DevicePreview
  children: ReactNode
}

export const PhoneFrame: FC<PhoneFrameProps> = ({ device, children }) => {
  const size = deviceSizes[device]

  if (device === 'desktop') {
    return (
      <div
        className="bg-white shadow-xl rounded-lg overflow-hidden"
        style={{
          width: size.width,
          minHeight: size.height,
        }}
      >
        {/* Browser chrome */}
        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 text-center">
              preview.example.com
            </div>
          </div>
        </div>
        <div className="overflow-auto" style={{ maxHeight: size.height - 32 }}>
          {children}
        </div>
      </div>
    )
  }

  if (device === 'tablet') {
    return (
      <div
        className="bg-gray-800 rounded-[32px] p-4 shadow-2xl"
        style={{ width: size.width + 32 }}
      >
        <div
          className="bg-white rounded-[20px] overflow-hidden"
          style={{
            width: size.width,
            minHeight: size.height,
          }}
        >
          {/* Status bar */}
          <div className="h-6 bg-gray-100 flex items-center justify-between px-4 text-[10px] text-gray-600">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>100%</span>
              <div className="w-6 h-3 border border-gray-400 rounded-sm relative">
                <div className="absolute inset-0.5 bg-green-500 rounded-sm" />
              </div>
            </div>
          </div>
          <div className="overflow-auto" style={{ maxHeight: size.height - 24 }}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Mobile (default)
  return (
    <div
      className="bg-gray-900 rounded-[40px] p-3 shadow-2xl relative"
      style={{ width: size.width + 24 }}
    >
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-10" />

      <div
        className="bg-white rounded-[32px] overflow-hidden relative"
        style={{
          width: size.width,
          minHeight: size.height,
        }}
      >
        {/* Status bar */}
        <div className="h-11 bg-white flex items-end justify-between px-6 pb-1 text-xs font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 20.5c4.14 0 7.5-3.36 7.5-7.5S16.14 5.5 12 5.5 4.5 8.86 4.5 13s3.36 7.5 7.5 7.5z" />
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 9h3v12H2zm7-4h3v16H9zm7-4h3v20h-3z" />
            </svg>
            <div className="w-6 h-3 border border-gray-800 rounded-sm relative ml-1">
              <div className="absolute inset-0.5 bg-gray-800 rounded-sm" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto" style={{ maxHeight: size.height - 78 }}>
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full" />
      </div>
    </div>
  )
}
