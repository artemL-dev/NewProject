import type { BlockDefinition, BlockType, Block } from '@/types/blocks'
import type { BlockRegistryEntry, BlockComponent, BlockEditorComponent } from './types'

// Slot blocks
import { SlotMachineBlock as SlotMachineComponent, SlotMachineEditor, slotMachineDefinition, createSlotMachineBlock } from './slot/SlotMachine'

// Prelanding blocks
import { NewsArticleBlock as NewsArticleComponent, NewsArticleEditor, newsArticleDefinition, createNewsArticleBlock } from './prelanding/NewsArticle'
import { CountdownBonusBlock as CountdownBonusComponent, CountdownBonusEditor, countdownBonusDefinition, createCountdownBonusBlock } from './prelanding/CountdownBonus'
import { ModalPopupBlock as ModalPopupComponent, ModalPopupEditor, modalPopupDefinition, createModalPopupBlock } from './prelanding/ModalPopup'
import { QuizSurveyBlock as QuizSurveyComponent, QuizSurveyEditor, quizSurveyDefinition, createQuizSurveyBlock } from './prelanding/QuizSurvey'
import { WheelOfFortuneBlock as WheelOfFortuneComponent, WheelOfFortuneEditor, wheelOfFortuneDefinition, createWheelOfFortuneBlock } from './prelanding/WheelOfFortune'
import { HeroBannerBlock as HeroBannerComponent, HeroBannerEditor, heroBannerDefinition, createHeroBannerBlock } from './prelanding/HeroBanner'
import { CasinoVitrineBlock as CasinoVitrineComponent, CasinoVitrineEditor, casinoVitrineDefinition, createCasinoVitrineBlock } from './prelanding/CasinoVitrine'
import { GameGridBlock as GameGridComponent, GameGridEditor, gameGridDefinition, createGameGridBlock } from './prelanding/GameGrid'
import { AgeGateBlock as AgeGateComponent, AgeGateEditor, ageGateDefinition, createAgeGateBlock } from './prelanding/AgeGate'
import { AdvantagesBarBlock as AdvantagesBarComponent, AdvantagesBarEditor, advantagesBarDefinition, createAdvantagesBarBlock } from './prelanding/AdvantagesBar'
import { TopBarBlock as TopBarComponent, TopBarEditor, topBarDefinition, createTopBarBlock } from './prelanding/TopBar'

// White blocks
import { ArticleHeaderBlock as ArticleHeaderComponent, ArticleHeaderEditor, articleHeaderDefinition, createArticleHeaderBlock } from './white/ArticleHeader'
import { ArticleContentBlock as ArticleContentComponent, ArticleContentEditor, articleContentDefinition, createArticleContentBlock } from './white/ArticleContent'
import { ArticleSidebarBlock as ArticleSidebarComponent, ArticleSidebarEditor, articleSidebarDefinition, createArticleSidebarBlock } from './white/ArticleSidebar'

// Registry map
const registry: Map<BlockType, BlockRegistryEntry> = new Map()

// Register slot blocks
registry.set('slot-machine', {
  definition: slotMachineDefinition,
  component: SlotMachineComponent,
  editor: SlotMachineEditor,
  defaultBlock: createSlotMachineBlock,
})

// Register prelanding blocks
registry.set('news-article', {
  definition: newsArticleDefinition,
  component: NewsArticleComponent,
  editor: NewsArticleEditor,
  defaultBlock: createNewsArticleBlock,
})

registry.set('countdown-bonus', {
  definition: countdownBonusDefinition,
  component: CountdownBonusComponent,
  editor: CountdownBonusEditor,
  defaultBlock: createCountdownBonusBlock,
})

registry.set('modal-popup', {
  definition: modalPopupDefinition,
  component: ModalPopupComponent,
  editor: ModalPopupEditor,
  defaultBlock: createModalPopupBlock,
})

registry.set('quiz-survey', {
  definition: quizSurveyDefinition,
  component: QuizSurveyComponent,
  editor: QuizSurveyEditor,
  defaultBlock: createQuizSurveyBlock,
})

registry.set('wheel-of-fortune', {
  definition: wheelOfFortuneDefinition,
  component: WheelOfFortuneComponent,
  editor: WheelOfFortuneEditor,
  defaultBlock: createWheelOfFortuneBlock,
})

registry.set('hero-banner', {
  definition: heroBannerDefinition,
  component: HeroBannerComponent,
  editor: HeroBannerEditor,
  defaultBlock: createHeroBannerBlock,
})

registry.set('casino-vitrine', {
  definition: casinoVitrineDefinition,
  component: CasinoVitrineComponent,
  editor: CasinoVitrineEditor,
  defaultBlock: createCasinoVitrineBlock,
})

registry.set('game-grid', {
  definition: gameGridDefinition,
  component: GameGridComponent,
  editor: GameGridEditor,
  defaultBlock: createGameGridBlock,
})

registry.set('age-gate', {
  definition: ageGateDefinition,
  component: AgeGateComponent,
  editor: AgeGateEditor,
  defaultBlock: createAgeGateBlock,
})

registry.set('advantages-bar', {
  definition: advantagesBarDefinition,
  component: AdvantagesBarComponent,
  editor: AdvantagesBarEditor,
  defaultBlock: createAdvantagesBarBlock,
})

registry.set('top-bar', {
  definition: topBarDefinition,
  component: TopBarComponent,
  editor: TopBarEditor,
  defaultBlock: createTopBarBlock,
})

// Register white blocks
registry.set('article-header', {
  definition: articleHeaderDefinition,
  component: ArticleHeaderComponent,
  editor: ArticleHeaderEditor,
  defaultBlock: createArticleHeaderBlock,
})

registry.set('article-content', {
  definition: articleContentDefinition,
  component: ArticleContentComponent,
  editor: ArticleContentEditor,
  defaultBlock: createArticleContentBlock,
})

registry.set('article-sidebar', {
  definition: articleSidebarDefinition,
  component: ArticleSidebarComponent,
  editor: ArticleSidebarEditor,
  defaultBlock: createArticleSidebarBlock,
})

// Export registry functions
export function getBlockEntry(type: BlockType): BlockRegistryEntry | undefined {
  return registry.get(type)
}

export function getBlockComponent(type: BlockType): BlockComponent<any> | undefined {
  return registry.get(type)?.component
}

export function getBlockEditor(type: BlockType): BlockEditorComponent<any> | undefined {
  return registry.get(type)?.editor
}

export function getBlockDefinition(type: BlockType): BlockDefinition | undefined {
  return registry.get(type)?.definition
}

export function createBlock(type: BlockType): Block | undefined {
  return registry.get(type)?.defaultBlock()
}

export function getAllDefinitions(): BlockDefinition[] {
  return Array.from(registry.values()).map(entry => entry.definition)
}

export function getDefinitionsByCategory(category: string): BlockDefinition[] {
  return getAllDefinitions().filter(def => def.category === category)
}

export function getSlotBlocks(): BlockDefinition[] {
  return getDefinitionsByCategory('slot')
}

export function getGeneralBlocks(): BlockDefinition[] {
  return getDefinitionsByCategory('general')
}

export function getCommonBlocks(): BlockDefinition[] {
  return getDefinitionsByCategory('common')
}

export function getPrelandingBlocks(): BlockDefinition[] {
  return getDefinitionsByCategory('prelanding')
}

export function getWhiteBlocks(): BlockDefinition[] {
  return getDefinitionsByCategory('white')
}

export { registry }
