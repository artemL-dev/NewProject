'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { pageService } from '@/services/pageService'
import { generationService } from '@/services/generationService'
import { whiteTemplates } from '@/lib/templates/whiteTemplates'
import { Loader2, Sparkles, LayoutTemplate, ArrowLeft } from 'lucide-react'

type Tab = 'ai' | 'templates'

const languages = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
  { value: 'ru', label: 'Русский' },
  { value: 'pl', label: 'Polski' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'nl', label: 'Nederlands' },
]

const styles = [
  { value: 'blog', label: 'Blog Post', emoji: '📝' },
  { value: 'news', label: 'News Article', emoji: '📰' },
  { value: 'health', label: 'Health & Wellness', emoji: '💊' },
  { value: 'recipe', label: 'Recipe', emoji: '🍳' },
  { value: 'tech', label: 'Tech / Tutorial', emoji: '💻' },
]

export default function NewWhitePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('ai')
  const [topic, setTopic] = useState('')
  const [language, setLanguage] = useState('en')
  const [style, setStyle] = useState<string>('blog')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const startTime = Date.now()
      const result = await generationService.generateWhite({
        topic: topic.trim(),
        language,
        style: style as any,
      })

      const page = await pageService.createPage({
        name: result.metadata.title || topic,
        type: 'white',
        blocks: result.blocks,
        metadata: {
          title: result.metadata.title,
          description: result.metadata.description,
          language: result.metadata.language,
        },
      })

      // Track generation
      await generationService.trackGeneration({
        pageId: page.id,
        generationType: 'ai_white',
        prompt: topic,
        model: (result as any).generation?.model,
        tokensUsed: (result as any).generation?.tokensUsed,
        durationMs: Date.now() - startTime,
      }).catch(() => {}) // Non-critical

      router.push(`/builder/${page.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed. Please try again.')
      setIsGenerating(false)
    }
  }

  const handleTemplateSelect = async (templateId: string) => {
    const template = whiteTemplates.find((t) => t.id === templateId)
    if (!template) return

    setIsGenerating(true)
    setError(null)

    try {
      const blocks = template.blocks()
      const page = await pageService.createPage({
        name: template.metadata.title || template.name,
        type: 'white',
        blocks,
        settings: template.settings,
        metadata: template.metadata,
      })

      // Track generation
      await generationService.trackGeneration({
        pageId: page.id,
        generationType: 'template_white',
        templateId,
      }).catch(() => {})

      router.push(`/builder/${page.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page')
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          href="/builder"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft size={16} />
          Back to page types
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create White Page</h1>
          <p className="text-gray-600">
            Generate a clean article page with AI or choose from a template
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Sparkles size={18} />
            AI Generate
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <LayoutTemplate size={18} />
            Templates
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* AI Tab */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic / Subject
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Best investment strategies for beginners"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={isGenerating}
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isGenerating}
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {styles.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setStyle(s.value)}
                      disabled={isGenerating}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        style === s.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span>{s.emoji}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Article
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid gap-4">
            {whiteTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                disabled={isGenerating}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md hover:border-indigo-300 transition-all disabled:opacity-50"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{template.thumbnail}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {template.style}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Loading overlay */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center gap-4">
              <Loader2 size={40} className="animate-spin text-indigo-600" />
              <p className="text-gray-700 font-medium">Creating your page...</p>
              <p className="text-gray-500 text-sm">This may take a few seconds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
