import { createClient } from '@/lib/supabase/client'

export interface DashboardStats {
  totalPages: number
  totalGenerations: number
  totalDownloads: number
}

export const statsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const supabase = createClient()

    const [pagesResult, generationsResult, downloadsResult] = await Promise.all([
      supabase.from('pages').select('*', { count: 'exact', head: true }),
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
