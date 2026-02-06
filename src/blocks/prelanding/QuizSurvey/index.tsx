'use client'

import { FC, useState } from 'react'
import type { QuizSurveyBlock as QuizSurveyBlockType, QuizQuestion, BlockDefinition } from '@/types/blocks'
import type { BlockRenderProps, BlockEditorProps } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { Plus, Trash2 } from 'lucide-react'

const defaultQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is your primary financial goal?',
    answers: ['Build savings', 'Pay off debt', 'Invest for retirement', 'Generate passive income'],
    imageUrl: '',
  },
  {
    id: '2',
    question: 'How much experience do you have with investing?',
    answers: ['Complete beginner', 'Some experience', 'Intermediate'],
    imageUrl: '',
  },
  {
    id: '3',
    question: 'What is your preferred investment timeframe?',
    answers: ['Short-term (< 1 year)', 'Medium-term (1-5 years)', 'Long-term (5+ years)', 'Not sure yet'],
    imageUrl: '',
  },
]

export const quizSurveyDefinition: BlockDefinition = {
  type: 'quiz-survey',
  name: 'Quiz / Survey',
  description: 'Mini quiz with 2-5 questions and CTA result',
  icon: 'clipboard-list',
  category: 'prelanding',
  defaultProps: {
    title: 'Find Your Perfect Strategy',
    subtitle: 'Answer a few quick questions to get a personalized recommendation',
    questions: defaultQuestions,
    resultTitle: 'Your Results Are Ready!',
    resultMessage: 'Based on your answers, we have prepared a personalized strategy just for you. Click below to unlock your free recommendation.',
    resultImageUrl: '',
    ctaText: 'Get My Free Strategy',
    ctaUrl: '#',
    showProgressBar: true,
    showQuestionNumber: true,
    animateTransitions: true,
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
    ctaColor: '#22c55e',
  },
}

export const createQuizSurveyBlock = (): QuizSurveyBlockType => ({
  id: uuidv4(),
  type: 'quiz-survey',
  order: 0,
  props: {
    title: 'Find Your Perfect Strategy',
    subtitle: 'Answer a few quick questions to get a personalized recommendation',
    questions: defaultQuestions.map((q) => ({ ...q, id: uuidv4() })),
    resultTitle: 'Your Results Are Ready!',
    resultMessage: 'Based on your answers, we have prepared a personalized strategy just for you. Click below to unlock your free recommendation.',
    resultImageUrl: '',
    ctaText: 'Get My Free Strategy',
    ctaUrl: '#',
    showProgressBar: true,
    showQuestionNumber: true,
    animateTransitions: true,
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
    ctaColor: '#22c55e',
  },
})

// Render Component
export const QuizSurveyBlock: FC<BlockRenderProps<QuizSurveyBlockType>> = ({
  block,
  isSelected,
}) => {
  const { props } = block
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const totalQuestions = props.questions.length
  const isComplete = currentStep >= totalQuestions

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentStep]: answerIndex }))

    // Advance to next question after a short delay
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, 400)
  }

  const currentQuestion = props.questions[currentStep] as QuizQuestion | undefined

  return (
    <div
      className={`relative overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      }}
    >
      {/* Title & Subtitle */}
      <div className="text-center py-6 px-4">
        <h2 className="text-2xl font-bold mb-2">{props.title}</h2>
        {props.subtitle && (
          <p className="text-sm opacity-70">{props.subtitle}</p>
        )}
      </div>

      {/* Progress Bar */}
      {props.showProgressBar && !isComplete && (
        <div className="px-6 mb-4">
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: props.accentColor,
                width: `${((currentStep) / totalQuestions) * 100}%`,
                transition: props.animateTransitions ? 'width 0.4s ease' : 'none',
              }}
            />
          </div>
          <div className="text-xs text-right mt-1 opacity-60">
            {currentStep} / {totalQuestions}
          </div>
        </div>
      )}

      {/* Question Area */}
      {!isComplete && currentQuestion && (
        <div
          className="px-6 pb-8"
          style={{
            transition: props.animateTransitions ? 'opacity 0.3s ease, transform 0.3s ease' : 'none',
          }}
        >
          {/* Question Number */}
          {props.showQuestionNumber && (
            <div
              className="text-sm font-medium mb-3"
              style={{ color: props.accentColor }}
            >
              Question {currentStep + 1} of {totalQuestions}
            </div>
          )}

          {/* Question Image */}
          {currentQuestion.imageUrl && (
            <div className="mb-4">
              <img
                src={currentQuestion.imageUrl}
                alt=""
                className="w-full max-h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-lg font-semibold mb-5">{currentQuestion.question}</h3>

          {/* Answer Buttons */}
          <div className="space-y-3">
            {currentQuestion.answers.map((answer, index) => {
              const isAnswerSelected = selectedAnswers[currentStep] === index
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className="w-full text-left px-4 py-3 rounded-lg border-2 font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    borderColor: isAnswerSelected ? props.accentColor : 'rgba(0,0,0,0.1)',
                    backgroundColor: isAnswerSelected ? `${props.accentColor}15` : 'transparent',
                    color: props.textColor,
                    ...(isAnswerSelected
                      ? {
                          boxShadow: `0 0 0 2px ${props.accentColor}`,
                        }
                      : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnswerSelected) {
                      e.currentTarget.style.borderColor = props.accentColor
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnswerSelected) {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: isAnswerSelected ? props.accentColor : 'rgba(0,0,0,0.08)',
                        color: isAnswerSelected ? '#ffffff' : props.textColor,
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{answer}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Result Screen */}
      {isComplete && (
        <div
          className="px-6 pb-8 text-center"
          style={{
            animation: props.animateTransitions ? 'fadeIn 0.5s ease' : 'none',
          }}
        >
          {props.resultImageUrl && (
            <div className="mb-4">
              <img
                src={props.resultImageUrl}
                alt=""
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}

          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: props.accentColor }}
          >
            {props.resultTitle}
          </h3>

          <p className="mb-6 opacity-80 leading-relaxed">{props.resultMessage}</p>

          <a
            href={props.ctaUrl}
            className="inline-block px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all hover:shadow-xl hover:scale-105"
            style={{
              backgroundColor: props.ctaColor,
              boxShadow: `0 4px 15px ${props.ctaColor}60`,
            }}
          >
            {props.ctaText}
          </a>
        </div>
      )}

      {/* Inline keyframes for fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// Alias for named export compatibility
export const QuizSurveyBlockComponent = QuizSurveyBlock

// Editor Component
export const QuizSurveyEditor: FC<BlockEditorProps<QuizSurveyBlockType>> = ({
  block,
  onChange,
}) => {
  const { props } = block

  const updateQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    const newQuestions = props.questions.map((q) =>
      q.id === id ? { ...q, ...updates } : q
    )
    onChange({ questions: newQuestions })
  }

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: uuidv4(),
      question: 'New question?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      imageUrl: '',
    }
    onChange({ questions: [...props.questions, newQuestion] })
  }

  const removeQuestion = (id: string) => {
    if (props.questions.length > 1) {
      onChange({ questions: props.questions.filter((q) => q.id !== id) })
    }
  }

  const updateAnswer = (questionId: string, answerIndex: number, value: string) => {
    const question = props.questions.find((q) => q.id === questionId)
    if (!question) return
    const newAnswers = [...question.answers]
    newAnswers[answerIndex] = value
    updateQuestion(questionId, { answers: newAnswers })
  }

  const addAnswer = (questionId: string) => {
    const question = props.questions.find((q) => q.id === questionId)
    if (!question) return
    updateQuestion(questionId, { answers: [...question.answers, 'New answer'] })
  }

  const removeAnswer = (questionId: string, answerIndex: number) => {
    const question = props.questions.find((q) => q.id === questionId)
    if (!question || question.answers.length <= 2) return
    const newAnswers = question.answers.filter((_, i) => i !== answerIndex)
    updateQuestion(questionId, { answers: newAnswers })
  }

  return (
    <div className="space-y-6">
      {/* Quiz Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Quiz Settings</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={props.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={props.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showProgressBar"
              checked={props.showProgressBar}
              onChange={(e) => onChange({ showProgressBar: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showProgressBar" className="text-sm text-gray-700">
              Show Progress Bar
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showQuestionNumber"
              checked={props.showQuestionNumber}
              onChange={(e) => onChange({ showQuestionNumber: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="showQuestionNumber" className="text-sm text-gray-700">
              Show Question Number
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="animateTransitions"
              checked={props.animateTransitions}
              onChange={(e) => onChange({ animateTransitions: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="animateTransitions" className="text-sm text-gray-700">
              Animate Transitions
            </label>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Questions</h3>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {props.questions.map((question, qIndex) => (
            <div key={question.id} className="bg-gray-50 p-3 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Question {qIndex + 1}
                </span>
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-700 disabled:opacity-30"
                  disabled={props.questions.length <= 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  value={question.imageUrl}
                  onChange={(e) => updateQuestion(question.id, { imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Answers
                </label>
                <div className="space-y-2">
                  {question.answers.map((answer, aIndex) => (
                    <div key={aIndex} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-5 text-center">
                        {String.fromCharCode(65 + aIndex)}
                      </span>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => updateAnswer(question.id, aIndex, e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <button
                        onClick={() => removeAnswer(question.id, aIndex)}
                        className="text-red-500 hover:text-red-700 disabled:opacity-30"
                        disabled={question.answers.length <= 2}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addAnswer(question.id)}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={14} /> Add Answer
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add Question
        </button>
      </div>

      {/* Result */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Result</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Result Title
          </label>
          <input
            type="text"
            value={props.resultTitle}
            onChange={(e) => onChange({ resultTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Result Message
          </label>
          <textarea
            value={props.resultMessage}
            onChange={(e) => onChange({ resultMessage: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Result Image URL (optional)
          </label>
          <input
            type="text"
            value={props.resultImageUrl}
            onChange={(e) => onChange({ resultImageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://..."
          />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Color
            </label>
            <input
              type="color"
              value={props.ctaColor}
              onChange={(e) => onChange({ ctaColor: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
