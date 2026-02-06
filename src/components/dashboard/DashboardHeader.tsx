'use client'

import { FC } from 'react'
import { Plus, LogOut } from 'lucide-react'

export type DashboardTab = 'pages' | 'templates'

interface DashboardHeaderProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  onCreateNew: () => void
  email: string
  onLogout: () => void
}

const tabs: { key: DashboardTab; label: string }[] = [
  { key: 'pages', label: 'Pages' },
  { key: 'templates', label: 'Templates' },
]

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  activeTab,
  onTabChange,
  onCreateNew,
  email,
  onLogout,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 lg:px-8">
      <div className="flex items-center justify-between h-14">
        {/* Navigation tabs */}
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.key
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            Create New
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <span className="text-sm text-gray-500 truncate max-w-[180px]" title={email}>
            {email}
          </span>
          <button
            onClick={onLogout}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
