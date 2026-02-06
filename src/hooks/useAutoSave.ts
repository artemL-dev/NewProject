'use client'

import { useEffect, useRef, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setIsSaving, setLastSaved, setError } from '@/store/slices/builderSlice'
import { pageService } from '@/services/pageService'

interface UseAutoSaveOptions {
  pageId: string | undefined
  delay?: number
  enabled?: boolean
}

export function useAutoSave({
  pageId,
  delay = 2000,
  enabled = true,
}: UseAutoSaveOptions) {
  const dispatch = useAppDispatch()
  const { blocks, pageSettings, pageMetadata, projectId, isDirty } = useAppSelector(
    (state) => state.builder
  )

  const saveRef = useRef<() => void>()

  const save = useCallback(async () => {
    if (!pageId || !isDirty) return

    try {
      dispatch(setIsSaving(true))
      await pageService.updatePage(pageId, {
        blocks,
        settings: pageSettings,
        metadata: pageMetadata,
        projectId,
      })
      dispatch(setLastSaved(new Date().toISOString()))
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to save'))
    } finally {
      dispatch(setIsSaving(false))
    }
  }, [pageId, blocks, pageSettings, pageMetadata, projectId, isDirty, dispatch])

  // Create debounced save function
  useEffect(() => {
    saveRef.current = debounce(save, delay)
    return () => {
      if (saveRef.current) {
        (saveRef.current as any).cancel?.()
      }
    }
  }, [save, delay])

  // Auto-save when dirty
  useEffect(() => {
    if (enabled && isDirty && saveRef.current) {
      saveRef.current()
    }
  }, [enabled, isDirty, blocks, pageSettings, pageMetadata, projectId])

  // Manual save function
  const saveNow = useCallback(() => {
    if (saveRef.current) {
      (saveRef.current as any).cancel?.()
    }
    save()
  }, [save])

  return { saveNow }
}
