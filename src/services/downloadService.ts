import { createClient } from '@/lib/supabase/client'

export const downloadService = {
  async trackDownload(pageId: string | null, format: string, fileName: string): Promise<void> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    await supabase.from('download_history').insert({
      user_id: userData.user.id,
      page_id: pageId,
      format,
      file_name: fileName,
    })
  },

  async getDownloadHistory(): Promise<any[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('download_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data || []
  },

  async getDownloadCount(): Promise<number> {
    const supabase = createClient()
    const { count, error } = await supabase
      .from('download_history')
      .select('*', { count: 'exact', head: true })

    if (error) throw error
    return count || 0
  },
}
