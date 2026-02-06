'use client'

import { FC, useState } from 'react'
import type { Project } from '@/services/projectService'
import { Plus, X, FolderOpen } from 'lucide-react'

interface ProjectSelectorProps {
  projects: Project[]
  onCreateProject: (name: string, color: string) => void
  onDeleteProject: (id: string) => void
}

const presetColors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#22c55e', '#14b8a6', '#3b82f6']

export const ProjectSelector: FC<ProjectSelectorProps> = ({
  projects,
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
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FolderOpen size={16} className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">Projects</h3>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <Plus size={14} />
          New
        </button>
      </div>

      {/* Create form */}
      {isCreating && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg space-y-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Project name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <div className="flex gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setNewColor(color)}
                className={`w-6 h-6 rounded-full ${newColor === color ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
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
      {projects.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-2">No projects yet</p>
      ) : (
        <div className="space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50 group"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="text-sm text-gray-700">{project.name}</span>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Delete project "${project.name}"?`)) {
                    onDeleteProject(project.id)
                  }
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
