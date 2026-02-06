import { createClient } from '@/lib/supabase/client'
import type { Template, PageType } from '@/types/page'
import type { Block } from '@/types/blocks'

function transformDbToTemplate(record: any): Template {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    type: record.type,
    thumbnail: record.thumbnail,
    blocks: record.blocks as Block[],
    settings: record.settings,
    isPublic: record.is_public,
    createdAt: record.created_at,
  }
}

export const templateService = {
  async getTemplates(type?: PageType): Promise<Template[]> {
    const supabase = createClient()
    let query = supabase
      .from('templates')
      .select('*')
      .eq('is_public', true)
      .order('name')

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query

    if (error) throw error

    return (data || []).map(transformDbToTemplate)
  },

  async getTemplate(id: string): Promise<Template | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data ? transformDbToTemplate(data) : null
  },

  async createFromTemplate(templateId: string, name: string): Promise<{
    blocks: Block[]
    settings: any
  }> {
    const template = await this.getTemplate(templateId)
    if (!template) throw new Error('Template not found')

    return {
      blocks: template.blocks,
      settings: template.settings,
    }
  },
}
