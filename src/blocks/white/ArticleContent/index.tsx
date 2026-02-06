'use client'

import { FC } from 'react'
import type { ArticleContentBlock as ArticleContentBlockType, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const defaultBodyHtml = `<p>The rapid pace of technological advancement continues to reshape every aspect of our daily lives. From the way we communicate to how we work, learn, and entertain ourselves, the digital revolution has left no stone unturned. As we look toward the future, several key trends are emerging that promise to transform our world even further.</p>

<h2>Artificial Intelligence and Automation</h2>

<p>Artificial intelligence has moved far beyond the realm of science fiction. Today, AI systems are capable of performing tasks that were once thought to be exclusively human. Machine learning algorithms analyze vast datasets, identify patterns, and make predictions with remarkable accuracy. In healthcare, AI is assisting doctors in diagnosing diseases earlier and more accurately than ever before.</p>

<blockquote>The question is no longer whether AI will change the world, but how quickly and profoundly it will do so. We must prepare ourselves for a future where human and artificial intelligence work hand in hand.</blockquote>

<p>Automation, powered by AI, is transforming industries across the board. Manufacturing plants are increasingly relying on robotic systems that can work around the clock with precision and consistency. Service industries are adopting chatbots and virtual assistants to handle customer inquiries, freeing up human workers to focus on more complex and creative tasks.</p>

<h2>The Rise of Sustainable Technology</h2>

<p>As climate change continues to pose a significant threat, the technology sector is stepping up with innovative solutions. Renewable energy technologies such as solar panels and wind turbines have become more efficient and affordable, making clean energy accessible to a broader population.</p>

<ul>
<li>Solar energy capacity has increased tenfold in the past decade</li>
<li>Electric vehicle adoption is accelerating globally</li>
<li>Smart grid technology is optimizing energy distribution</li>
<li>Carbon capture technologies are showing promising results</li>
</ul>

<p>Beyond energy, sustainable technology is finding its way into agriculture, transportation, and urban planning. Precision farming techniques use sensors and data analytics to optimize crop yields while minimizing resource usage. Smart city initiatives are leveraging IoT devices to reduce waste, improve traffic flow, and enhance the quality of urban life.</p>

<h2>Looking Ahead</h2>

<p>The convergence of these technologies promises a future that is both exciting and challenging. As we navigate this rapidly changing landscape, it is essential to ensure that the benefits of technology are distributed equitably and that ethical considerations guide our path forward. The decisions we make today will shape the world of tomorrow.</p>`

export const articleContentDefinition: BlockDefinition = {
  type: 'article-content',
  name: 'Article Content',
  description: 'Rich text article body content',
  icon: 'align-left',
  category: 'white',
  defaultProps: {
    bodyHtml: defaultBodyHtml,
    backgroundColor: '#ffffff',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
    fontSize: 18,
    lineHeight: 1.8,
  },
}

export const createArticleContentBlock = (): ArticleContentBlockType => ({
  id: uuidv4(),
  type: 'article-content',
  order: 0,
  props: {
    bodyHtml: defaultBodyHtml,
    backgroundColor: '#ffffff',
    textColor: '#1a1a2e',
    accentColor: '#3b82f6',
    fontSize: 18,
    lineHeight: 1.8,
  },
})

export const ArticleContentBlock: FC<BlockRenderProps<ArticleContentBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      <div
        className="max-w-3xl mx-auto px-6 py-8"
        style={{
          fontSize: `${props.fontSize}px`,
          lineHeight: props.lineHeight,
        }}
      >
        <style>{`
          .article-prose h2 {
            font-size: 1.5em;
            font-weight: 700;
            margin-top: 2em;
            margin-bottom: 0.75em;
            color: ${props.textColor};
          }
          .article-prose h3 {
            font-size: 1.25em;
            font-weight: 600;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            color: ${props.textColor};
          }
          .article-prose p {
            margin-bottom: 1.25em;
          }
          .article-prose blockquote {
            border-left: 4px solid ${props.accentColor};
            padding-left: 1.25em;
            margin: 1.5em 0;
            font-style: italic;
            opacity: 0.85;
          }
          .article-prose ul,
          .article-prose ol {
            margin: 1.25em 0;
            padding-left: 1.5em;
          }
          .article-prose li {
            margin-bottom: 0.5em;
          }
          .article-prose ul li {
            list-style-type: disc;
          }
          .article-prose ol li {
            list-style-type: decimal;
          }
          .article-prose a {
            color: ${props.accentColor};
            text-decoration: underline;
          }
          .article-prose strong {
            font-weight: 700;
          }
          .article-prose em {
            font-style: italic;
          }
          .article-prose img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1.5em 0;
          }
        `}</style>
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: props.bodyHtml }}
        />
      </div>
    </div>
  )
}

export const ArticleContentEditor: FC<BlockEditorProps<ArticleContentBlockType>> = ({
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
            Body HTML
          </label>
          <textarea
            value={props.bodyHtml}
            onChange={(e) => onChange({ bodyHtml: e.target.value })}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            placeholder="<p>Your article content here...</p>"
          />
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Typography</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Size (px)
            </label>
            <input
              type="number"
              value={props.fontSize}
              onChange={(e) => onChange({ fontSize: Math.max(12, Math.min(24, Number(e.target.value))) })}
              min={12}
              max={24}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Line Height
            </label>
            <input
              type="number"
              value={props.lineHeight}
              onChange={(e) => onChange({ lineHeight: Math.max(1.0, Math.min(2.5, Number(e.target.value))) })}
              min={1.0}
              max={2.5}
              step={0.1}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
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
