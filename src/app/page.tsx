'use client'

import { useState, useMemo } from 'react'
import { usePages } from '@/hooks/usePage'
import { useUser } from '@/hooks/useSupabase'
import { useProjects } from '@/hooks/useProjects'
import { useStats } from '@/hooks/useStats'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Plus, Layout, Loader2 } from 'lucide-react'
import type { PageType } from '@/types/page'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { StatsBar } from '@/components/dashboard/StatsBar'
import { PageFilters } from '@/components/dashboard/PageFilters'
import { PageCard } from '@/components/dashboard/PageCard'
import { CreatePageModal } from '@/components/dashboard/CreatePageModal'
import { TemplateGalleryModal } from '@/components/dashboard/TemplateGalleryModal'

export default function Dashboard() {
  const router = useRouter()
  const { user, loading: userLoading } = useUser()
  const supabase = createClient()

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)

  // Filters state
  const [activeType, setActiveType] = useState<PageType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  // Data hooks
  const { pages, loading, deletePage, duplicatePage, updatePageProject } = usePages({
    type: activeType,
    projectId: selectedProjectId,
    search: searchQuery,
  })
  const { projects, createProject, deleteProject } = useProjects()
  const { stats, loading: statsLoading } = useStats()

  // Create project map for cards
  const projectMap = useMemo(() => {
    const map: Record<string, typeof projects[0]> = {}
    projects.forEach((p) => { map[p.id] = p })
    return map
  }, [projects])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const handleCreateProject = async (name: string, color: string) => {
    try {
      await createProject({ name, color })
    } catch (err) {
      console.error('Failed to create project:', err)
    }
  }

  // Auth check
  if (!userLoading && !user) {
    router.push('/auth/login')
    return null
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={32} className="animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        email={user?.email || ''}
        projects={projects}
        activeProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onLogout={handleLogout}
        onCreateNew={() => setShowCreateModal(true)}
        onOpenTemplates={() => setShowTemplateGallery(true)}
        onCreateProject={handleCreateProject}
        onDeleteProject={deleteProject}
      />

      <main className="flex-1 min-w-0 px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-6">
          <StatsBar
            totalPages={stats.totalPages}
            totalGenerations={stats.totalGenerations}
            totalDownloads={stats.totalDownloads}
            loading={statsLoading}
          />
        </div>

        {/* Header + Create button */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProjectId
                ? projects.find((p) => p.id === selectedProjectId)?.name || 'Space'
                : 'All Pages'
              }
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {selectedProjectId ? 'Pages in this space' : 'Create and manage your landing pages'}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Create New
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <PageFilters
            activeType={activeType}
            onTypeChange={setActiveType}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Pages grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Layout size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || activeType !== 'all' || selectedProjectId
                ? 'No pages match your filters'
                : 'No pages yet'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || activeType !== 'all' || selectedProjectId
                ? 'Try adjusting your search or filters'
                : 'Create your first landing page to get started'
              }
            </p>
            {!searchQuery && activeType === 'all' && !selectedProjectId && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus size={18} />
                Create Page
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pages.map((page) => (
              <PageCard
                key={page.id}
                page={page}
                project={page.projectId ? projectMap[page.projectId] : null}
                projects={projects}
                onDelete={deletePage}
                onDuplicate={duplicatePage}
                onMoveToProject={updatePageProject}
              />
            ))}
          </div>
        )}
      </main>

      <CreatePageModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onOpenTemplates={() => setShowTemplateGallery(true)}
        projectId={selectedProjectId}
      />
      <TemplateGalleryModal
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
      />
    </div>
  )
}
