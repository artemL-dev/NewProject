'use client'

import { FC } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setBlockFilter, setBlockCategoryFilter } from '@/store/slices/uiSlice'
import { BlockLibrary } from './BlockLibrary'
import { Search } from 'lucide-react'

export const LeftSidebar: FC = () => {
  const dispatch = useAppDispatch()
  const { leftSidebarOpen, blockFilter, blockCategoryFilter } = useAppSelector(
    (state) => state.ui
  )
  const { pageType } = useAppSelector((state) => state.builder)

  if (!leftSidebarOpen) return null

  const getCategoriesForType = () => {
    const base: { value: typeof blockCategoryFilter; label: string }[] = [
      { value: 'all', label: 'All' },
    ]

    switch (pageType) {
      case 'slot':
        base.push({ value: 'slot', label: 'Slot' })
        break
      case 'prelanding':
        base.push({ value: 'prelanding', label: 'Prelanding' })
        break
      case 'white':
        base.push({ value: 'white', label: 'White' })
        break
      case 'general':
        base.push({ value: 'general', label: 'General' })
        break
    }

    base.push({ value: 'common', label: 'Common' })
    return base
  }

  const categories = getCategoriesForType()

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-3">Blocks</h2>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search blocks..."
            value={blockFilter}
            onChange={(e) => dispatch(setBlockFilter(e.target.value))}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-1 mt-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => dispatch(setBlockCategoryFilter(cat.value))}
              className={`
                px-3 py-1 text-xs rounded-full transition-colors
                ${blockCategoryFilter === cat.value
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Block list */}
      <div className="flex-1 overflow-y-auto">
        <BlockLibrary />
      </div>
    </div>
  )
}
