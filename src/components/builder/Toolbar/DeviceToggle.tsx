'use client'

import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setDevicePreview, DevicePreview } from '@/store/slices/uiSlice'
import { Smartphone, Tablet, Monitor } from 'lucide-react'

const devices: { value: DevicePreview; icon: typeof Smartphone; label: string }[] = [
  { value: 'mobile', icon: Smartphone, label: 'Mobile' },
  { value: 'tablet', icon: Tablet, label: 'Tablet' },
  { value: 'desktop', icon: Monitor, label: 'Desktop' },
]

export const DeviceToggle: FC = () => {
  const dispatch = useAppDispatch()
  const devicePreview = useAppSelector((state) => state.ui.devicePreview)

  return (
    <div className="flex items-center bg-gray-100 rounded-md p-1">
      {devices.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => dispatch(setDevicePreview(value))}
          className={`
            p-1.5 rounded transition-colors
            ${devicePreview === value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
          title={label}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  )
}
