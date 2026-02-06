import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface GenerateRequest {
  topic: string
  language: string
  style: 'blog' | 'news' | 'health' | 'recipe' | 'tech'
}

const stylePrompts: Record<string, string> = {
  blog: 'Write a personal, engaging blog post with a conversational tone. Include practical advice and personal insights.',
  news: 'Write a professional news article in a journalistic style. Include quotes, facts, and a neutral tone.',
  health: 'Write a health and wellness article with evidence-based information. Include practical tips and expert citations.',
  recipe: 'Write a recipe blog post with an introduction, ingredient list (as HTML ul/li), and step-by-step instructions.',
  tech: 'Write a technical article or tutorial. Include code concepts, best practices, and clear explanations.',
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    const { topic, language, style } = body

    if (!topic || !language || !style) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, language, style' },
        { status: 400 }
      )
    }

    const startTime = Date.now()

    if (!OPENAI_API_KEY) {
      // Fallback: generate a template-based response without AI
      const result = generateFallbackContent(topic, language, style)
      return NextResponse.json(result)
    }

    const systemPrompt = `You are a content writer. Generate article content in ${language} language. ${stylePrompts[style] || stylePrompts.blog}

Return a JSON object with this exact structure:
{
  "title": "Article title",
  "subtitle": "Short subtitle/description",
  "authorName": "Author Name",
  "category": "Category name",
  "bodyHtml": "<p>Full article HTML content with <h2>, <p>, <ul>, <li>, <blockquote> tags</p>"
}

The bodyHtml should be 3-5 paragraphs with proper HTML formatting. Use h2 for section headers, p for paragraphs, ul/li for lists, and blockquote for quotes. Do NOT use h1 (that's the title). Return ONLY valid JSON, no markdown wrapping.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Write an article about: ${topic}` },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      // Fall back to template
      const result = generateFallbackContent(topic, language, style)
      return NextResponse.json(result)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      const result = generateFallbackContent(topic, language, style)
      return NextResponse.json(result)
    }

    // Parse AI response
    let parsed
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      const result = generateFallbackContent(topic, language, style)
      return NextResponse.json(result)
    }

    const durationMs = Date.now() - startTime
    const tokensUsed = data.usage?.total_tokens || 0

    const blocks = [
      {
        id: uuidv4(),
        type: 'article-header',
        order: 0,
        props: {
          title: parsed.title || topic,
          subtitle: parsed.subtitle || '',
          authorName: parsed.authorName || 'Author',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          category: parsed.category || style.charAt(0).toUpperCase() + style.slice(1),
          featuredImageUrl: '',
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          accentColor: '#6366f1',
        },
      },
      {
        id: uuidv4(),
        type: 'article-content',
        order: 1,
        props: {
          bodyHtml: parsed.bodyHtml || `<p>${topic}</p>`,
          backgroundColor: '#ffffff',
          textColor: '#374151',
          accentColor: '#6366f1',
          fontSize: 16,
          lineHeight: 1.8,
        },
      },
    ]

    return NextResponse.json({
      blocks,
      metadata: {
        title: parsed.title || topic,
        description: parsed.subtitle || '',
        language,
      },
      generation: {
        model: 'gpt-4o-mini',
        tokensUsed,
        durationMs,
      },
    })
  } catch (error) {
    console.error('Generate white error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateFallbackContent(topic: string, language: string, style: string) {
  const title = topic.length > 60 ? topic : `${topic}: A Complete Guide`
  const subtitle = `Everything you need to know about ${topic.toLowerCase()}`

  const bodyHtml = `<p>This is an article about ${topic}. Edit this content in the builder to customize it for your needs.</p>
<h2>Introduction</h2>
<p>${topic} is a subject that has gained significant attention in recent times. In this article, we explore the key aspects and provide practical insights.</p>
<h2>Key Points</h2>
<ul>
<li>Understanding the fundamentals of ${topic.toLowerCase()}</li>
<li>Best practices and strategies</li>
<li>Common mistakes to avoid</li>
<li>Expert recommendations</li>
</ul>
<h2>Conclusion</h2>
<p>By following the guidelines outlined in this article, you can make the most of ${topic.toLowerCase()}. Remember, consistency and patience are key to success.</p>`

  const blocks = [
    {
      id: uuidv4(),
      type: 'article-header',
      order: 0,
      props: {
        title,
        subtitle,
        authorName: 'Content Writer',
        authorAvatar: '',
        publishDate: new Date().toISOString().split('T')[0],
        category: style.charAt(0).toUpperCase() + style.slice(1),
        featuredImageUrl: '',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        accentColor: '#6366f1',
      },
    },
    {
      id: uuidv4(),
      type: 'article-content',
      order: 1,
      props: {
        bodyHtml,
        backgroundColor: '#ffffff',
        textColor: '#374151',
        accentColor: '#6366f1',
        fontSize: 16,
        lineHeight: 1.8,
      },
    },
  ]

  return {
    blocks,
    metadata: {
      title,
      description: subtitle,
      language,
    },
    generation: {
      model: 'fallback',
      tokensUsed: 0,
      durationMs: 0,
    },
  }
}
