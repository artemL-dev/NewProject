'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { pageService } from '@/services/pageService'
import type { Page, PageType } from '@/types/page'

export function usePage(pageId: string | undefined) {
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPage = useCallback(async () => {
    if (!pageId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const data = await pageService.getPage(pageId)
      setPage(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [pageId])

  useEffect(() => {
    fetchPage()
  }, [fetchPage])

  const refresh = useCallback(() => {
    fetchPage()
  }, [fetchPage])

  return { page, loading, error, refresh }
}

export interface UsePagesFilters {
  type?: PageType | 'all'
  projectId?: string | null
  search?: string
}

export function usePages(filters?: UsePagesFilters) {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true)
      const data = await pageService.getPages()
      setPages(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  // Apply client-side filters
  const filteredPages = useMemo(() => {
    let result = pages

    if (filters?.type && filters.type !== 'all') {
      result = result.filter((p) => p.type === filters.type)
    }

    if (filters?.projectId) {
      result = result.filter((p) => p.projectId === filters.projectId)
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.metadata.title.toLowerCase().includes(search)
      )
    }

    return result
  }, [pages, filters?.type, filters?.projectId, filters?.search])

  const createPage = useCallback(
    async (input: Parameters<typeof pageService.createPage>[0]) => {
      const newPage = await pageService.createPage(input)
      setPages((prev) => [newPage, ...prev])
      return newPage
    },
    []
  )

  const deletePage = useCallback(async (id: string) => {
    await pageService.deletePage(id)
    setPages((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const duplicatePage = useCallback(async (id: string) => {
    const newPage = await pageService.duplicatePage(id)
    setPages((prev) => [newPage, ...prev])
    return newPage
  }, [])

  return {
    pages: filteredPages,
    allPages: pages,
    loading,
    error,
    refresh: fetchPages,
    createPage,
    deletePage,
    duplicatePage,
  }
}
