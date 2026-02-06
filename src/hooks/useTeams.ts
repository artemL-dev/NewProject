'use client'

import { useState, useEffect, useCallback } from 'react'
import { teamService } from '@/services/teamService'
import type { Team } from '@/types/team'

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true)
      const data = await teamService.getTeams()
      setTeams(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  const createTeam = useCallback(async (name: string) => {
    const newTeam = await teamService.createTeam(name)
    setTeams((prev) => [newTeam, ...prev])
    return newTeam
  }, [])

  const deleteTeam = useCallback(async (id: string) => {
    await teamService.deleteTeam(id)
    setTeams((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { teams, loading, error, refresh: fetchTeams, createTeam, deleteTeam }
}
