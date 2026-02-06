import { createClient } from '@/lib/supabase/client'

export interface DashboardStats {
  totalPages: number
  totalGenerations: number
  totalDownloads: number
}

export const statsService = {
  async getDashboardStats(teamId?: string | null): Promise<DashboardStats> {
    const supabase = createClient()

    let pagesQuery = supabase.from('pages').select('*', { count: 'exact', head: true })
    if (teamId) {
      pagesQuery = pagesQuery.eq('team_id', teamId)
    } else if (teamId === null) {
      pagesQuery = pagesQuery.is('team_id', null)
    }

    const [pagesResult, generationsResult, downloadsResult] = await Promise.all([
      pagesQuery,
      supabase.from('generation_history').select('*', { count: 'exact', head: true }),
      supabase.from('download_history').select('*', { count: 'exact', head: true }),
    ])

    return {
      totalPages: pagesResult.count || 0,
      totalGenerations: generationsResult.count || 0,
      totalDownloads: downloadsResult.count || 0,
    }
  },
}
