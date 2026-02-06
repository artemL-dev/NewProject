'use client'

import { FC } from 'react'
import { LogOut } from 'lucide-react'

interface DashboardHeaderProps {
  email: string
  onLogout: () => void
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ email, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Page Builder</h1>
            <p className="text-xs text-gray-500">Media Buyer Tools</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{email}</span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
