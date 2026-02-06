'use client'

import { FC, useState, useEffect } from 'react'
import { generationService } from '@/services/generationService'
import { Sparkles, Clock } from 'lucide-react'

export const GenerationHistory: FC = () => {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generationService
      .getGenerationHistory()
      .then(setHistory)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-purple-500" />
          Recent Generations
        </h3>
        <p className="text-xs text-gray-400 text-center py-4">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Sparkles size={16} className="text-purple-500" />
        Recent Generations
      </h3>

      {history.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">No generations yet</p>
      ) : (
        <div className="space-y-2">
          {history.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">
                  {item.prompt || item.generation_type}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={10} />
                  {new Date(item.created_at).toLocaleDateString()}
                  {item.model && <span>· {item.model}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
