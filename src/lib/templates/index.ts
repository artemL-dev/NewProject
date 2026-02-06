export {
  slotTemplateBlocks,
  slotTemplateSettings,
  slotTemplateMetadata,
} from './slotTemplate'

export {
  generalTemplateBlocks,
  generalTemplateSettings,
  generalTemplateMetadata,
} from './generalTemplate'

import type { PageType } from '@/types/page'
import {
  slotTemplateBlocks,
  slotTemplateSettings,
  slotTemplateMetadata,
} from './slotTemplate'
import {
  generalTemplateBlocks,
  generalTemplateSettings,
  generalTemplateMetadata,
} from './generalTemplate'

export function getDefaultTemplate(type: PageType) {
  if (type === 'slot') {
    return {
      blocks: slotTemplateBlocks,
      settings: slotTemplateSettings,
      metadata: slotTemplateMetadata,
    }
  }

  return {
    blocks: generalTemplateBlocks,
    settings: generalTemplateSettings,
    metadata: generalTemplateMetadata,
  }
}
