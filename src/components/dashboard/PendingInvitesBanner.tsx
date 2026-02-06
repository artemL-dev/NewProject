'use client'

import { FC, useState, useEffect } from 'react'
import { Users, Check, X } from 'lucide-react'
import { teamService } from '@/services/teamService'
import type { TeamInvitation } from '@/types/team'

interface PendingInvitesBannerProps {
  onAccepted: () => void
}

export const PendingInvitesBanner: FC<PendingInvitesBannerProps> = ({ onAccepted }) => {
  const [invitations, setInvitations] = useState<(TeamInvitation & { teamName?: string })[]>([])

  useEffect(() => {
    teamService.getMyInvitations().then(setInvitations).catch(() => {})
  }, [])

  if (invitations.length === 0) return null

  const handleAccept = async (token: string) => {
    try {
      await teamService.acceptInvitation(token)
      setInvitations((prev) => prev.filter((i) => i.token !== token))
      onAccepted()
    } catch (err) {
      console.error('Failed to accept invitation:', err)
    }
  }

  const handleDecline = (id: string) => {
    setInvitations((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="mb-4 space-y-2">
      {invitations.map((inv) => (
        <div
          key={inv.id}
          className="flex items-center justify-between px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-lg"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Users size={18} className="text-indigo-500 flex-shrink-0" />
            <p className="text-sm text-indigo-900">
              You&apos;re invited to join <strong>{inv.teamName || 'a team'}</strong> as {inv.role}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleAccept(inv.token)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Check size={12} />
              Accept
            </button>
            <button
              onClick={() => handleDecline(inv.id)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
