import { createClient } from '@/lib/supabase/client'

export interface GenerateWhiteInput {
  topic: string
  language: string
  style: 'blog' | 'news' | 'health' | 'recipe' | 'tech'
}

export interface GenerateWhiteResult {
  blocks: any[]
  metadata: {
    title: string
    description: string
    language: string
  }
}

export const generationService = {
  async generateWhite(input: GenerateWhiteInput): Promise<GenerateWhiteResult> {
    const response = await fetch('/api/generate-white', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Generation failed')
    }

    return response.json()
  },

  async trackGeneration(data: {
    pageId?: string
    generationType: string
    prompt?: string
    templateId?: string
    model?: string
    tokensUsed?: number
    durationMs?: number
    status?: string
  }): Promise<void> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    await supabase.from('generation_history').insert({
      user_id: userData.user.id,
      page_id: data.pageId || null,
      generation_type: data.generationType,
      prompt: data.prompt || null,
      template_id: data.templateId || null,
      model: data.model || null,
      tokens_used: data.tokensUsed || null,
      duration_ms: data.durationMs || null,
      status: data.status || 'completed',
    })
  },

  async getGenerationHistory(): Promise<any[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('generation_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data || []
  },

  async getGenerationCount(): Promise<number> {
    const supabase = createClient()
    const { count, error } = await supabase
      .from('generation_history')
      .select('*', { count: 'exact', head: true })

    if (error) throw error
    return count || 0
  },
}
