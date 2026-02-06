'use client'

import { useState, useEffect, useCallback } from 'react'
import { teamService } from '@/services/teamService'
import type { TeamMember, TeamInvitation, TeamRole } from '@/types/team'

export function useTeamMembers(teamId: string | null) {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [invitations, setInvitations] = useState<TeamInvitation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchMembers = useCallback(async () => {
    if (!teamId) {
      setMembers([])
      setInvitations([])
      return
    }

    try {
      setLoading(true)
      const [membersData, invitationsData] = await Promise.all([
        teamService.getMembers(teamId),
        teamService.getInvitations(teamId),
      ])
      setMembers(membersData)
      setInvitations(invitationsData)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [teamId])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const inviteMember = useCallback(
    async (email: string, role: TeamRole) => {
      if (!teamId) return
      const invitation = await teamService.inviteMember(teamId, email, role)
      setInvitations((prev) => [invitation, ...prev])
      return invitation
    },
    [teamId]
  )

  const removeMember = useCallback(async (memberId: string) => {
    await teamService.removeMember(memberId)
    setMembers((prev) => prev.filter((m) => m.id !== memberId))
  }, [])

  const updateRole = useCallback(async (memberId: string, role: TeamRole) => {
    await teamService.updateMemberRole(memberId, role)
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role } : m))
    )
  }, [])

  const cancelInvitation = useCallback(async (invitationId: string) => {
    await teamService.cancelInvitation(invitationId)
    setInvitations((prev) => prev.filter((i) => i.id !== invitationId))
  }, [])

  return {
    members,
    invitations,
    loading,
    error,
    refresh: fetchMembers,
    inviteMember,
    removeMember,
    updateRole,
    cancelInvitation,
  }
}
