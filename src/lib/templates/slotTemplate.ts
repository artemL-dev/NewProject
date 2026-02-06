import { v4 as uuidv4 } from 'uuid'
import type { Block } from '@/types/blocks'
import type { PageSettings, PageMetadata } from '@/types/page'

export const slotTemplateBlocks: Block[] = [
  {
    id: uuidv4(),
    type: 'slot-machine',
    order: 0,
    props: {
      title: 'MEGA JACKPOT',
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
      initialBalance: 1000,
      betOptions: [10, 25, 50, 100],
      defaultBet: 10,
      spinDuration: 2000,
      winChance: 30,

      backgroundColor: '#1a0a2e',
      reelBackgroundColor: '#0d0518',
      frameColor: '#ffd700',
      textColor: '#ffffff',
      accentColor: '#ffd700',
      spinButtonColor: '#22c55e',
      spinButtonText: 'SPIN',

      showWinAnimation: true,
      winMessageTitle: 'YOU WON!',
      ctaText: 'CLAIM PRIZE',
      ctaUrl: '#',
      ctaColor: '#22c55e',

      showAutoSpin: true,
      showSoundToggle: true,
      autoSpinCount: 10,
    },
  },
]

export const slotTemplateSettings: PageSettings = {
  primaryColor: '#ffd700',
  secondaryColor: '#22c55e',
  backgroundColor: '#1a0a2e',
  textColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  baseFontSize: 16,
  maxWidth: 480,
  padding: 0,
}

export const slotTemplateMetadata: PageMetadata = {
  title: 'Mega Jackpot Slot',
  description: 'Play and win big prizes!',
  language: 'en',
}
