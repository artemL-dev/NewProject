import { createClient } from '@/lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'

export interface Asset {
  id: string
  userId: string
  pageId: string
  name: string
  url: string
  type: 'image' | 'icon' | 'video'
  size: number | null
  createdAt: string
}

export interface UploadAssetInput {
  file: File
  pageId: string
  type?: 'image' | 'icon' | 'video'
}

function transformDbToAsset(record: any): Asset {
  return {
    id: record.id,
    userId: record.user_id,
    pageId: record.page_id,
    name: record.name,
    url: record.url,
    type: record.type,
    size: record.size,
    createdAt: record.created_at,
  }
}

function detectFileType(file: File): 'image' | 'icon' | 'video' {
  if (file.type.startsWith('video/')) return 'video'
  if (file.type === 'image/svg+xml') return 'icon'
  return 'image'
}

export const assetService = {
  async getAssets(pageId: string): Promise<Asset[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('page_id', pageId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(transformDbToAsset)
  },

  async uploadAsset(input: UploadAssetInput): Promise<Asset> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('Not authenticated')

    const userId = userData.user.id
    const fileExt = input.file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const assetType = input.type || detectFileType(input.file)
    const filePath = `${userId}/${input.pageId}/${assetType}s/${fileName}`

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(filePath, input.file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('assets')
      .getPublicUrl(filePath)

    // Save asset record
    const insertData = {
      user_id: userId,
      page_id: input.pageId,
      name: input.file.name,
      url: urlData.publicUrl,
      type: assetType,
      size: input.file.size,
    }

    const { data, error } = await supabase
      .from('assets')
      .insert(insertData as any)
      .select()
      .single()

    if (error) throw error

    return transformDbToAsset(data)
  },

  async deleteAsset(id: string): Promise<void> {
    const supabase = createClient()

    // Get asset to find storage path
    const { data: asset } = await supabase
      .from('assets')
      .select('url')
      .eq('id', id)
      .single()

    if (asset) {
      // Extract path from URL and delete from storage
      const record = asset as any
      const url = new URL(record.url)
      const path = url.pathname.split('/').slice(-4).join('/')
      await supabase.storage.from('assets').remove([path])
    }

    // Delete record
    const { error } = await supabase.from('assets').delete().eq('id', id)
    if (error) throw error
  },
}
