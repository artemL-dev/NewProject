'use client'

import { useParams, useSearchParams, redirect } from 'next/navigation'
import { Builder } from '@/components/builder/Builder'
import type { PageType } from '@/types/page'

const validTypes: PageType[] = ['slot', 'general', 'white', 'prelanding']

export default function NewBuilderPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const type = params.type as string
  const projectId = searchParams.get('projectId')

  // Validate page type
  if (!validTypes.includes(type as PageType)) {
    redirect('/builder')
  }

  return <Builder pageType={type as PageType} projectId={projectId} />
}
