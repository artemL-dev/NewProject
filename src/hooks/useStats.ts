'use client'

import { useState, useEffect, useCallback } from 'react'
import { statsService, type DashboardStats } from '@/services/statsService'

export function useStats() {
  const [stats, setStats] = useState<DashboardStats>({ totalPages: 0, totalGenerations: 0, totalDownloads: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const data = await statsService.getDashboardStats()
      setStats(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error, refresh: fetchStats }
}
