'use client'

import { FC } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { updateBlock } from '@/store/slices/builderSlice'
import { PropertyEditor } from './PropertyEditor'
import { getBlockDefinition, getBlockEditor } from '@/blocks/registry'
import { Settings, Layers } from 'lucide-react'

export const RightSidebar: FC = () => {
  const dispatch = useAppDispatch()
  const { rightSidebarOpen } = useAppSelector((state) => state.ui)
  const { selectedBlockId, blocks } = useAppSelector((state) => state.builder)

  if (!rightSidebarOpen) return null

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId)
  const definition = selectedBlock ? getBlockDefinition(selectedBlock.type) : null
  const BlockEditor = selectedBlock ? getBlockEditor(selectedBlock.type) : null

  const handleChange = (props: Record<string, any>) => {
    if (selectedBlockId) {
      dispatch(updateBlock({ id: selectedBlockId, props }))
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Settings size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-900">Properties</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedBlock && BlockEditor ? (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
              <Layers size={16} className="text-indigo-500" />
              <span className="font-medium text-gray-900">
                {definition?.name || selectedBlock.type}
              </span>
            </div>

            <BlockEditor block={selectedBlock} onChange={handleChange} />
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Layers size={32} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Select a block to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  )
}
