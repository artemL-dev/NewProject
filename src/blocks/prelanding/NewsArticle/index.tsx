'use client'

import { FC } from 'react'
import type { NewsArticleBlock as NewsArticleBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

// ============================================
// DEFINITION
// ============================================

export const newsArticleDefinition: BlockDefinition = {
  type: 'news-article',
  name: 'News Article',
  description: 'Fake news / success story with CTA button',
  icon: 'newspaper',
  category: 'prelanding',
  defaultProps: {
    headline: 'Local Man Turns $250 Into $42,000 In Just 3 Months Using New AI Trading Platform',
    subheadline: 'Financial experts are stunned by the results of this revolutionary automated trading system',
    bodyHtml: `<p>A 34-year-old software engineer from Austin, Texas has become the latest success story of the AI-powered trading revolution. <strong>Michael Torres</strong> claims he turned a modest $250 investment into over $42,000 in just 90 days using a new automated trading platform.</p>
<p>"I was skeptical at first," Torres told reporters. "But after seeing my colleague's results, I decided to give it a try with money I could afford to lose. Within the first week, my account had already grown to $1,200."</p>
<p>The platform uses advanced artificial intelligence algorithms to analyze market patterns and execute trades automatically, 24 hours a day. According to the company, users don't need any prior trading experience to get started.</p>
<p><strong>Dr. Sarah Chen</strong>, a financial technology researcher at MIT, commented: "We're seeing a new wave of AI-driven tools that are democratizing access to sophisticated trading strategies that were previously only available to institutional investors."</p>
<p>Torres says he now plans to quit his day job and trade full-time. "It's completely changed my life. I tell everyone I know about it."</p>
<p>The platform is currently accepting new users, but spots are reportedly limited due to high demand.</p>`,
    authorName: 'Jessica Reynolds',
    authorAvatar: '',
    publishDate: '2025-01-15',
    sourceName: 'Financial Daily Report',
    featuredImageUrl: '',
    ctaText: 'Try The Platform Now',
    ctaUrl: '#',
    ctaColor: '#22c55e',
    ctaPosition: 'both',
    showAuthor: true,
    showDate: true,
    showShareButtons: true,
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    accentColor: '#1d4ed8',
  },
}

// ============================================
// FACTORY
// ============================================

export const createNewsArticleBlock = (): NewsArticleBlockType => ({
  id: uuidv4(),
  type: 'news-article',
  order: 0,
  props: {
    headline: 'Local Man Turns $250 Into $42,000 In Just 3 Months Using New AI Trading Platform',
    subheadline: 'Financial experts are stunned by the results of this revolutionary automated trading system',
    bodyHtml: `<p>A 34-year-old software engineer from Austin, Texas has become the latest success story of the AI-powered trading revolution. <strong>Michael Torres</strong> claims he turned a modest $250 investment into over $42,000 in just 90 days using a new automated trading platform.</p>
<p>"I was skeptical at first," Torres told reporters. "But after seeing my colleague's results, I decided to give it a try with money I could afford to lose. Within the first week, my account had already grown to $1,200."</p>
<p>The platform uses advanced artificial intelligence algorithms to analyze market patterns and execute trades automatically, 24 hours a day. According to the company, users don't need any prior trading experience to get started.</p>
<p><strong>Dr. Sarah Chen</strong>, a financial technology researcher at MIT, commented: "We're seeing a new wave of AI-driven tools that are democratizing access to sophisticated trading strategies that were previously only available to institutional investors."</p>
<p>Torres says he now plans to quit his day job and trade full-time. "It's completely changed my life. I tell everyone I know about it."</p>
<p>The platform is currently accepting new users, but spots are reportedly limited due to high demand.</p>`,
    authorName: 'Jessica Reynolds',
    authorAvatar: '',
    publishDate: '2025-01-15',
    sourceName: 'Financial Daily Report',
    featuredImageUrl: '',
    ctaText: 'Try The Platform Now',
    ctaUrl: '#',
    ctaColor: '#22c55e',
    ctaPosition: 'both',
    showAuthor: true,
    showDate: true,
    showShareButtons: true,
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    accentColor: '#1d4ed8',
  },
})

// ============================================
// CTA BUTTON COMPONENT
// ============================================

const CtaButton: FC<{ text: string; url: string; color: string }> = ({ text, url, color }) => (
  <div className="my-6 text-center">
    <a
      href={url}
      className="inline-block px-8 py-4 rounded-lg font-bold text-white text-lg shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
      style={{ backgroundColor: color }}
    >
      {text}
    </a>
  </div>
)

// ============================================
// SHARE BUTTONS COMPONENT
// ============================================

const ShareButtons: FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="flex items-center gap-3 mt-4">
    <span className="text-sm font-medium opacity-70">Share:</span>

    {/* Facebook */}
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
      style={{ backgroundColor: '#1877f2' }}
      aria-label="Share on Facebook"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </a>

    {/* Twitter / X */}
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
      style={{ backgroundColor: '#000000' }}
      aria-label="Share on X"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </a>

    {/* Telegram */}
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
      style={{ backgroundColor: '#0088cc' }}
      aria-label="Share on Telegram"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    </a>
  </div>
)

// ============================================
// RENDER COMPONENT
// ============================================

export const NewsArticleBlock: FC<BlockRenderProps<NewsArticleBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  const formattedDate = props.publishDate
    ? new Date(props.publishDate + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

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
        <div className="w-full">
          <img
            src={props.featuredImageUrl}
            alt={props.headline}
            className="w-full h-auto object-cover"
            style={{ maxHeight: '400px' }}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Source Name */}
        {props.sourceName && (
          <div
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: props.accentColor }}
          >
            {props.sourceName}
          </div>
        )}

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
          {props.headline}
        </h1>

        {/* Subheadline */}
        {props.subheadline && (
          <h2 className="text-lg sm:text-xl opacity-75 leading-snug mb-4 font-normal">
            {props.subheadline}
          </h2>
        )}

        {/* Author Info Bar */}
        {(props.showAuthor || props.showDate) && (
          <div className="flex items-center gap-3 py-4 border-t border-b mb-6" style={{ borderColor: `${props.textColor}20` }}>
            {/* Author Avatar */}
            {props.showAuthor && (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: props.accentColor }}
              >
                {props.authorAvatar ? (
                  <img
                    src={props.authorAvatar}
                    alt={props.authorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  props.authorName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)
                )}
              </div>
            )}

            <div className="flex flex-col text-sm">
              {/* Author Name */}
              {props.showAuthor && props.authorName && (
                <span className="font-semibold">{props.authorName}</span>
              )}
              {/* Date */}
              {props.showDate && formattedDate && (
                <span className="opacity-60">{formattedDate}</span>
              )}
            </div>
          </div>
        )}

        {/* Inline CTA (before body) */}
        {(props.ctaPosition === 'inline' || props.ctaPosition === 'both') && (
          <CtaButton text={props.ctaText} url={props.ctaUrl} color={props.ctaColor} />
        )}

        {/* Body Content */}
        <div
          className="prose prose-lg max-w-none leading-relaxed"
          style={{ color: props.textColor }}
          dangerouslySetInnerHTML={{ __html: props.bodyHtml }}
        />

        {/* Bottom CTA */}
        {(props.ctaPosition === 'bottom' || props.ctaPosition === 'both') && (
          <CtaButton text={props.ctaText} url={props.ctaUrl} color={props.ctaColor} />
        )}

        {/* Share Buttons */}
        {props.showShareButtons && (
          <div className="pt-4 border-t" style={{ borderColor: `${props.textColor}20` }}>
            <ShareButtons accentColor={props.accentColor} />
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// EDITOR COMPONENT
// ============================================

export const NewsArticleEditor: FC<BlockEditorProps<NewsArticleBlockType>> = ({
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
            Headline
          </label>
          <input
            type="text"
            value={props.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subheadline
          </label>
          <input
            type="text"
            value={props.subheadline}
            onChange={(e) => onChange({ subheadline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body HTML
          </label>
          <textarea
            value={props.bodyHtml}
            onChange={(e) => onChange({ bodyHtml: e.target.value })}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
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
            Source Name
          </label>
          <input
            type="text"
            value={props.sourceName}
            onChange={(e) => onChange({ sourceName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
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

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showAuthor"
              checked={props.showAuthor}
              onChange={(e) => onChange({ showAuthor: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showAuthor" className="text-sm text-gray-700">
              Show Author
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showDate"
              checked={props.showDate}
              onChange={(e) => onChange({ showDate: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showDate" className="text-sm text-gray-700">
              Show Date
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showShareButtons"
              checked={props.showShareButtons}
              onChange={(e) => onChange({ showShareButtons: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showShareButtons" className="text-sm text-gray-700">
              Show Share Buttons
            </label>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">CTA</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA Button Text
          </label>
          <input
            type="text"
            value={props.ctaText}
            onChange={(e) => onChange({ ctaText: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA URL
          </label>
          <input
            type="text"
            value={props.ctaUrl}
            onChange={(e) => onChange({ ctaUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Button Color
            </label>
            <input
              type="color"
              value={props.ctaColor}
              onChange={(e) => onChange({ ctaColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Position
            </label>
            <select
              value={props.ctaPosition}
              onChange={(e) => onChange({ ctaPosition: e.target.value as 'inline' | 'bottom' | 'both' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="inline">Inline (before body)</option>
              <option value="bottom">Bottom (after body)</option>
              <option value="both">Both</option>
            </select>
          </div>
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
