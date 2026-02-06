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
// WHITE - HERO BLOCKS (8 variants)
// ============================================

export interface WhiteHeroV1Block extends BlockBase {
  type: 'white-hero-v1'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnUrl: string
    btnText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeroV2Block extends BlockBase {
  type: 'white-hero-v2'
  props: {
    title: string
    subtitle: string
    slug: string
    imageUrl: string
    avatars: { imageUrl: string; name: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeroV3Block extends BlockBase {
  type: 'white-hero-v3'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnUrl: string
    btnText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeroV4Block extends BlockBase {
  type: 'white-hero-v4'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnUrl: string
    btnText: string
    features: string[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeroV5Block extends BlockBase {
  type: 'white-hero-v5'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    backgroundImageUrl: string
    btnUrl: string
    btnText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeroV6Block extends BlockBase {
  type: 'white-hero-v6'
  props: {
    title: string
    subtitle: string
    backgroundImageUrl: string
    btnUrl: string
    btnText: string
    rating: string
    ratingText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeroV7Block extends BlockBase {
  type: 'white-hero-v7'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    stats: { value: string; label: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeroV8Block extends BlockBase {
  type: 'white-hero-v8'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnUrl: string
    btnText: string
    badgeText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - HEADER BLOCKS (5 variants)
// ============================================

export interface WhiteHeaderNavItem {
  label: string
  url: string
}

export interface WhiteHeaderV1Block extends BlockBase {
  type: 'white-header-v1'
  props: {
    logoText: string
    logoImageUrl: string
    navItems: WhiteHeaderNavItem[]
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeaderV2Block extends BlockBase {
  type: 'white-header-v2'
  props: {
    logoText: string
    logoImageUrl: string
    navItems: WhiteHeaderNavItem[]
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeaderV3Block extends BlockBase {
  type: 'white-header-v3'
  props: {
    logoText: string
    desktopLogoUrl: string
    mobileLogoUrl: string
    navItems: WhiteHeaderNavItem[]
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeaderV4Block extends BlockBase {
  type: 'white-header-v4'
  props: {
    logoText: string
    logoImageUrl: string
    navItems: WhiteHeaderNavItem[]
    phone: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteHeaderV5Block extends BlockBase {
  type: 'white-header-v5'
  props: {
    logoText: string
    logoImageUrl: string
    navItems: WhiteHeaderNavItem[]
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - CARDS BLOCKS (8 variants)
// ============================================

export interface WhiteCardsV1Block extends BlockBase {
  type: 'white-cards-v1'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteCardsV2Block extends BlockBase {
  type: 'white-cards-v2'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string; imageUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteCardsV3Block extends BlockBase {
  type: 'white-cards-v3'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string; iconUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteCardsV4Block extends BlockBase {
  type: 'white-cards-v4'
  props: {
    title: string
    items: { title: string; subtitle: string; imageUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteCardsV5Block extends BlockBase {
  type: 'white-cards-v5'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string; imageUrl: string; btnText: string; btnUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteCardsV6Block extends BlockBase {
  type: 'white-cards-v6'
  props: {
    title: string
    items: { title: string; subtitle: string; number: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteCardsV7Block extends BlockBase {
  type: 'white-cards-v7'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteCardsV8Block extends BlockBase {
  type: 'white-cards-v8'
  props: {
    title: string
    items: { imageUrl: string; title: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - TEXTBLOCK BLOCKS (16 variants)
// ============================================

export interface WhiteTextblockV1Block extends BlockBase {
  type: 'white-textblock-v1'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    items: { title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV2Block extends BlockBase {
  type: 'white-textblock-v2'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV3Block extends BlockBase {
  type: 'white-textblock-v3'
  props: {
    title: string
    subtitle: string
    address: string
    phone: string
    email: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV4Block extends BlockBase {
  type: 'white-textblock-v4'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV5Block extends BlockBase {
  type: 'white-textblock-v5'
  props: {
    title: string
    subtitle: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV6Block extends BlockBase {
  type: 'white-textblock-v6'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV7Block extends BlockBase {
  type: 'white-textblock-v7'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV8Block extends BlockBase {
  type: 'white-textblock-v8'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV9Block extends BlockBase {
  type: 'white-textblock-v9'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV10Block extends BlockBase {
  type: 'white-textblock-v10'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string; imageUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV11Block extends BlockBase {
  type: 'white-textblock-v11'
  props: {
    title: string
    subtitle: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV12Block extends BlockBase {
  type: 'white-textblock-v12'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV13Block extends BlockBase {
  type: 'white-textblock-v13'
  props: {
    title: string
    subtitle: string
    items: string[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV14Block extends BlockBase {
  type: 'white-textblock-v14'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV15Block extends BlockBase {
  type: 'white-textblock-v15'
  props: {
    title: string
    items: { title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteTextblockV16Block extends BlockBase {
  type: 'white-textblock-v16'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - FOOTER BLOCKS (6 variants)
// ============================================

export interface WhiteFooterV1Block extends BlockBase {
  type: 'white-footer-v1'
  props: {
    logoText: string
    description: string
    links: { label: string; url: string }[]
    copyright: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteFooterV2Block extends BlockBase {
  type: 'white-footer-v2'
  props: {
    logoText: string
    description: string
    columns: { title: string; links: { label: string; url: string }[] }[]
    copyright: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteFooterV3Block extends BlockBase {
  type: 'white-footer-v3'
  props: {
    logoText: string
    description: string
    links: { label: string; url: string }[]
    socialLinks: { platform: string; url: string }[]
    copyright: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteFooterV4Block extends BlockBase {
  type: 'white-footer-v4'
  props: {
    logoText: string
    address: string
    phone: string
    email: string
    socialLinks: { platform: string; url: string }[]
    copyright: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteFooterV5Block extends BlockBase {
  type: 'white-footer-v5'
  props: {
    logoText: string
    description: string
    columns: { title: string; links: { label: string; url: string }[] }[]
    phone: string
    email: string
    copyright: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteFooterV6Block extends BlockBase {
  type: 'white-footer-v6'
  props: {
    logoText: string
    description: string
    links: { label: string; url: string }[]
    copyright: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - GALLERY BLOCKS (4 variants)
// ============================================

export interface WhiteGalleryV1Block extends BlockBase {
  type: 'white-gallery-v1'
  props: {
    title: string
    subtitle: string
    items: { imageUrl: string; title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteGalleryV2Block extends BlockBase {
  type: 'white-gallery-v2'
  props: {
    title: string
    subtitle: string
    items: { imageUrl: string; title: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteGalleryV3Block extends BlockBase {
  type: 'white-gallery-v3'
  props: {
    title: string
    items: { imageUrl: string; title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteGalleryV4Block extends BlockBase {
  type: 'white-gallery-v4'
  props: {
    title: string
    subtitle: string
    items: { imageUrl: string; title: string }[]
    columns: number
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - ACCORDION BLOCKS (5 variants)
// ============================================

export interface WhiteAccordionItem {
  title: string
  content: string
}

export interface WhiteAccordionV1Block extends BlockBase {
  type: 'white-accordion-v1'
  props: {
    title: string
    subtitle: string
    items: WhiteAccordionItem[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteAccordionV2Block extends BlockBase {
  type: 'white-accordion-v2'
  props: {
    items: WhiteAccordionItem[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteAccordionV3Block extends BlockBase {
  type: 'white-accordion-v3'
  props: {
    title: string
    items: WhiteAccordionItem[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteAccordionV4Block extends BlockBase {
  type: 'white-accordion-v4'
  props: {
    title: string
    subtitle: string
    items: WhiteAccordionItem[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteAccordionV5Block extends BlockBase {
  type: 'white-accordion-v5'
  props: {
    title: string
    items: WhiteAccordionItem[]
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - BANNER BLOCKS (3 variants)
// ============================================

export interface WhiteBannerV1Block extends BlockBase {
  type: 'white-banner-v1'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteBannerV2Block extends BlockBase {
  type: 'white-banner-v2'
  props: {
    title: string
    subtitle: string
    imageUrl: string
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteBannerV3Block extends BlockBase {
  type: 'white-banner-v3'
  props: {
    title: string
    subtitle: string
    backgroundImageUrl: string
    btnText: string
    btnUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - SUBSCRIPTION BLOCKS (4 variants)
// ============================================

export interface WhiteSubscriptionV1Block extends BlockBase {
  type: 'white-subscription-v1'
  props: {
    title: string
    subtitle: string
    btnText: string
    thankMessage: string
    placeholderText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteSubscriptionV2Block extends BlockBase {
  type: 'white-subscription-v2'
  props: {
    title: string
    subtitle: string
    btnText: string
    thankMessage: string
    placeholderText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteSubscriptionV3Block extends BlockBase {
  type: 'white-subscription-v3'
  props: {
    title: string
    subtitle: string
    btnText: string
    thankMessage: string
    placeholderText: string
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteSubscriptionV4Block extends BlockBase {
  type: 'white-subscription-v4'
  props: {
    title: string
    subtitle: string
    btnText: string
    thankMessage: string
    placeholderText: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - SWIPER BLOCKS (2 variants)
// ============================================

export interface WhiteSwiperV1Block extends BlockBase {
  type: 'white-swiper-v1'
  props: {
    title: string
    items: { imageUrl: string; title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteSwiperV2Block extends BlockBase {
  type: 'white-swiper-v2'
  props: {
    title: string
    subtitle: string
    items: { imageUrl: string; title: string; subtitle: string; btnText: string; btnUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - FORM BLOCKS (2 variants)
// ============================================

export interface WhiteFormField {
  label: string
  placeholder: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  required: boolean
}

export interface WhiteFormV1Block extends BlockBase {
  type: 'white-form-v1'
  props: {
    title: string
    subtitle: string
    fields: WhiteFormField[]
    btnText: string
    thankMessage: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteFormV2Block extends BlockBase {
  type: 'white-form-v2'
  props: {
    title: string
    subtitle: string
    fields: WhiteFormField[]
    btnText: string
    thankMessage: string
    imageUrl: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// WHITE - LIST BLOCKS (4 variants)
// ============================================

export interface WhiteListV1Block extends BlockBase {
  type: 'white-list-v1'
  props: {
    title: string
    items: { title: string; subtitle: string; imageUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteListV2Block extends BlockBase {
  type: 'white-list-v2'
  props: {
    title: string
    items: { title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteListV3Block extends BlockBase {
  type: 'white-list-v3'
  props: {
    title: string
    subtitle: string
    items: { title: string; subtitle: string; iconUrl: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface WhiteListV4Block extends BlockBase {
  type: 'white-list-v4'
  props: {
    title: string
    items: { title: string; subtitle: string }[]
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

// ============================================
// PRELANDING LAYOUT BLOCKS
// ============================================

export interface FloatingElement {
  imageUrl: string
  position: 'left' | 'right'
  size: number
}

export interface HeroBannerBlock extends BlockBase {
  type: 'hero-banner'
  props: {
    backgroundImageUrl: string
    backgroundOverlayColor: string
    backgroundOverlayOpacity: number
    logoUrl: string
    logoWidth: number
    headline: string
    subtitle: string
    ctaText: string
    ctaUrl: string
    ctaColor: string
    ctaGradient: string
    showFloatingCoins: boolean
    floatingElements: FloatingElement[]
    deviceImageUrl: string
    clickAnywhere: boolean
    minHeight: '100vh' | '80vh' | '60vh' | 'auto'
    textAlign: 'center' | 'left'
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface CasinoVitrineItem {
  logoUrl: string
  name: string
  badge: string
  reputationText: string
  rating: number
  bonusLine1: string
  bonusLine2: string
  ctaText: string
  ctaUrl: string
  paymentIcons: string[]
}

export interface CasinoVitrineBlock extends BlockBase {
  type: 'casino-vitrine'
  props: {
    title: string
    updatedDate: string
    items: CasinoVitrineItem[]
    cardBorderColor: string
    cardBackgroundColor: string
    ctaColor: string
    ctaTextColor: string
    badgeColor: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface GameGridGame {
  imageUrl: string
  title: string
  url: string
}

export interface GameGridBlock extends BlockBase {
  type: 'game-grid'
  props: {
    backgroundImageUrl: string
    games: GameGridGame[]
    columns: 2 | 3 | 4
    centerTitle: string
    centerSubtitle: string
    ctaText: string
    ctaUrl: string
    ctaColor: string
    showCenterBlock: boolean
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface AgeGateBlock extends BlockBase {
  type: 'age-gate'
  props: {
    title: string
    message: string
    confirmText: string
    declineText: string
    confirmUrl: string
    declineUrl: string
    overlayColor: string
    overlayOpacity: number
    modalBackgroundColor: string
    confirmButtonColor: string
    declineButtonColor: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

export interface AdvantagesBarItem {
  iconUrl: string
  text: string
}

export interface AdvantagesBarBlock extends BlockBase {
  type: 'advantages-bar'
  props: {
    items: AdvantagesBarItem[]
    marqueeOnMobile: boolean
    backgroundColor: string
    textColor: string
    iconSize: number
    gap: number
  }
}

export interface TopBarBadge {
  iconUrl: string
  text: string
}

export interface TopBarBlock extends BlockBase {
  type: 'top-bar'
  props: {
    headline: string
    badges: TopBarBadge[]
    backgroundGradient: string
    headlineColor: string
    badgeColor: string
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
  | HeroBannerBlock
  | CasinoVitrineBlock
  | GameGridBlock
  | AgeGateBlock
  | AdvantagesBarBlock
  | TopBarBlock

export type WhiteBlock =
  | ArticleHeaderBlock
  | ArticleContentBlock
  | ArticleSidebarBlock
  // Hero
  | WhiteHeroV1Block
  | WhiteHeroV2Block
  | WhiteHeroV3Block
  | WhiteHeroV4Block
  | WhiteHeroV5Block
  | WhiteHeroV6Block
  | WhiteHeroV7Block
  | WhiteHeroV8Block
  // Header
  | WhiteHeaderV1Block
  | WhiteHeaderV2Block
  | WhiteHeaderV3Block
  | WhiteHeaderV4Block
  | WhiteHeaderV5Block
  // Cards
  | WhiteCardsV1Block
  | WhiteCardsV2Block
  | WhiteCardsV3Block
  | WhiteCardsV4Block
  | WhiteCardsV5Block
  | WhiteCardsV6Block
  | WhiteCardsV7Block
  | WhiteCardsV8Block
  // TextBlock
  | WhiteTextblockV1Block
  | WhiteTextblockV2Block
  | WhiteTextblockV3Block
  | WhiteTextblockV4Block
  | WhiteTextblockV5Block
  | WhiteTextblockV6Block
  | WhiteTextblockV7Block
  | WhiteTextblockV8Block
  | WhiteTextblockV9Block
  | WhiteTextblockV10Block
  | WhiteTextblockV11Block
  | WhiteTextblockV12Block
  | WhiteTextblockV13Block
  | WhiteTextblockV14Block
  | WhiteTextblockV15Block
  | WhiteTextblockV16Block
  // Footer
  | WhiteFooterV1Block
  | WhiteFooterV2Block
  | WhiteFooterV3Block
  | WhiteFooterV4Block
  | WhiteFooterV5Block
  | WhiteFooterV6Block
  // Gallery
  | WhiteGalleryV1Block
  | WhiteGalleryV2Block
  | WhiteGalleryV3Block
  | WhiteGalleryV4Block
  // Accordion
  | WhiteAccordionV1Block
  | WhiteAccordionV2Block
  | WhiteAccordionV3Block
  | WhiteAccordionV4Block
  | WhiteAccordionV5Block
  // Banner
  | WhiteBannerV1Block
  | WhiteBannerV2Block
  | WhiteBannerV3Block
  // Subscription
  | WhiteSubscriptionV1Block
  | WhiteSubscriptionV2Block
  | WhiteSubscriptionV3Block
  | WhiteSubscriptionV4Block
  // Swiper
  | WhiteSwiperV1Block
  | WhiteSwiperV2Block
  // Form
  | WhiteFormV1Block
  | WhiteFormV2Block
  // List
  | WhiteListV1Block
  | WhiteListV2Block
  | WhiteListV3Block
  | WhiteListV4Block

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
