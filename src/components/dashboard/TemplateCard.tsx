'use client'

import { FC } from 'react'
import { Gamepad2, Layout, FileText, Newspaper } from 'lucide-react'
import type { UnifiedTemplate } from '@/hooks/useTemplates'

interface TemplateCardProps {
  template: UnifiedTemplate
  onUse: (templateId: string) => void
}

const typeConfig: Record<string, { icon: typeof Gamepad2; label: string; gradient: string }> = {
  slot: { icon: Gamepad2, label: 'Slot', gradient: 'from-purple-500 to-indigo-600' },
  prelanding: { icon: Newspaper, label: 'Prelanding', gradient: 'from-orange-500 to-red-600' },
  white: { icon: FileText, label: 'White', gradient: 'from-sky-500 to-blue-600' },
  general: { icon: Layout, label: 'General', gradient: 'from-emerald-500 to-teal-600' },
}

export const TemplateCard: FC<TemplateCardProps> = ({ template, onUse }) => {
  const config = typeConfig[template.type] || typeConfig.general
  const Icon = config.icon

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Header */}
      <div className={`h-32 bg-gradient-to-br ${config.gradient} relative flex items-center justify-center`}>
        <span className="text-5xl">{template.thumbnail}</span>

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 rounded-full text-xs font-medium text-white">
          {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{template.description}</p>

        <button
          onClick={() => onUse(template.id)}
          className="mt-3 w-full py-2 text-center text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
        >
          Use Template
        </button>
      </div>
    </div>
  )
}
