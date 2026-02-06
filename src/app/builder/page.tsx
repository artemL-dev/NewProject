import Link from 'next/link'
import { Gamepad2, Layout, FileText, Newspaper, ArrowRight } from 'lucide-react'

export default function BuilderSelectPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Create New Page
          </h1>
          <p className="text-gray-600">
            Choose the type of page you want to create
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pageTypes.map((pt) => {
            const Icon = pt.icon
            return (
              <Link
                key={pt.type}
                href={pt.type === 'white' ? '/builder/new/white' : `/builder/new/${pt.type}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg hover:border-indigo-300 transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pt.gradient} flex items-center justify-center mb-6`}>
                  <Icon size={32} className="text-white" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  {pt.title}
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>

                <p className="text-gray-600 mb-4">{pt.description}</p>

                <ul className="text-sm text-gray-500 space-y-1">
                  {pt.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
