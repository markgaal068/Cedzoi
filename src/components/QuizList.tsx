'use client'

import { useState, useEffect } from 'react'

interface Quiz {
  id: string
  title: string
  description: string
  questionCount: number
}

interface QuizListProps {
  onQuizSelect: (quizId: string) => void
}

export default function QuizList({ onQuizSelect }: QuizListProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const response = await fetch('/data/quizzes.json')
        const quizData = await response.json()
        
        const quizzesWithCount: Quiz[] = quizData.map((quiz: any) => ({
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          questionCount: quiz.questions.length
        }))
        
        setQuizzes(quizzesWithCount)
      } catch (error) {
        console.error('Hiba a kvízek betöltése során:', error)
        // Fallback minta adatok
        const mockQuizzes: Quiz[] = [
          {
            id: 'quiz-1',
            title: 'Matematika Alapok',
            description: 'Alapvető matematikai műveletek és fogalmak',
            questionCount: 5
          }
        ]
        setQuizzes(mockQuizzes)
      } finally {
        setLoading(false)
      }
    }
    
    loadQuizzes()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Kvízek</h2>
        <p className="text-sm sm:text-base text-gray-600">Válassz ki egy kvízt a gyakorláshoz</p>
      </div>
      
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => onQuizSelect(quiz.id)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-blue-300"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm sm:text-base font-semibold">Q</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">{quiz.questionCount} kérdés</span>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{quiz.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{quiz.description}</p>
              
              <div className="mt-3 sm:mt-4 flex items-center text-blue-600 text-xs sm:text-sm font-medium">
                <span>Kezdjük el</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
