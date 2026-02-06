'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { pageService } from '@/services/pageService'
import type { PageType, PageSettings, PageMetadata } from '@/types/page'
import type { Block } from '@/types/blocks'
import { prelandingTemplates } from '@/lib/templates/prelandingTemplates'
import { whiteTemplates } from '@/lib/templates/whiteTemplates'
import {
  slotTemplateBlocks,
  slotTemplateSettings,
  slotTemplateMetadata,
} from '@/lib/templates/slotTemplate'
import {
  generalTemplateBlocks,
  generalTemplateSettings,
  generalTemplateMetadata,
} from '@/lib/templates/generalTemplate'

export interface UnifiedTemplate {
  id: string
  name: string
  description: string
  type: PageType
  thumbnail: string
  getBlocks: () => Block[]
  settings: Partial<PageSettings>
  metadata: Partial<PageMetadata>
  source: 'builtin' | 'database'
}

function getBuiltinTemplates(): UnifiedTemplate[] {
  const templates: UnifiedTemplate[] = []

  // Slot template
  templates.push({
    id: 'builtin-slot',
    name: 'Mega Jackpot Slot',
    description: 'Classic slot machine with jackpot and symbols',
    type: 'slot',
    thumbnail: '🎰',
    getBlocks: () => JSON.parse(JSON.stringify(slotTemplateBlocks)),
    settings: slotTemplateSettings,
    metadata: slotTemplateMetadata,
    source: 'builtin',
  })

  // General template
  templates.push({
    id: 'builtin-general',
    name: 'Lucky Spin',
    description: 'General slot machine with flexible settings',
    type: 'general',
    thumbnail: '🍀',
    getBlocks: () => JSON.parse(JSON.stringify(generalTemplateBlocks)),
    settings: generalTemplateSettings,
    metadata: generalTemplateMetadata,
    source: 'builtin',
  })

  // Prelanding templates
  for (const t of prelandingTemplates) {
    templates.push({
      id: t.id,
      name: t.name,
      description: t.description,
      type: 'prelanding',
      thumbnail: t.thumbnail,
      getBlocks: t.blocks,
      settings: t.settings,
      metadata: t.metadata,
      source: 'builtin',
    })
  }

  // White templates
  for (const t of whiteTemplates) {
    templates.push({
      id: t.id,
      name: t.name,
      description: t.description,
      type: 'white',
      thumbnail: t.thumbnail,
      getBlocks: t.blocks,
      settings: t.settings,
      metadata: t.metadata,
      source: 'builtin',
    })
  }

  return templates
}

export function useTemplates(filterType?: PageType | 'all') {
  const [templates] = useState<UnifiedTemplate[]>(() => getBuiltinTemplates())
  const [loading] = useState(false)
  const router = useRouter()

  const filtered = useMemo(() => {
    if (!filterType || filterType === 'all') return templates
    return templates.filter((t) => t.type === filterType)
  }, [templates, filterType])

  const createPageFromTemplate = useCallback(
    async (templateId: string, pageName: string) => {
      const template = templates.find((t) => t.id === templateId)
      if (!template) throw new Error('Template not found')

      const page = await pageService.createPage({
        name: pageName,
        type: template.type,
        blocks: template.getBlocks(),
        settings: template.settings,
        metadata: template.metadata,
      })

      router.push(`/builder/${page.id}`)
      return page
    },
    [templates, router]
  )

  return {
    templates: filtered,
    allTemplates: templates,
    loading,
    createPageFromTemplate,
  }
}
