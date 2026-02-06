'use client'

import { FC, useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { PageType } from '@/types/page'
import { useTemplates } from '@/hooks/useTemplates'
import { TemplateCard } from './TemplateCard'

const filterTabs: { label: string; value: PageType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Slot', value: 'slot' },
  { label: 'Prelanding', value: 'prelanding' },
  { label: 'White', value: 'white' },
  { label: 'General', value: 'general' },
]

export const TemplateGallery: FC = () => {
  const [activeFilter, setActiveFilter] = useState<PageType | 'all'>('all')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [pageName, setPageName] = useState('')
  const [creating, setCreating] = useState(false)

  const { templates, createPageFromTemplate } = useTemplates(activeFilter)

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
    const template = templates.find((t) => t.id === templateId)
    setPageName(template?.name || 'New Page')
  }

  const handleCreate = async () => {
    if (!selectedTemplateId || !pageName.trim()) return
    try {
      setCreating(true)
      await createPageFromTemplate(selectedTemplateId, pageName.trim())
    } catch (err) {
      console.error('Failed to create page from template:', err)
    } finally {
      setCreating(false)
    }
  }

  const handleCancelName = () => {
    setSelectedTemplateId(null)
    setPageName('')
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === tab.value
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {templates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No templates found for this category
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={handleUseTemplate}
            />
          ))}
        </div>
      )}

      {/* Name input dialog overlay */}
      {selectedTemplateId && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleCancelName}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Name Your Page</h3>
            <p className="text-sm text-gray-500 mb-4">
              Enter a name for the new page created from this template
            </p>
            <input
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Page name"
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCancelName}
                className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!pageName.trim() || creating}
                className="flex-1 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creating && <Loader2 size={14} className="animate-spin" />}
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
