import type { Block } from './blocks'

export type PageType = 'slot' | 'general' | 'white' | 'prelanding'

export interface PageSettings {
  // Global colors
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string

  // Typography
  fontFamily: string
  baseFontSize: number

  // Layout
  maxWidth: number
  padding: number

  // Meta
  faviconUrl?: string
  customCss?: string
  customJs?: string

  // Tracking
  googleAnalyticsId?: string
  facebookPixelId?: string
  customScripts?: string
}

export interface PageMetadata {
  title: string
  description: string
  ogImage?: string
  keywords?: string[]
  author?: string
  language: string
}

export interface Page {
  id: string
  userId: string
  name: string
  slug: string
  type: PageType
  blocks: Block[]
  settings: PageSettings
  metadata: PageMetadata
  isPublished: boolean
  publishedAt: string | null
  projectId?: string | null
  createdAt: string
  updatedAt: string
}

export interface PageVersion {
  id: string
  pageId: string
  version: number
  blocks: Block[]
  settings: PageSettings
  createdAt: string
}

export interface Template {
  id: string
  name: string
  description: string | null
  type: PageType
  thumbnail: string | null
  blocks: Block[]
  settings: PageSettings
  isPublic: boolean
  createdAt: string
}

export const defaultPageSettings: PageSettings = {
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'Inter, sans-serif',
  baseFontSize: 16,
  maxWidth: 480,
  padding: 16,
}

export const defaultPageMetadata: PageMetadata = {
  title: 'New Page',
  description: '',
  language: 'en',
}
