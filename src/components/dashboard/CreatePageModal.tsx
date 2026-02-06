'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Gamepad2, Layout, FileText, Newspaper, ArrowRight, X, LayoutTemplate } from 'lucide-react'

interface CreatePageModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenTemplates?: () => void
  projectId?: string | null
}

const pageTypes = [
  {
    type: 'slot',
    title: 'Slot Prelanding',
    description: 'Create a gaming-style page with slot machine, symbols, and jackpot elements.',
    icon: Gamepad2,
    gradient: 'from-purple-500 to-indigo-600',
    features: [
      'Slot board with symbols',
      'Game variants selector',
      'Win modal & progress bars',
      'Control panel with bets',
    ],
  },
  {
    type: 'prelanding',
    title: 'Prelanding',
    description: 'Build an engaging prelanding with quizzes, countdown timers, and interactive elements.',
    icon: Newspaper,
    gradient: 'from-orange-500 to-red-600',
    features: [
      'News articles & stories',
      'Countdown timers & bonuses',
      'Quiz / survey funnels',
      'Wheel of fortune',
    ],
  },
  {
    type: 'white',
    title: 'White Page',
    description: 'Generate a clean white page — blog, news, or article site with AI assistance.',
    icon: FileText,
    gradient: 'from-sky-500 to-blue-600',
    features: [
      'AI content generation',
      'Blog & news templates',
      'Article layouts',
      'SEO-friendly structure',
    ],
  },
  {
    type: 'general',
    title: 'General Prelanding',
    description: 'Build a classic landing page with flexible content blocks.',
    icon: Layout,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Hero sections & CTAs',
      'Text, images & galleries',
      'Forms & testimonials',
      'Video & social proof',
    ],
  },
]

export const CreatePageModal: FC<CreatePageModalProps> = ({ isOpen, onClose, onOpenTemplates, projectId }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Page</h2>
            <p className="text-gray-600 text-sm mt-1">Choose the type of page you want to create</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 px-8 pb-4">
          {pageTypes.map((pt) => {
            const Icon = pt.icon
            return (
              <Link
                key={pt.type}
                href={`/builder/new/${pt.type}${projectId ? `?projectId=${projectId}` : ''}`}
                className="group bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 hover:bg-white transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pt.gradient} flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                  {pt.title}
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-gray-600 text-sm mb-3">{pt.description}</p>

                <ul className="text-xs text-gray-500 space-y-1">
                  {pt.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </Link>
            )
          })}
        </div>

        {/* Template CTA */}
        {onOpenTemplates && (
          <div className="px-8 pb-8">
            <button
              onClick={() => {
                onClose()
                onOpenTemplates()
              }}
              className="w-full py-3 px-4 bg-indigo-50 rounded-xl border border-indigo-100 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
            >
              <LayoutTemplate size={16} />
              Or start from a template
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
