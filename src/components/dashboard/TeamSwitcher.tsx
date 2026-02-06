'use client'

import { FC, useState } from 'react'
import { ChevronDown, User, Users, Plus, Settings } from 'lucide-react'
import type { Team } from '@/types/team'

interface TeamSwitcherProps {
  teams: Team[]
  activeTeamId: string | null
  activeTeam: Team | null
  onSwitchTeam: (teamId: string | null) => void
  onCreateTeam: () => void
  onManageTeam: () => void
}

export const TeamSwitcher: FC<TeamSwitcherProps> = ({
  teams,
  activeTeamId,
  activeTeam,
  onSwitchTeam,
  onCreateTeam,
  onManageTeam,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
            activeTeam ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {activeTeam ? <Users size={14} /> : <User size={14} />}
          </div>
          <span className="font-medium text-gray-900 truncate">
            {activeTeam ? activeTeam.name : 'Personal'}
          </span>
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
            {/* Personal */}
            <button
              onClick={() => {
                onSwitchTeam(null)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 ${
                !activeTeamId ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
            >
              <User size={14} />
              Personal
            </button>

            {/* Teams */}
            {teams.length > 0 && (
              <div className="border-t border-gray-100 my-1" />
            )}
            {teams.map((team) => (
              <div key={team.id} className="flex items-center">
                <button
                  onClick={() => {
                    onSwitchTeam(team.id)
                    setOpen(false)
                  }}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 ${
                    activeTeamId === team.id ? 'text-indigo-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <Users size={14} />
                  <span className="truncate">{team.name}</span>
                </button>
                {activeTeamId === team.id && (
                  <button
                    onClick={() => {
                      onManageTeam()
                      setOpen(false)
                    }}
                    className="p-1.5 mr-1 text-gray-400 hover:text-gray-600 rounded"
                  >
                    <Settings size={13} />
                  </button>
                )}
              </div>
            ))}

            {/* Create team */}
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => {
                onCreateTeam()
                setOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50"
            >
              <Plus size={14} />
              Create Team
            </button>
          </div>
        </>
      )}
    </div>
  )
}
