'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import type { Page } from '@/types/page'
import type { Project } from '@/services/projectService'
import {
  MoreHorizontal,
  Trash2,
  Copy,
  ExternalLink,
  Edit3,
  Gamepad2,
  Layout,
  FileText,
  Newspaper,
  FolderOpen,
  ChevronRight,
} from 'lucide-react'

interface PageCardProps {
  page: Page
  project?: Project | null
  projects?: Project[]
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  onMoveToProject?: (pageId: string, projectId: string | null) => void
}

const typeConfig: Record<string, { icon: typeof Gamepad2; label: string; gradient: string }> = {
  slot: { icon: Gamepad2, label: 'Slot', gradient: 'from-purple-500 to-indigo-600' },
  prelanding: { icon: Newspaper, label: 'Prelanding', gradient: 'from-orange-500 to-red-600' },
  white: { icon: FileText, label: 'White', gradient: 'from-sky-500 to-blue-600' },
  general: { icon: Layout, label: 'General', gradient: 'from-emerald-500 to-teal-600' },
}

export const PageCard: FC<PageCardProps> = ({ page, project, projects = [], onDelete, onDuplicate, onMoveToProject }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectSubmenu, setProjectSubmenu] = useState(false)
  const config = typeConfig[page.type] || typeConfig.general
  const Icon = config.icon

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Preview */}
      <div className={`h-36 bg-gradient-to-br ${config.gradient} relative flex items-center justify-center`}>
        <Icon size={40} className="text-white/60" />

        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            page.isPublished
              ? 'bg-green-100 text-green-700'
              : 'bg-white/90 text-gray-600'
          }`}
        >
          {page.isPublished ? 'Published' : 'Draft'}
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 rounded-full text-xs font-medium text-white">
          {config.label}
        </div>

        {/* Project badge */}
        {project && (
          <div
            className="absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: project.color }}
          >
            {project.name}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{page.name}</h3>
            <p className="text-xs text-gray-400 mt-1">
              Updated {new Date(page.updatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Actions menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                  <Link
                    href={`/builder/${page.id}`}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit3 size={14} />
                    Edit
                  </Link>
                  <Link
                    href={`/preview/${page.id}`}
                    target="_blank"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    Preview
                  </Link>
                  <button
                    onClick={() => {
                      onDuplicate(page.id)
                      setMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Copy size={14} />
                    Duplicate
                  </button>
                  {/* Move to Project */}
                  {onMoveToProject && (
                    <div
                      className="relative"
                      onMouseEnter={() => setProjectSubmenu(true)}
                      onMouseLeave={() => setProjectSubmenu(false)}
                    >
                      <button
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <FolderOpen size={14} />
                          Project
                        </span>
                        <ChevronRight size={12} />
                      </button>

                      {projectSubmenu && (
                        <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-30">
                          <button
                            onClick={() => {
                              onMoveToProject(page.id, null)
                              setMenuOpen(false)
                              setProjectSubmenu(false)
                            }}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                              !page.projectId ? 'text-indigo-600 font-medium' : 'text-gray-500'
                            }`}
                          >
                            No Project
                          </button>
                          {projects.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                onMoveToProject(page.id, p.id)
                                setMenuOpen(false)
                                setProjectSubmenu(false)
                              }}
                              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                                page.projectId === p.id ? 'text-indigo-600 font-medium' : 'text-gray-700'
                              }`}
                            >
                              <div
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: p.color }}
                              />
                              <span className="truncate">{p.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this page?')) {
                        onDelete(page.id)
                      }
                      setMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 mt-3">
          <Link
            href={`/builder/${page.id}`}
            className="flex-1 py-2 text-center text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
          >
            Edit
          </Link>
          <Link
            href={`/preview/${page.id}`}
            target="_blank"
            className="flex-1 py-2 text-center text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  )
}
