export type TeamRole = 'owner' | 'admin' | 'editor' | 'viewer'

export interface Team {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  createdBy: string | null
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  teamId: string
  userId: string
  role: TeamRole
  invitedBy: string | null
  invitedAt: string
  joinedAt: string
  email?: string
}

export interface TeamInvitation {
  id: string
  teamId: string
  email: string
  role: TeamRole
  invitedBy: string | null
  token: string
  expiresAt: string
  acceptedAt: string | null
  createdAt: string
}

export const ROLE_PERMISSIONS: Record<TeamRole, {
  canEdit: boolean
  canDelete: boolean
  canInvite: boolean
  canManageMembers: boolean
  canManageTeam: boolean
}> = {
  owner: {
    canEdit: true,
    canDelete: true,
    canInvite: true,
    canManageMembers: true,
    canManageTeam: true,
  },
  admin: {
    canEdit: true,
    canDelete: true,
    canInvite: true,
    canManageMembers: true,
    canManageTeam: true,
  },
  editor: {
    canEdit: true,
    canDelete: false,
    canInvite: false,
    canManageMembers: false,
    canManageTeam: false,
  },
  viewer: {
    canEdit: false,
    canDelete: false,
    canInvite: false,
    canManageMembers: false,
    canManageTeam: false,
  },
}
