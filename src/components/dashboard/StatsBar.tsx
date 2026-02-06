'use client'

import { FC } from 'react'
import { FileText, Sparkles, Download } from 'lucide-react'

interface StatsBarProps {
  totalPages: number
  totalGenerations: number
  totalDownloads: number
  loading?: boolean
}

export const StatsBar: FC<StatsBarProps> = ({
  totalPages,
  totalGenerations,
  totalDownloads,
  loading,
}) => {
  const stats = [
    { label: 'Pages', value: totalPages, icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Generations', value: totalGenerations, icon: Sparkles, color: 'text-purple-600 bg-purple-50' },
    { label: 'Downloads', value: totalDownloads, icon: Download, color: 'text-emerald-600 bg-emerald-50' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
              <Icon size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
