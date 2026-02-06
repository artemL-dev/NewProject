'use client'

import { FC, useState } from 'react'
import type { ArticleSidebarBlock as ArticleSidebarBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { Plus, Trash2 } from 'lucide-react'

const defaultRelatedArticles = [
  {
    title: 'How AI Is Revolutionizing Healthcare',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=120&fit=crop',
  },
  {
    title: 'The Complete Guide to Renewable Energy',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=120&fit=crop',
  },
  {
    title: '5 Emerging Tech Trends to Watch',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=120&fit=crop',
  },
]

const defaultCategories = [
  { name: 'Technology', url: '#' },
  { name: 'Science', url: '#' },
  { name: 'Business', url: '#' },
  { name: 'Health', url: '#' },
  { name: 'Innovation', url: '#' },
]

export const articleSidebarDefinition: BlockDefinition = {
  type: 'article-sidebar',
  name: 'Article Sidebar',
  description: 'Sidebar with related articles and categories',
  icon: 'sidebar',
  category: 'white',
  defaultProps: {
    relatedArticles: defaultRelatedArticles,
    categories: defaultCategories,
    showSearch: true,
    backgroundColor: '#f8fafc',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
  },
}

export const createArticleSidebarBlock = (): ArticleSidebarBlockType => ({
  id: uuidv4(),
  type: 'article-sidebar',
  order: 0,
  props: {
    relatedArticles: defaultRelatedArticles.map((a) => ({ ...a })),
    categories: defaultCategories.map((c) => ({ ...c })),
    showSearch: true,
    backgroundColor: '#f8fafc',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
  },
})

export const ArticleSidebarBlock: FC<BlockRenderProps<ArticleSidebarBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      <div className="p-6 space-y-8">
        {/* Search */}
        {props.showSearch && (
          <div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-3 pr-10 rounded-lg border text-sm outline-none transition-colors"
                style={{
                  borderColor: `${props.textColor}20`,
                  backgroundColor: `${props.backgroundColor}`,
                  color: props.textColor,
                }}
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: props.textColor }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {props.relatedArticles.length > 0 && (
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b"
              style={{
                color: props.textColor,
                borderColor: `${props.textColor}15`,
              }}
            >
              Related Articles
            </h3>
            <div className="space-y-4">
              {props.relatedArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  className="flex gap-3 group"
                >
                  {article.imageUrl && (
                    <div className="flex-shrink-0 w-20 h-14 rounded-md overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <span
                    className="text-sm font-medium leading-snug transition-colors"
                    style={{ color: props.textColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = props.accentColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = props.textColor)}
                  >
                    {article.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {props.categories.length > 0 && (
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b"
              style={{
                color: props.textColor,
                borderColor: `${props.textColor}15`,
              }}
            >
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {props.categories.map((category, index) => (
                <a
                  key={index}
                  href={category.url}
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: `${props.accentColor}15`,
                    color: props.accentColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = props.accentColor
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${props.accentColor}15`
                    e.currentTarget.style.color = props.accentColor
                  }}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const ArticleSidebarEditor: FC<BlockEditorProps<ArticleSidebarBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateRelatedArticle = (index: number, updates: Partial<{ title: string; url: string; imageUrl: string }>) => {
    const newArticles = props.relatedArticles.map((article, i) =>
      i === index ? { ...article, ...updates } : article
    )
    onChange({ relatedArticles: newArticles })
  }

  const addRelatedArticle = () => {
    onChange({
      relatedArticles: [
        ...props.relatedArticles,
        { title: 'New Article', url: '#', imageUrl: '' },
      ],
    })
  }

  const removeRelatedArticle = (index: number) => {
    onChange({
      relatedArticles: props.relatedArticles.filter((_, i) => i !== index),
    })
  }

  const updateCategory = (index: number, updates: Partial<{ name: string; url: string }>) => {
    const newCategories = props.categories.map((category, i) =>
      i === index ? { ...category, ...updates } : category
    )
    onChange({ categories: newCategories })
  }

  const addCategory = () => {
    onChange({
      categories: [
        ...props.categories,
        { name: 'New Category', url: '#' },
      ],
    })
  }

  const removeCategory = (index: number) => {
    onChange({
      categories: props.categories.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Settings</h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showSearch"
            checked={props.showSearch}
            onChange={(e) => onChange({ showSearch: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="showSearch" className="text-sm text-gray-700">
            Show Search Input
          </label>
        </div>
      </div>

      {/* Related Articles */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Related Articles</h3>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {props.relatedArticles.map((article, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Article {index + 1}</span>
                <button
                  onClick={() => removeRelatedArticle(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                type="text"
                value={article.title}
                onChange={(e) => updateRelatedArticle(index, { title: e.target.value })}
                placeholder="Article title"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                value={article.url}
                onChange={(e) => updateRelatedArticle(index, { url: e.target.value })}
                placeholder="URL"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                value={article.imageUrl}
                onChange={(e) => updateRelatedArticle(index, { imageUrl: e.target.value })}
                placeholder="Image URL"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          ))}
        </div>
        <button
          onClick={addRelatedArticle}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add Article
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Categories</h3>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {props.categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
              <input
                type="text"
                value={category.name}
                onChange={(e) => updateCategory(index, { name: e.target.value })}
                placeholder="Category name"
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="text"
                value={category.url}
                onChange={(e) => updateCategory(index, { url: e.target.value })}
                placeholder="URL"
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={() => removeCategory(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addCategory}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add Category
        </button>
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
