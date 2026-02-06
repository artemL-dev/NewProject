'use client'

import { FC } from 'react'
import type { ArticleHeaderBlock as ArticleHeaderBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const articleHeaderDefinition: BlockDefinition = {
  type: 'article-header',
  name: 'Article Header',
  description: 'Article title, author, and featured image',
  icon: 'type',
  category: 'white',
  defaultProps: {
    title: 'The Future of Technology: What Lies Ahead',
    subtitle: 'An in-depth look at emerging trends shaping our world in the coming decade',
    authorName: 'Jane Mitchell',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    publishDate: '2025-01-15',
    category: 'Technology',
    featuredImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    backgroundColor: '#ffffff',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
  },
}

export const createArticleHeaderBlock = (): ArticleHeaderBlockType => ({
  id: uuidv4(),
  type: 'article-header',
  order: 0,
  props: {
    title: 'The Future of Technology: What Lies Ahead',
    subtitle: 'An in-depth look at emerging trends shaping our world in the coming decade',
    authorName: 'Jane Mitchell',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    publishDate: '2025-01-15',
    category: 'Technology',
    featuredImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    backgroundColor: '#ffffff',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
  },
})

export const ArticleHeaderBlock: FC<BlockRenderProps<ArticleHeaderBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  const formattedDate = (() => {
    try {
      return new Date(props.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return props.publishDate
    }
  })()

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      {/* Featured Image */}
      {props.featuredImageUrl && (
        <div className="relative w-full overflow-hidden" style={{ maxHeight: '480px' }}>
          <img
            src={props.featuredImageUrl}
            alt={props.title}
            className="w-full h-full object-cover"
            style={{ minHeight: '280px', maxHeight: '480px' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${props.backgroundColor} 0%, transparent 60%)`,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-6 pb-8" style={{ marginTop: props.featuredImageUrl ? '-80px' : '32px' }}>
        {/* Category Badge */}
        {props.category && (
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: props.accentColor,
              color: '#ffffff',
            }}
          >
            {props.category}
          </span>
        )}

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
          style={{ color: props.textColor }}
        >
          {props.title}
        </h1>

        {/* Subtitle */}
        {props.subtitle && (
          <p
            className="text-lg sm:text-xl leading-relaxed mb-6"
            style={{ color: props.textColor, opacity: 0.7 }}
          >
            {props.subtitle}
          </p>
        )}

        {/* Divider */}
        <div
          className="w-16 h-1 rounded-full mb-6"
          style={{ backgroundColor: props.accentColor }}
        />

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {props.authorAvatar && (
            <img
              src={props.authorAvatar}
              alt={props.authorName}
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: props.accentColor }}
            />
          )}
          <div>
            <div className="font-semibold text-sm" style={{ color: props.textColor }}>
              {props.authorName}
            </div>
            <div
              className="text-sm"
              style={{ color: props.textColor, opacity: 0.6 }}
            >
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ArticleHeaderEditor: FC<BlockEditorProps<ArticleHeaderBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Content</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={props.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={props.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={props.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image URL
          </label>
          <input
            type="text"
            value={props.featuredImageUrl}
            onChange={(e) => onChange({ featuredImageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publish Date
          </label>
          <input
            type="date"
            value={props.publishDate}
            onChange={(e) => onChange({ publishDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Author */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Author</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Name
          </label>
          <input
            type="text"
            value={props.authorName}
            onChange={(e) => onChange({ authorName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Avatar URL
          </label>
          <input
            type="text"
            value={props.authorAvatar}
            onChange={(e) => onChange({ authorAvatar: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Colors</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background
            </label>
            <input
              type="color"
              value={props.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Color
            </label>
            <input
              type="color"
              value={props.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accent Color
            </label>
            <input
              type="color"
              value={props.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
