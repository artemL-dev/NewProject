'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Builder } from '@/components/builder/Builder'
import { createClient } from '@/lib/supabase/client'
import type { Page } from '@/types/page'
import { Loader2 } from 'lucide-react'

export default function EditBuilderPage() {
  const params = useParams()
  const pageId = params.pageId as string
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPage = async () => {
      const supabase = createClient()

      const { data, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }

      if (!data) {
        setError('Page not found')
        setLoading(false)
        return
      }

      // Cast data to any to access properties
      const record = data as any

      // Transform database record to Page type
      const pageData: Page = {
        id: record.id,
        userId: record.user_id,
        name: record.name,
        slug: record.slug,
        type: record.type,
        blocks: record.blocks,
        settings: record.settings,
        metadata: record.metadata,
        isPublished: record.is_published,
        publishedAt: record.published_at,
        projectId: record.project_id || null,
        createdAt: record.created_at,
        updatedAt: record.updated_at,
      }

      setPage(pageData)
      setLoading(false)
    }

    loadPage()
  }, [pageId])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-600">{error || 'The page you are looking for does not exist.'}</p>
        </div>
      </div>
    )
  }

  return <Builder page={page} />
}
