'use client'

import { FC, useState } from 'react'
import { X, Loader2, Copy, Trash2, UserMinus, Mail } from 'lucide-react'
import type { Team } from '@/types/team'
import type { TeamRole } from '@/types/team'
import { useTeamMembers } from '@/hooks/useTeamMembers'
import { ROLE_PERMISSIONS } from '@/types/team'

interface TeamSettingsModalProps {
  isOpen: boolean
  team: Team | null
  currentUserId: string
  onClose: () => void
  onDeleteTeam: (teamId: string) => Promise<void>
  onLeaveTeam: (teamId: string) => Promise<void>
}

type Tab = 'general' | 'members' | 'invitations'

const roleOptions: { value: TeamRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

const roleBadgeColors: Record<TeamRole, string> = {
  owner: 'bg-amber-100 text-amber-700',
  admin: 'bg-purple-100 text-purple-700',
  editor: 'bg-blue-100 text-blue-700',
  viewer: 'bg-gray-100 text-gray-600',
}

export const TeamSettingsModal: FC<TeamSettingsModalProps> = ({
  isOpen,
  team,
  currentUserId,
  onClose,
  onDeleteTeam,
  onLeaveTeam,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('members')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<TeamRole>('editor')
  const [inviting, setInviting] = useState(false)

  const {
    members,
    invitations,
    loading,
    inviteMember,
    removeMember,
    updateRole,
    cancelInvitation,
  } = useTeamMembers(team?.id || null)

  if (!isOpen || !team) return null

  const currentMember = members.find((m) => m.userId === currentUserId)
  const isOwner = currentMember?.role === 'owner'
  const canManage = currentMember ? ROLE_PERMISSIONS[currentMember.role].canManageMembers : false

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return
    try {
      setInviting(true)
      await inviteMember(inviteEmail.trim(), inviteRole)
      setInviteEmail('')
    } catch (err) {
      console.error('Failed to invite:', err)
    } finally {
      setInviting(false)
    }
  }

  const handleCopyInviteLink = (token: string) => {
    const link = `${window.location.origin}/invite/${token}`
    navigator.clipboard.writeText(link)
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'general', label: 'General' },
    { key: 'members', label: `Members (${members.length})` },
    { key: 'invitations', label: `Invites (${invitations.length})` },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">{team.name}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pb-3 flex-shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-indigo-600" />
            </div>
          ) : activeTab === 'general' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team name</label>
                <p className="text-sm text-gray-900">{team.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <p className="text-sm text-gray-500 font-mono">{team.slug}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                <p className="text-sm text-gray-500">{new Date(team.createdAt).toLocaleDateString()}</p>
              </div>

              {!isOwner && (
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to leave this team?')) {
                      await onLeaveTeam(team.id)
                      onClose()
                    }
                  }}
                  className="w-full py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
                >
                  <UserMinus size={14} />
                  Leave Team
                </button>
              )}

              {isOwner && (
                <button
                  onClick={async () => {
                    if (confirm(`Delete "${team.name}"? This cannot be undone. All team pages will become personal pages.`)) {
                      await onDeleteTeam(team.id)
                      onClose()
                    }
                  }}
                  className="w-full py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete Team
                </button>
              )}
            </div>
          ) : activeTab === 'members' ? (
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.email || member.userId}
                    </p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-0.5 ${roleBadgeColors[member.role]}`}>
                      {member.role}
                    </span>
                  </div>

                  {canManage && member.role !== 'owner' && member.userId !== currentUserId && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <select
                        value={member.role}
                        onChange={(e) => updateRole(member.id, e.target.value as TeamRole)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        {roleOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          if (confirm(`Remove ${member.email} from the team?`)) {
                            removeMember(member.id)
                          }
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {members.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No members yet</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Invite form */}
              {canManage && (
                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="Email address"
                    />
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as TeamRole)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {roleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleInvite}
                    disabled={!inviteEmail.trim() || inviting}
                    className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {inviting ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Mail size={14} />
                    )}
                    Send Invitation
                  </button>
                </div>
              )}

              {/* Pending invitations */}
              <div className="space-y-2">
                {invitations.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-gray-700 truncate">{inv.email}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${roleBadgeColors[inv.role]}`}>
                          {inv.role}
                        </span>
                        <span className="text-xs text-gray-400">
                          expires {new Date(inv.expiresAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleCopyInviteLink(inv.token)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 rounded"
                        title="Copy invite link"
                      >
                        <Copy size={13} />
                      </button>
                      {canManage && (
                        <button
                          onClick={() => cancelInvitation(inv.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                          title="Cancel invitation"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {invitations.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No pending invitations</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
