'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getBlockComponent } from '@/blocks/registry'
import type { Page } from '@/types/page'
import type { Block } from '@/types/blocks'
import { Loader2 } from 'lucide-react'

export default function PreviewPage() {
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-indigo-600" />
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: page.settings.backgroundColor,
        fontFamily: page.settings.fontFamily,
        maxWidth: page.settings.maxWidth,
        margin: '0 auto',
      }}
    >
      {page.blocks.map((block: Block) => {
        const BlockComponent = getBlockComponent(block.type)
        if (!BlockComponent) return null
        return <BlockComponent key={block.id} block={block} />
      })}
    </div>
  )
}
