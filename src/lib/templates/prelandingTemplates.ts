import type { Block } from '@/types/blocks'
import type { PageSettings, PageMetadata } from '@/types/page'
import { v4 as uuidv4 } from 'uuid'

export interface PrelandingTemplate {
  id: string
  name: string
  description: string
  thumbnail: string
  blocks: () => Block[]
  settings: Partial<PageSettings>
  metadata: Partial<PageMetadata>
}

export const prelandingTemplates: PrelandingTemplate[] = [
  {
    id: 'prelanding-news-story',
    name: 'Success Story',
    description: 'News article about a success story with CTA',
    thumbnail: '📰',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'news-article' as const,
        order: 0,
        props: {
          headline: 'Local Man Discovers Simple Method to Earn Extra Income Online',
          subheadline: 'Former factory worker now makes over €5,000 per month from home',
          bodyHtml: `<p>John Smith, 42, from Berlin, never imagined he would find a way to earn a living from his laptop. After losing his job at a local manufacturing plant, he stumbled upon an unusual opportunity that changed his life.</p>
<p>"At first, I was skeptical," John told our reporter. "But after trying it for just one week, I saw my first results. Within a month, I was earning more than my old salary."</p>
<p>The method John uses is now available to anyone. Experts say it takes just 20 minutes per day to get started, and no special skills or experience are required.</p>
<p>"I wish I had found this sooner," John says with a smile. "Now I have more time for my family and I'm finally financially free."</p>`,
          authorName: 'Maria Schmidt',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          sourceName: 'Daily Financial Report',
          featuredImageUrl: '',
          ctaText: 'Try It Now — Free Registration',
          ctaUrl: '#',
          ctaColor: '#16a34a',
          ctaPosition: 'both' as const,
          showAuthor: true,
          showDate: true,
          showShareButtons: true,
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          accentColor: '#2563eb',
        },
      },
    ],
    settings: {
      maxWidth: 640,
      backgroundColor: '#f3f4f6',
    },
    metadata: {
      title: 'Local Man Discovers Simple Method to Earn Extra Income Online',
      description: 'Success story about earning from home',
      language: 'en',
    },
  },
  {
    id: 'prelanding-countdown',
    name: 'Countdown Offer',
    description: 'Urgency-driven bonus with countdown timer',
    thumbnail: '⏱️',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'countdown-bonus' as const,
        order: 0,
        props: {
          countdownMinutes: 10,
          countdownEndAction: 'reset' as const,
          bonusTitle: 'EXCLUSIVE WELCOME BONUS',
          bonusAmount: '500 EUR',
          bonusSubtitle: 'Register now and receive your bonus instantly',
          urgencyText: 'This offer expires soon!',
          showUrgencyPulse: true,
          ctaText: 'CLAIM MY BONUS NOW',
          ctaUrl: '#',
          backgroundColor: '#1e1b4b',
          textColor: '#ffffff',
          accentColor: '#fbbf24',
          ctaColor: '#16a34a',
        },
      },
    ],
    settings: {
      maxWidth: 480,
      backgroundColor: '#1e1b4b',
    },
    metadata: {
      title: 'Exclusive Welcome Bonus',
      description: 'Claim your welcome bonus before time runs out',
      language: 'en',
    },
  },
  {
    id: 'prelanding-quiz',
    name: 'Quiz Funnel',
    description: 'Interactive quiz leading to CTA',
    thumbnail: '❓',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'quiz-survey' as const,
        order: 0,
        props: {
          title: 'Find Your Perfect Investment Strategy',
          subtitle: 'Answer 3 quick questions to get a personalized recommendation',
          questions: [
            {
              id: uuidv4(),
              question: 'What is your primary financial goal?',
              answers: ['Build wealth over time', 'Generate passive income', 'Quick returns', 'Save for retirement'],
              imageUrl: '',
            },
            {
              id: uuidv4(),
              question: 'How much can you invest per month?',
              answers: ['Less than €100', '€100–€500', '€500–€2,000', 'More than €2,000'],
              imageUrl: '',
            },
            {
              id: uuidv4(),
              question: 'What is your experience with investing?',
              answers: ['Complete beginner', 'Some experience', 'Intermediate', 'Advanced'],
              imageUrl: '',
            },
          ],
          resultTitle: 'Your Strategy is Ready!',
          resultMessage: 'Based on your answers, we have identified the perfect investment strategy for you. Click below to access your personalized plan.',
          resultImageUrl: '',
          ctaText: 'Get My Free Strategy',
          ctaUrl: '#',
          showProgressBar: true,
          showQuestionNumber: true,
          animateTransitions: true,
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          accentColor: '#6366f1',
          ctaColor: '#16a34a',
        },
      },
    ],
    settings: {
      maxWidth: 520,
      backgroundColor: '#f9fafb',
    },
    metadata: {
      title: 'Find Your Perfect Investment Strategy',
      description: 'Quick quiz to find your ideal investment approach',
      language: 'en',
    },
  },
  {
    id: 'prelanding-wheel',
    name: 'Spin to Win',
    description: 'Wheel of fortune with guaranteed prize',
    thumbnail: '🎡',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'wheel-of-fortune' as const,
        order: 0,
        props: {
          title: 'Spin & Win Your Bonus!',
          subtitle: 'Every spin is a guaranteed winner',
          segments: [
            { id: uuidv4(), text: '€100', color: '#ef4444', prize: '€100 Bonus', isWinning: false, weight: 20 },
            { id: uuidv4(), text: '€200', color: '#3b82f6', prize: '€200 Bonus', isWinning: false, weight: 15 },
            { id: uuidv4(), text: '€500', color: '#22c55e', prize: '€500 Bonus', isWinning: true, weight: 5 },
            { id: uuidv4(), text: '€50', color: '#f59e0b', prize: '€50 Bonus', isWinning: false, weight: 30 },
            { id: uuidv4(), text: '€1000', color: '#8b5cf6', prize: '€1000 JACKPOT', isWinning: false, weight: 2 },
            { id: uuidv4(), text: '€150', color: '#ec4899', prize: '€150 Bonus', isWinning: false, weight: 18 },
            { id: uuidv4(), text: '€300', color: '#14b8a6', prize: '€300 Bonus', isWinning: false, weight: 8 },
            { id: uuidv4(), text: '€75', color: '#f97316', prize: '€75 Bonus', isWinning: false, weight: 25 },
          ],
          spinDuration: 4000,
          numberOfSpins: 5,
          winSegmentIndex: 2,
          winTitle: 'CONGRATULATIONS!',
          winMessage: 'You won a special bonus! Claim it now before it expires.',
          ctaText: 'CLAIM MY PRIZE',
          ctaUrl: '#',
          spinButtonText: 'SPIN NOW!',
          spinButtonColor: '#22c55e',
          backgroundColor: '#1e1b4b',
          textColor: '#ffffff',
          accentColor: '#fbbf24',
          ctaColor: '#22c55e',
        },
      },
    ],
    settings: {
      maxWidth: 480,
      backgroundColor: '#1e1b4b',
    },
    metadata: {
      title: 'Spin & Win',
      description: 'Spin the wheel to win your bonus',
      language: 'en',
    },
  },
  {
    id: 'prelanding-combo',
    name: 'Full Funnel',
    description: 'News article + countdown bonus combo',
    thumbnail: '🔥',
    blocks: () => [
      {
        id: uuidv4(),
        type: 'news-article' as const,
        order: 0,
        props: {
          headline: 'Breaking: New Platform Pays Users for Simple Online Tasks',
          subheadline: 'Thousands of Europeans are already benefiting from this opportunity',
          bodyHtml: `<p>A revolutionary new platform is making waves across Europe, allowing ordinary people to earn substantial income from the comfort of their homes.</p>
<p>The platform, which launched just 6 months ago, has already attracted over 100,000 users who report earning between €200 and €5,000 per month.</p>
<p>"The registration process took less than 2 minutes," says Hans Mueller from Munich. "I started seeing results on my very first day."</p>`,
          authorName: 'Emma Wagner',
          authorAvatar: '',
          publishDate: new Date().toISOString().split('T')[0],
          sourceName: 'European Business Today',
          featuredImageUrl: '',
          ctaText: 'Read More',
          ctaUrl: '#',
          ctaColor: '#2563eb',
          ctaPosition: 'bottom' as const,
          showAuthor: true,
          showDate: true,
          showShareButtons: false,
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          accentColor: '#2563eb',
        },
      },
      {
        id: uuidv4(),
        type: 'countdown-bonus' as const,
        order: 1,
        props: {
          countdownMinutes: 15,
          countdownEndAction: 'reset' as const,
          bonusTitle: 'LIMITED TIME BONUS',
          bonusAmount: '€250 FREE',
          bonusSubtitle: 'Available for the next registrations only',
          urgencyText: 'Hurry! Only a few spots remaining',
          showUrgencyPulse: true,
          ctaText: 'REGISTER NOW — FREE',
          ctaUrl: '#',
          backgroundColor: '#0f172a',
          textColor: '#ffffff',
          accentColor: '#fbbf24',
          ctaColor: '#22c55e',
        },
      },
    ],
    settings: {
      maxWidth: 520,
      backgroundColor: '#f3f4f6',
    },
    metadata: {
      title: 'New Platform Pays Users for Simple Online Tasks',
      description: 'Register now and receive your welcome bonus',
      language: 'en',
    },
  },
]
