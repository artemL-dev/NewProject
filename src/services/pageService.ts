import { createClient } from '@/lib/supabase/client'
import type { Page, PageSettings, PageMetadata, PageType } from '@/types/page'
import type { Block } from '@/types/blocks'

export interface CreatePageInput {
  name: string
  type: PageType
  blocks?: Block[]
  settings?: Partial<PageSettings>
  metadata?: Partial<PageMetadata>
  projectId?: string | null
}

export interface UpdatePageInput {
  name?: string
  blocks?: Block[]
  settings?: Partial<PageSettings>
  metadata?: Partial<PageMetadata>
  isPublished?: boolean
  projectId?: string | null
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') +
    '-' +
    Date.now().toString(36)
}

const defaultSettings: PageSettings = {
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'Inter, sans-serif',
  baseFontSize: 16,
  maxWidth: 480,
  padding: 16,
}

const defaultMetadata: PageMetadata = {
  title: 'New Page',
  description: '',
  language: 'en',
}

function transformDbToPage(record: any): Page {
  return {
    id: record.id,
    userId: record.user_id,
    name: record.name,
    slug: record.slug,
    type: record.type,
    blocks: record.blocks as Block[],
    settings: record.settings as PageSettings,
    metadata: record.metadata as PageMetadata,
    isPublished: record.is_published,
    publishedAt: record.published_at,
    projectId: record.project_id || null,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  }
}

export const pageService = {
  async getPages(): Promise<Page[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error

    return (data || []).map(transformDbToPage)
  },

  async getPage(id: string): Promise<Page | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data ? transformDbToPage(data) : null
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data ? transformDbToPage(data) : null
  },

  async createPage(input: CreatePageInput): Promise<Page> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('Not authenticated')

    const insertData = {
      user_id: userData.user.id,
      name: input.name,
      slug: generateSlug(input.name),
      type: input.type,
      blocks: input.blocks || [],
      settings: { ...defaultSettings, ...input.settings },
      metadata: { ...defaultMetadata, title: input.name, ...input.metadata },
      is_published: false,
      project_id: input.projectId || null,
    }

    const { data, error } = await supabase
      .from('pages')
      .insert(insertData as any)
      .select()
      .single()

    if (error) throw error

    return transformDbToPage(data)
  },

  async updatePage(id: string, input: UpdatePageInput): Promise<Page> {
    const supabase = createClient()
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (input.name !== undefined) updates.name = input.name
    if (input.blocks !== undefined) updates.blocks = input.blocks
    if (input.projectId !== undefined) updates.project_id = input.projectId
    if (input.settings !== undefined) {
      const { data: existing } = await supabase
        .from('pages')
        .select('settings')
        .eq('id', id)
        .single()
      const existingSettings = existing ? (existing as any).settings : {}
      updates.settings = { ...existingSettings, ...input.settings }
    }
    if (input.metadata !== undefined) {
      const { data: existing } = await supabase
        .from('pages')
        .select('metadata')
        .eq('id', id)
        .single()
      const existingMetadata = existing ? (existing as any).metadata : {}
      updates.metadata = { ...existingMetadata, ...input.metadata }
    }
    if (input.isPublished !== undefined) {
      updates.is_published = input.isPublished
      if (input.isPublished) {
        updates.published_at = new Date().toISOString()
      }
    }

    const { data, error } = await supabase
      .from('pages')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return transformDbToPage(data)
  },

  async deletePage(id: string): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase.from('pages').delete().eq('id', id)
    if (error) throw error
  },

  async publishPage(id: string): Promise<Page> {
    return this.updatePage(id, { isPublished: true })
  },

  async unpublishPage(id: string): Promise<Page> {
    return this.updatePage(id, { isPublished: false })
  },

  async duplicatePage(id: string): Promise<Page> {
    const page = await this.getPage(id)
    if (!page) throw new Error('Page not found')

    return this.createPage({
      name: `${page.name} (Copy)`,
      type: page.type,
      blocks: page.blocks,
      settings: page.settings,
      metadata: page.metadata,
      projectId: page.projectId,
    })
  },
}
