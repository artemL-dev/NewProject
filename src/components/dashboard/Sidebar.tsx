'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { Plus, Layers, X } from 'lucide-react'
import type { Project } from '@/services/projectService'

interface SidebarProps {
  projects: Project[]
  activeProjectId: string | null
  onSelectProject: (projectId: string | null) => void
  onCreateProject: (name: string, color: string) => void
  onDeleteProject: (id: string) => void
}

const presetColors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#22c55e', '#14b8a6', '#3b82f6']

export const Sidebar: FC<SidebarProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState('#6366f1')

  const handleCreate = () => {
    if (!newName.trim()) return
    onCreateProject(newName.trim(), newColor)
    setNewName('')
    setNewColor('#6366f1')
    setIsCreating(false)
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Layers size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Landify</span>
        </Link>
      </div>

      {/* Spaces (Projects) */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Spaces</span>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="p-1 text-gray-400 hover:text-indigo-600 rounded transition-colors"
              title="Create space"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* "All" option */}
          <button
            onClick={() => onSelectProject(null)}
            className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors w-full mb-0.5 ${
              activeProjectId === null
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            All Pages
          </button>

          {/* Create form */}
          {isCreating && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg space-y-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Space name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                autoFocus
              />
              <div className="flex gap-1">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewColor(color)}
                    className={`w-6 h-6 rounded-full transition-all ${newColor === color ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  className="flex-1 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Project list */}
          <div className="space-y-0.5">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`group flex items-center justify-between rounded-lg transition-colors ${
                  activeProjectId === project.id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => onSelectProject(project.id)}
                  className="flex items-center gap-2.5 px-3 py-2 flex-1 min-w-0 text-left"
                >
                  <div
                    className="w-4 h-4 rounded flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className={`text-sm truncate ${
                    activeProjectId === project.id
                      ? 'font-semibold text-gray-900'
                      : 'text-gray-700'
                  }`}>
                    {project.name}
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm(`Delete "${project.name}" and unlink all its pages?`)) {
                      onDeleteProject(project.id)
                      if (activeProjectId === project.id) {
                        onSelectProject(null)
                      }
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 text-gray-400 hover:text-red-500 rounded transition-all"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>

          {projects.length === 0 && !isCreating && (
            <p className="text-xs text-gray-400 text-center py-4 px-2">
              Create a space to organize pages
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
