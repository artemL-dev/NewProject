import type { Block } from '@/types/blocks'
import type { PageSettings, PageMetadata } from '@/types/page'
import { v4 as uuidv4 } from 'uuid'

export interface WhiteTemplate {
  id: string
  name: string
  description: string
  style: 'blog' | 'news' | 'health' | 'recipe' | 'tech'
  thumbnail: string
  blocks: () => Block[]
  settings: Partial<PageSettings>
  metadata: Partial<PageMetadata>
}

export const whiteTemplates: WhiteTemplate[] = [
  {
    id: 'white-blog',
    name: 'Blog Post',
    description: 'Clean blog post layout with author info and content',
    style: 'blog',
    thumbnail: '📝',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'article-header' as const,
        order: 0,
        props: {
          title: 'How I Transformed My Morning Routine for Better Productivity',
          subtitle: 'Simple changes that made a big difference in my daily life',
          authorName: 'Sarah Johnson',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          category: 'Lifestyle',
          featuredImageUrl: '',
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          accentColor: '#6366f1',
        },
      },
      {
        id: uuidv4(),
        type: 'article-content' as const,
        order: 1,
        props: {
          bodyHtml: `<p>We all know the feeling — the alarm goes off, and the day already feels like it's running away from us. But what if a few small tweaks to your morning could change everything?</p>
<h2>The Power of a Consistent Wake-Up Time</h2>
<p>Research shows that waking up at the same time every day — even on weekends — can dramatically improve your energy levels and mental clarity. I started setting my alarm for 6:30 AM, no exceptions.</p>
<h2>Movement Before Screens</h2>
<p>Instead of reaching for my phone first thing, I now spend 15 minutes stretching or doing light yoga. This simple change reduced my morning anxiety by what felt like 50%.</p>
<blockquote>The first hour of the day sets the tone for everything that follows.</blockquote>
<h2>The Three-Priority System</h2>
<p>Before checking emails, I write down the three most important tasks for the day. This ensures I'm proactive rather than reactive.</p>
<ul>
<li>Identify your top 3 priorities each morning</li>
<li>Block time for deep work on your #1 priority</li>
<li>Save email and messages for after your first focus block</li>
</ul>
<p>These changes won't happen overnight, but within two weeks, you'll notice a significant shift in how you approach each day.</p>`,
          backgroundColor: '#ffffff',
          textColor: '#374151',
          accentColor: '#6366f1',
          fontSize: 16,
          lineHeight: 1.8,
        },
      },
    ],
    settings: {
      maxWidth: 720,
      fontFamily: 'Georgia, serif',
      backgroundColor: '#ffffff',
    },
    metadata: {
      title: 'How I Transformed My Morning Routine for Better Productivity',
      description: 'Simple changes that made a big difference in my daily life',
      language: 'en',
    },
  },
  {
    id: 'white-news',
    name: 'News Article',
    description: 'Professional news site article layout',
    style: 'news',
    thumbnail: '📰',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'article-header' as const,
        order: 0,
        props: {
          title: 'Global Markets Rally as Central Banks Signal Policy Shift',
          subtitle: 'Investors react positively to coordinated statements from major economies',
          authorName: 'Michael Chen',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          category: 'Finance',
          featuredImageUrl: '',
          backgroundColor: '#ffffff',
          textColor: '#111827',
          accentColor: '#dc2626',
        },
      },
      {
        id: uuidv4(),
        type: 'article-content' as const,
        order: 1,
        props: {
          bodyHtml: `<p><strong>NEW YORK</strong> — Stock markets around the world surged on Tuesday as central banks from several major economies signaled a coordinated shift in monetary policy, boosting investor confidence across asset classes.</p>
<p>The S&P 500 rose 2.3% in early trading, while European indices posted similar gains. Asian markets, which closed before the announcements, are expected to follow suit when trading resumes.</p>
<h2>What Changed</h2>
<p>In a series of statements released within hours of each other, the Federal Reserve, European Central Bank, and Bank of Japan all indicated a willingness to adjust their current policy stances in response to evolving economic conditions.</p>
<p>"We are seeing encouraging signs of stabilization," said Fed Chair in a prepared statement. "Our policy tools remain flexible and responsive to the data."</p>
<h2>Market Impact</h2>
<p>Bond yields fell sharply across the curve, with the 10-year Treasury dropping 15 basis points. The dollar index weakened against major currencies, while gold prices edged higher.</p>
<p>Analysts at major investment banks quickly revised their forecasts upward, with several noting that the coordinated nature of the announcements was particularly significant.</p>
<h2>Looking Ahead</h2>
<p>Market participants will be closely watching upcoming economic data releases and the next round of central bank meetings for further clarity on the timing and magnitude of any policy changes.</p>`,
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          accentColor: '#dc2626',
          fontSize: 17,
          lineHeight: 1.7,
        },
      },
    ],
    settings: {
      maxWidth: 680,
      fontFamily: "'Times New Roman', serif",
      backgroundColor: '#ffffff',
    },
    metadata: {
      title: 'Global Markets Rally as Central Banks Signal Policy Shift',
      description: 'Investors react positively to coordinated statements from major economies',
      language: 'en',
    },
  },
  {
    id: 'white-health',
    name: 'Health Article',
    description: 'Health and wellness article with clean design',
    style: 'health',
    thumbnail: '💊',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'article-header' as const,
        order: 0,
        props: {
          title: '5 Science-Backed Ways to Boost Your Immune System Naturally',
          subtitle: 'Experts share evidence-based strategies for staying healthy year-round',
          authorName: 'Dr. Emily Roberts',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          category: 'Health',
          featuredImageUrl: '',
          backgroundColor: '#f0fdf4',
          textColor: '#14532d',
          accentColor: '#16a34a',
        },
      },
      {
        id: uuidv4(),
        type: 'article-content' as const,
        order: 1,
        props: {
          bodyHtml: `<p>Your immune system is your body's first line of defense against illness. While there's no magic pill, research consistently shows that certain lifestyle habits can significantly strengthen your immune response.</p>
<h2>1. Prioritize Sleep Quality</h2>
<p>Studies show that people who sleep fewer than 6 hours per night are 4.2 times more likely to catch a cold. Aim for 7-9 hours of quality sleep each night.</p>
<h2>2. Stay Active — But Don't Overdo It</h2>
<p>Moderate exercise (30 minutes, 5 days a week) enhances immune surveillance. However, excessive intense exercise can temporarily suppress immune function.</p>
<h2>3. Eat a Rainbow of Fruits and Vegetables</h2>
<p>Different colored produce contains different antioxidants and phytonutrients:</p>
<ul>
<li><strong>Red</strong> (tomatoes, berries) — lycopene, anthocyanins</li>
<li><strong>Orange</strong> (carrots, sweet potatoes) — beta-carotene</li>
<li><strong>Green</strong> (spinach, broccoli) — folate, vitamin K</li>
<li><strong>Purple</strong> (eggplant, grapes) — resveratrol</li>
</ul>
<h2>4. Manage Stress Effectively</h2>
<p>Chronic stress releases cortisol, which suppresses immune function. Meditation, deep breathing, and regular breaks can help manage stress levels.</p>
<h2>5. Stay Hydrated</h2>
<p>Water helps carry nutrients to cells and flush out toxins. Aim for at least 8 glasses per day, more if you're active.</p>
<blockquote>Prevention is always better than cure. Small daily habits compound into significant health benefits over time.</blockquote>`,
          backgroundColor: '#f0fdf4',
          textColor: '#14532d',
          accentColor: '#16a34a',
          fontSize: 16,
          lineHeight: 1.8,
        },
      },
    ],
    settings: {
      maxWidth: 700,
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: '#f0fdf4',
    },
    metadata: {
      title: '5 Science-Backed Ways to Boost Your Immune System Naturally',
      description: 'Experts share evidence-based strategies for staying healthy year-round',
      language: 'en',
    },
  },
  {
    id: 'white-recipe',
    name: 'Recipe Page',
    description: 'Recipe blog post with ingredients and instructions',
    style: 'recipe',
    thumbnail: '🍳',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'article-header' as const,
        order: 0,
        props: {
          title: 'Classic Italian Pasta Carbonara',
          subtitle: 'An authentic Roman recipe that takes just 20 minutes to prepare',
          authorName: 'Chef Marco Rossi',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          category: 'Recipes',
          featuredImageUrl: '',
          backgroundColor: '#fffbeb',
          textColor: '#78350f',
          accentColor: '#d97706',
        },
      },
      {
        id: uuidv4(),
        type: 'article-content' as const,
        order: 1,
        props: {
          bodyHtml: `<p>Carbonara is one of Rome's most beloved pasta dishes. The key is using high-quality ingredients and proper technique — no cream needed!</p>
<h2>Ingredients</h2>
<ul>
<li>400g spaghetti or rigatoni</li>
<li>200g guanciale (or pancetta), cut into strips</li>
<li>4 large egg yolks + 2 whole eggs</li>
<li>100g Pecorino Romano, finely grated</li>
<li>Freshly ground black pepper</li>
<li>Salt for pasta water</li>
</ul>
<h2>Instructions</h2>
<p><strong>Step 1:</strong> Bring a large pot of well-salted water to boil. Cook pasta until al dente (1 minute less than package directions).</p>
<p><strong>Step 2:</strong> While pasta cooks, place guanciale in a cold pan and cook over medium heat until crispy and golden, about 8 minutes. Remove from heat.</p>
<p><strong>Step 3:</strong> In a bowl, whisk together egg yolks, whole eggs, and grated Pecorino until smooth. Add generous black pepper.</p>
<p><strong>Step 4:</strong> When pasta is ready, reserve 1 cup of pasta water. Drain pasta and add to the pan with guanciale (off heat).</p>
<p><strong>Step 5:</strong> Pour egg mixture over hot pasta, tossing quickly. The residual heat will cook the eggs into a creamy sauce. Add pasta water tablespoon by tablespoon if needed.</p>
<blockquote>The secret to perfect carbonara: never add the eggs while the pan is on heat, or you'll get scrambled eggs!</blockquote>
<h2>Serving</h2>
<p>Serve immediately with extra Pecorino and black pepper on top. Pairs beautifully with a crisp white wine.</p>
<p><strong>Prep time:</strong> 10 min | <strong>Cook time:</strong> 15 min | <strong>Serves:</strong> 4</p>`,
          backgroundColor: '#fffbeb',
          textColor: '#78350f',
          accentColor: '#d97706',
          fontSize: 16,
          lineHeight: 1.8,
        },
      },
    ],
    settings: {
      maxWidth: 700,
      fontFamily: "'Georgia', serif",
      backgroundColor: '#fffbeb',
    },
    metadata: {
      title: 'Classic Italian Pasta Carbonara',
      description: 'An authentic Roman recipe that takes just 20 minutes to prepare',
      language: 'en',
    },
  },
  {
    id: 'white-tech',
    name: 'Tech Blog',
    description: 'Technical article / programming blog post',
    style: 'tech',
    thumbnail: '💻',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'article-header' as const,
        order: 0,
        props: {
          title: 'Understanding Web Performance: A Complete Guide to Core Web Vitals',
          subtitle: 'Everything you need to know about LCP, FID, and CLS in 2024',
          authorName: 'Alex Developer',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          category: 'Web Development',
          featuredImageUrl: '',
          backgroundColor: '#0f172a',
          textColor: '#e2e8f0',
          accentColor: '#38bdf8',
        },
      },
      {
        id: uuidv4(),
        type: 'article-content' as const,
        order: 1,
        props: {
          bodyHtml: `<p>Web performance directly impacts user experience, SEO rankings, and conversion rates. Google's Core Web Vitals have become the standard metrics for measuring real-world user experience on the web.</p>
<h2>What Are Core Web Vitals?</h2>
<p>Core Web Vitals are a set of three specific metrics that Google considers essential for delivering a great user experience:</p>
<ul>
<li><strong>LCP (Largest Contentful Paint)</strong> — measures loading performance. Should occur within 2.5 seconds.</li>
<li><strong>FID (First Input Delay)</strong> — measures interactivity. Should be less than 100 milliseconds.</li>
<li><strong>CLS (Cumulative Layout Shift)</strong> — measures visual stability. Should be less than 0.1.</li>
</ul>
<h2>Optimizing LCP</h2>
<p>The most common causes of poor LCP include slow server response times, render-blocking resources, and slow resource load times. Key strategies:</p>
<ul>
<li>Use a CDN and optimize server response times</li>
<li>Preload critical resources with &lt;link rel="preload"&gt;</li>
<li>Optimize and compress images (use WebP/AVIF formats)</li>
<li>Implement lazy loading for below-the-fold content</li>
</ul>
<h2>Reducing CLS</h2>
<p>Layout shifts are frustrating for users. Always include width and height attributes on images and video elements. Use CSS aspect-ratio for responsive containers.</p>
<blockquote>Performance is not just a technical metric — it's a user experience fundamental that directly impacts your bottom line.</blockquote>
<h2>Tools for Measurement</h2>
<p>Use Lighthouse, PageSpeed Insights, and Chrome DevTools Performance panel to measure and monitor your Core Web Vitals. Set up Real User Monitoring (RUM) for production data.</p>`,
          backgroundColor: '#0f172a',
          textColor: '#e2e8f0',
          accentColor: '#38bdf8',
          fontSize: 16,
          lineHeight: 1.8,
        },
      },
    ],
    settings: {
      maxWidth: 740,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      backgroundColor: '#0f172a',
      textColor: '#e2e8f0',
    },
    metadata: {
      title: 'Understanding Web Performance: A Complete Guide to Core Web Vitals',
      description: 'Everything you need to know about LCP, FID, and CLS',
      language: 'en',
    },
  },
]

export function getWhiteTemplateByStyle(style: string): WhiteTemplate | undefined {
  return whiteTemplates.find((t) => t.style === style)
}
