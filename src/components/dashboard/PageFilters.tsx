'use client'

import { FC } from 'react'
import { Search } from 'lucide-react'
import type { PageType } from '@/types/page'
import type { Project } from '@/services/projectService'

interface PageFiltersProps {
  activeType: PageType | 'all'
  onTypeChange: (type: PageType | 'all') => void
  searchQuery: string
  onSearchChange: (query: string) => void
  projects: Project[]
  selectedProjectId: string | null
  onProjectChange: (projectId: string | null) => void
}

const typeFilters: { value: PageType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'white', label: 'Whites' },
  { value: 'prelanding', label: 'Prelandings' },
  { value: 'slot', label: 'Slots' },
  { value: 'general', label: 'General' },
]

export const PageFilters: FC<PageFiltersProps> = ({
  activeType,
  onTypeChange,
  searchQuery,
  onSearchChange,
  projects,
  selectedProjectId,
  onProjectChange,
}) => {
  return (
    <div className="space-y-3">
      {/* Type tabs */}
      <div className="flex gap-1">
        {typeFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onTypeChange(filter.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeType === filter.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search and project filter */}
      <div className="flex gap-3">
        {/* Project select */}
        <select
          value={selectedProjectId || ''}
          onChange={(e) => onProjectChange(e.target.value || null)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}
