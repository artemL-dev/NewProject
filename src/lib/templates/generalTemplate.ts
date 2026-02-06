import { v4 as uuidv4 } from 'uuid'
import type { Block } from '@/types/blocks'
import type { PageSettings, PageMetadata } from '@/types/page'

export const generalTemplateBlocks: Block[] = [
  {
    id: uuidv4(),
    type: 'slot-machine',
    order: 0,
    props: {
      title: 'LUCKY SPIN',
      reelsCount: 3,
      rowsCount: 1,
      symbols: [
        { id: uuidv4(), image: '🍒', value: 10, weight: 30 },
        { id: uuidv4(), image: '🍋', value: 20, weight: 25 },
        { id: uuidv4(), image: '🍊', value: 30, weight: 20 },
        { id: uuidv4(), image: '🍇', value: 40, weight: 15 },
        { id: uuidv4(), image: '💎', value: 100, weight: 7 },
        { id: uuidv4(), image: '7️⃣', value: 200, weight: 3 },
      ],
      initialBalance: 500,
      betOptions: [5, 10, 25, 50],
      defaultBet: 5,
      spinDuration: 1500,
      winChance: 35,

      backgroundColor: '#0f172a',
      reelBackgroundColor: '#1e293b',
      frameColor: '#f59e0b',
      textColor: '#ffffff',
      accentColor: '#f59e0b',
      spinButtonColor: '#10b981',
      spinButtonText: 'SPIN',

      showWinAnimation: true,
      winMessageTitle: 'WINNER!',
      ctaText: 'GET BONUS',
      ctaUrl: '#',
      ctaColor: '#10b981',

      showAutoSpin: true,
      showSoundToggle: true,
      autoSpinCount: 10,
    },
  },
]

export const generalTemplateSettings: PageSettings = {
  primaryColor: '#f59e0b',
  secondaryColor: '#10b981',
  backgroundColor: '#0f172a',
  textColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  baseFontSize: 16,
  maxWidth: 480,
  padding: 0,
}

export const generalTemplateMetadata: PageMetadata = {
  title: 'Lucky Spin',
  description: 'Try your luck and win!',
  language: 'en',
}
