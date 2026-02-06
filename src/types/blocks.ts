// Base block interface
export interface BlockBase {
  id: string
  type: string
  order: number
}

// ============================================
// SLOT BLOCKS
// ============================================

export interface SlotMachineSymbol {
  id: string
  image: string
  value: number
  weight?: number
}

export interface SlotMachineBlock extends BlockBase {
  type: 'slot-machine'
  props: {
    // Game settings
    title: string
    reelsCount: number
    rowsCount: number
    symbols: SlotMachineSymbol[]
    initialBalance: number
    betOptions: number[]
    defaultBet: number
    spinDuration: number
    winChance: number

    // Visual settings
    backgroundColor: string
    reelBackgroundColor: string
    frameColor: string
    textColor: string
    accentColor: string
    spinButtonColor: string
    spinButtonText: string

    // Win settings
    showWinAnimation: boolean
    winMessageTitle: string
    ctaText: string
    ctaUrl: string
    ctaColor: string

    // Features
    showAutoSpin: boolean
    showSoundToggle: boolean
    autoSpinCount: number
  }
}

// ============================================
// PRELANDING BLOCKS
// ============================================

export interface NewsArticleBlock extends BlockBase {
  type: 'news-article'
  props: {
    headline: string
    subheadline: string
    bodyHtml: string
    authorName: string
    authorAvatar: string
    publishDate: string
    sourceName: string
    featuredImageUrl: string
    ctaText: string
    ctaUrl: string
    ctaColor: string
    ctaPosition: 'inline' | 'bottom' | 'both'
    showAuthor: boolean
    showDate: boolean
    showShareButtons: boolean
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface CountdownBonusBlock extends BlockBase {
  type: 'countdown-bonus'
  props: {
    countdownMinutes: number
    countdownEndAction: 'reset' | 'hide' | 'show-expired'
    bonusTitle: string
    bonusAmount: string
    bonusSubtitle: string
    urgencyText: string
    showUrgencyPulse: boolean
    ctaText: string
    ctaUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
    ctaColor: string
  }
}

export interface ModalPopupBlock extends BlockBase {
  type: 'modal-popup'
  props: {
    triggerType: 'timer' | 'scroll' | 'exit-intent' | 'click'
    triggerDelay: number
    triggerScrollPercent: number
    title: string
    message: string
    imageUrl: string
    overlayColor: string
    overlayOpacity: number
    modalBackgroundColor: string
    ctaText: string
    ctaUrl: string
    showCloseButton: boolean
    animationType: 'fade' | 'slide-up' | 'scale'
    backgroundColor: string
    textColor: string
    accentColor: string
    ctaColor: string
  }
}

export interface QuizQuestion {
  id: string
  question: string
  answers: string[]
  imageUrl: string
}

export interface QuizSurveyBlock extends BlockBase {
  type: 'quiz-survey'
  props: {
    title: string
    subtitle: string
    questions: QuizQuestion[]
    resultTitle: string
    resultMessage: string
    resultImageUrl: string
    ctaText: string
    ctaUrl: string
    showProgressBar: boolean
    showQuestionNumber: boolean
    animateTransitions: boolean
    backgroundColor: string
    textColor: string
    accentColor: string
    ctaColor: string
  }
}

export interface WheelSegment {
  id: string
  text: string
  color: string
  prize: string
  isWinning: boolean
  weight: number
}

export interface WheelOfFortuneBlock extends BlockBase {
  type: 'wheel-of-fortune'
  props: {
    title: string
    subtitle: string
    segments: WheelSegment[]
    spinDuration: number
    numberOfSpins: number
    winSegmentIndex: number
    winTitle: string
    winMessage: string
    ctaText: string
    ctaUrl: string
    spinButtonText: string
    spinButtonColor: string
    backgroundColor: string
    textColor: string
    accentColor: string
    ctaColor: string
  }
}

// ============================================
// WHITE BLOCKS
// ============================================

export interface ArticleHeaderBlock extends BlockBase {
  type: 'article-header'
  props: {
    title: string
    subtitle: string
    authorName: string
    authorAvatar: string
    publishDate: string
    category: string
    featuredImageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface ArticleContentBlock extends BlockBase {
  type: 'article-content'
  props: {
    bodyHtml: string
    backgroundColor: string
    textColor: string
    accentColor: string
    fontSize: number
    lineHeight: number
  }
}

export interface ArticleSidebarBlock extends BlockBase {
  type: 'article-sidebar'
  props: {
    relatedArticles: { title: string; url: string; imageUrl: string }[]
    categories: { name: string; url: string }[]
    showSearch: boolean
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// UNION TYPES
// ============================================

export type SlotBlock = SlotMachineBlock

export type PrelandingBlock =
  | NewsArticleBlock
  | CountdownBonusBlock
  | ModalPopupBlock
  | QuizSurveyBlock
  | WheelOfFortuneBlock

export type WhiteBlock =
  | ArticleHeaderBlock
  | ArticleContentBlock
  | ArticleSidebarBlock

export type GeneralBlock = never

export type CommonBlock = never

export type Block = SlotBlock | PrelandingBlock | WhiteBlock

export type BlockType = Block['type']

// Block definition for the registry
export interface BlockDefinition {
  type: BlockType
  name: string
  description: string
  icon: string
  category: 'slot' | 'general' | 'common' | 'prelanding' | 'white'
  defaultProps: Record<string, unknown>
}
