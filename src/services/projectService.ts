import { createClient } from '@/lib/supabase/client'

export interface Project {
  id: string
  userId: string
  name: string
  description: string | null
  color: string
  createdAt: string
  updatedAt: string
}

export interface CreateProjectInput {
  name: string
  description?: string
  color?: string
}

function transformDbToProject(record: any): Project {
  return {
    id: record.id,
    userId: record.user_id,
    name: record.name,
    description: record.description,
    color: record.color,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  }
}

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformDbToProject)
  },

  async createProject(input: CreateProjectInput): Promise<Project> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: userData.user.id,
        name: input.name,
        description: input.description || null,
        color: input.color || '#6366f1',
      } as any)
      .select()
      .single()

    if (error) throw error
    return transformDbToProject(data)
  },

  async updateProject(id: string, input: Partial<CreateProjectInput>): Promise<Project> {
    const supabase = createClient()
    const updates: Record<string, any> = {}
    if (input.name !== undefined) updates.name = input.name
    if (input.description !== undefined) updates.description = input.description
    if (input.color !== undefined) updates.color = input.color

    const { data, error } = await supabase
      .from('projects')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformDbToProject(data)
  },

  async deleteProject(id: string): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
  },
}
