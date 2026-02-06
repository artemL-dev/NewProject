import { createClient } from '@/lib/supabase/client'
import type { Team, TeamMember, TeamInvitation, TeamRole } from '@/types/team'

function generateSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') +
    '-' +
    Date.now().toString(36)
  )
}

function transformDbToTeam(record: any): Team {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    avatarUrl: record.avatar_url,
    createdBy: record.created_by,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  }
}

function transformDbToMember(record: any): TeamMember {
  return {
    id: record.id,
    teamId: record.team_id,
    userId: record.user_id,
    role: record.role as TeamRole,
    invitedBy: record.invited_by,
    invitedAt: record.invited_at,
    joinedAt: record.joined_at,
    email: record.email,
  }
}

function transformDbToInvitation(record: any): TeamInvitation {
  return {
    id: record.id,
    teamId: record.team_id,
    email: record.email,
    role: record.role as TeamRole,
    invitedBy: record.invited_by,
    token: record.token,
    expiresAt: record.expires_at,
    acceptedAt: record.accepted_at,
    createdAt: record.created_at,
  }
}

export const teamService = {
  async getTeams(): Promise<Team[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformDbToTeam)
  },

  async getTeam(id: string): Promise<Team | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data ? transformDbToTeam(data) : null
  },

  async createTeam(name: string): Promise<Team> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('teams')
      .insert({
        name,
        slug: generateSlug(name),
        created_by: userData.user.id,
      } as any)
      .select()
      .single()

    if (error) throw error

    // Add creator as owner
    const { error: memberError } = await supabase
      .from('team_members')
      .insert({
        team_id: data.id,
        user_id: userData.user.id,
        role: 'owner',
        invited_by: userData.user.id,
      } as any)

    if (memberError) throw memberError

    return transformDbToTeam(data)
  },

  async updateTeam(id: string, input: { name?: string }): Promise<Team> {
    const supabase = createClient()
    const updates: Record<string, any> = {}
    if (input.name !== undefined) updates.name = input.name

    const { data, error } = await supabase
      .from('teams')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformDbToTeam(data)
  },

  async deleteTeam(id: string): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase.from('teams').delete().eq('id', id)
    if (error) throw error
  },

  async getMembers(teamId: string): Promise<TeamMember[]> {
    const supabase = createClient()
    const { data, error } = await supabase.rpc('get_team_members_with_email', {
      p_team_id: teamId,
    })

    if (error) throw error
    return (data || []).map(transformDbToMember)
  },

  async updateMemberRole(memberId: string, role: TeamRole): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase
      .from('team_members')
      .update({ role } as any)
      .eq('id', memberId)

    if (error) throw error
  },

  async removeMember(memberId: string): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId)

    if (error) throw error
  },

  async leaveTeam(teamId: string): Promise<void> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', userData.user.id)

    if (error) throw error
  },

  async inviteMember(
    teamId: string,
    email: string,
    role: TeamRole
  ): Promise<TeamInvitation> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('team_invitations')
      .insert({
        team_id: teamId,
        email,
        role,
        invited_by: userData.user.id,
      } as any)
      .select()
      .single()

    if (error) throw error
    return transformDbToInvitation(data)
  },

  async getInvitations(teamId: string): Promise<TeamInvitation[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('team_invitations')
      .select('*')
      .eq('team_id', teamId)
      .is('accepted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformDbToInvitation)
  },

  async cancelInvitation(id: string): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase
      .from('team_invitations')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async acceptInvitation(token: string): Promise<Team> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('Not authenticated')

    // Find invitation by token
    const { data: invitation, error: findError } = await supabase
      .from('team_invitations')
      .select('*')
      .eq('token', token)
      .is('accepted_at', null)
      .single()

    if (findError || !invitation) throw new Error('Invalid or expired invitation')

    // Check if expired
    if (new Date(invitation.expires_at) < new Date()) {
      throw new Error('Invitation has expired')
    }

    // Add user as member
    const { error: memberError } = await supabase
      .from('team_members')
      .insert({
        team_id: invitation.team_id,
        user_id: userData.user.id,
        role: invitation.role,
        invited_by: invitation.invited_by,
      } as any)

    if (memberError) throw memberError

    // Mark invitation as accepted
    await supabase
      .from('team_invitations')
      .update({ accepted_at: new Date().toISOString() } as any)
      .eq('id', invitation.id)

    // Return the team
    const team = await this.getTeam(invitation.team_id)
    if (!team) throw new Error('Team not found')
    return team
  },

  async getMyInvitations(): Promise<(TeamInvitation & { teamName?: string })[]> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user?.email) return []

    const { data, error } = await supabase
      .from('team_invitations')
      .select('*, teams(name)')
      .eq('email', userData.user.email)
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map((record: any) => ({
      ...transformDbToInvitation(record),
      teamName: record.teams?.name,
    }))
  },
}
