'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number | number[] // Egy vagy több helyes válasz
  explanation?: string
  type?: 'single' | 'multiple' // Kérdés típusa
}

interface QuizData {
  id: string
  title: string
  description: string
  questions: Question[]
}

interface QuizProps {
  quizId: string
  onBack: () => void
}

export default function Quiz({ quizId, onBack }: QuizProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch('/data/quizzes.json')
        const quizzes = await response.json()
        const quiz = quizzes.find((q: any) => q.id === quizId)
        
        if (quiz) {
          setQuizData(quiz)
        } else {
          console.error('Kvíz nem található:', quizId)
        }
      } catch (error) {
        console.error('Hiba a kvíz betöltése során:', error)
        // Fallback minta adatok
        const mockQuizData: QuizData = {
          id: quizId,
          title: 'Matematika Alapok',
          description: 'Alapvető matematikai műveletek és fogalmak',
          questions: [
            {
              id: 'q1',
              question: 'Mennyi 2 + 2?',
              options: ['3', '4', '5', '6'],
              correctAnswer: 1,
              explanation: '2 + 2 = 4'
            }
          ]
        }
        setQuizData(mockQuizData)
      } finally {
        setLoading(false)
      }
    }
    
    loadQuizData()
  }, [quizId])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    
    const currentQuestion = quizData!.questions[currentQuestionIndex]
    const isMultipleChoice = currentQuestion.type === 'multiple' || Array.isArray(currentQuestion.correctAnswer)
    
    if (isMultipleChoice) {
      setSelectedAnswers(prev => {
        if (prev.includes(answerIndex)) {
          return prev.filter(index => index !== answerIndex)
        } else {
          return [...prev, answerIndex]
        }
      })
    } else {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleSubmitAnswer = () => {
    const currentQuestion = quizData!.questions[currentQuestionIndex]
    const isMultipleChoice = currentQuestion.type === 'multiple' || Array.isArray(currentQuestion.correctAnswer)
    
    if (isMultipleChoice) {
      if (selectedAnswers.length === 0) return
    } else {
      if (selectedAnswer === null) return
    }
    
    setShowResult(true)
    
    let isCorrect = false
    if (isMultipleChoice) {
      const correctAnswers = Array.isArray(currentQuestion.correctAnswer) 
        ? currentQuestion.correctAnswer 
        : [currentQuestion.correctAnswer]
      
      // Ellenőrizzük, hogy minden helyes válasz ki van-e választva és nincs-e rossz válasz
      const sortedSelected = [...selectedAnswers].sort()
      const sortedCorrect = [...correctAnswers].sort()
      isCorrect = sortedSelected.length === sortedCorrect.length && 
                  sortedSelected.every((val, index) => val === sortedCorrect[index])
    } else {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer
    }
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setSelectedAnswers([])
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setSelectedAnswers([])
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!quizData) {
    return (
      <div className="text-center">
        <p className="text-red-600">Nem sikerült betölteni a kvíz adatait.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Vissza
        </button>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quizData.questions.length) * 100)
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-xl sm:text-2xl font-bold">{percentage}%</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Kvíz befejezve!</h2>
            <p className="text-sm sm:text-base text-gray-600">
              {score} / {quizData.questions.length} kérdésre válaszoltál helyesen
            </p>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-2">
              <div 
                className="bg-blue-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {percentage >= 70 ? 'Gratulálunk! Jó eredmény!' : 'Gyakorolj még egy kicsit!'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              Kezdd újra!
            </button>
            <button
              onClick={onBack}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              Vissza a listához
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const isMultipleChoice = currentQuestion.type === 'multiple' || Array.isArray(currentQuestion.correctAnswer)
  
  let isCorrect = false
  if (showResult) {
    if (isMultipleChoice) {
      const correctAnswers = Array.isArray(currentQuestion.correctAnswer) 
        ? currentQuestion.correctAnswer 
        : [currentQuestion.correctAnswer]
      
      const sortedSelected = [...selectedAnswers].sort()
      const sortedCorrect = [...correctAnswers].sort()
      isCorrect = sortedSelected.length === sortedCorrect.length && 
                  sortedSelected.every((val, index) => val === sortedCorrect[index])
    } else {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vissza a kvízekhez
        </button>
        
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{quizData.title}</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4">{quizData.description}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <div className="text-xs sm:text-sm text-gray-500">
            Kérdés {currentQuestionIndex + 1} / {quizData.questions.length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Pontszám: {score} / {currentQuestionIndex}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 pr-2">
              {currentQuestion.question}
            </h2>
            {isMultipleChoice && (
              <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 text-xs sm:text-sm rounded-full self-start sm:self-auto">
                Több válasz
              </span>
            )}
          </div>
          {isMultipleChoice && (
            <p className="text-xs sm:text-sm text-gray-600">
              Válassz ki több helyes választ is
            </p>
          )}
        </div>
        
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {currentQuestion.options.map((option, index) => {
            const correctAnswers = Array.isArray(currentQuestion.correctAnswer) 
              ? currentQuestion.correctAnswer 
              : [currentQuestion.correctAnswer]
            
            const isSelected = isMultipleChoice 
              ? selectedAnswers.includes(index)
              : selectedAnswer === index
            
            const isCorrectAnswer = correctAnswers.includes(index)
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all ${
                  showResult
                    ? isCorrectAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : isSelected
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                    : isSelected
                    ? isMultipleChoice
                      ? 'border-purple-500 bg-purple-50 text-purple-800'
                      : 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0 ${
                    showResult
                      ? isCorrectAnswer
                        ? 'border-green-500 bg-green-500'
                        : isSelected
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                      : isSelected
                      ? isMultipleChoice
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {showResult && isCorrectAnswer && (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {showResult && isSelected && !isCorrectAnswer && (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    {!showResult && isSelected && (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-sm sm:text-base break-words">{option}</span>
                </div>
              </button>
            )
          })}
        </div>
        
        {showResult && currentQuestion.explanation && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Magyarázat:</h3>
            <p className="text-blue-700 text-sm sm:text-base">{currentQuestion.explanation}</p>
          </div>
        )}
        
        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={isMultipleChoice ? selectedAnswers.length === 0 : selectedAnswer === null}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              Válasz beküldése
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              {currentQuestionIndex < quizData.questions.length - 1 ? 'Következő kérdés' : 'Kvíz befejezése'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
