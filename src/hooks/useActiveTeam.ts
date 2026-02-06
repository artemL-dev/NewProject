'use client'

import { useState, useCallback, useMemo } from 'react'
import type { Team } from '@/types/team'

const STORAGE_KEY = 'landify-active-team-id'

function getStoredTeamId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}

export function useActiveTeam(teams: Team[]) {
  const [activeTeamId, setActiveTeamId] = useState<string | null>(() => getStoredTeamId())

  const activeTeam = useMemo(
    () => teams.find((t) => t.id === activeTeamId) || null,
    [teams, activeTeamId]
  )

  // If stored team is no longer in the list, reset to personal
  if (activeTeamId && teams.length > 0 && !activeTeam) {
    setActiveTeamId(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const switchTeam = useCallback((teamId: string | null) => {
    setActiveTeamId(teamId)
    if (teamId) {
      localStorage.setItem(STORAGE_KEY, teamId)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return { activeTeamId, activeTeam, switchTeam }
}
