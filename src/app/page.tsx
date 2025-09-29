'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import QuizList from '@/components/QuizList'
import FlashcardList from '@/components/FlashcardList'
import Quiz from '@/components/Quiz'
import Flashcard from '@/components/Flashcard'

export type ContentType = 'quiz' | 'flashcard'

export default function Home() {
  const [selectedType, setSelectedType] = useState<ContentType>('quiz')
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [selectedFlashcard, setSelectedFlashcard] = useState<string | null>(null)

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId)
    setSelectedFlashcard(null)
  }

  const handleFlashcardSelect = (flashcardId: string) => {
    setSelectedFlashcard(flashcardId)
    setSelectedQuiz(null)
  }

  const handleBackToList = () => {
    setSelectedQuiz(null)
    setSelectedFlashcard(null)
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar 
        selectedType={selectedType} 
        onTypeChange={setSelectedType}
        onBackToList={handleBackToList}
        showBackButton={selectedQuiz !== null || selectedFlashcard !== null}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6">
          {selectedQuiz ? (
            <Quiz quizId={selectedQuiz} onBack={handleBackToList} />
          ) : selectedFlashcard ? (
            <Flashcard flashcardId={selectedFlashcard} onBack={handleBackToList} />
          ) : selectedType === 'quiz' ? (
            <QuizList onQuizSelect={handleQuizSelect} />
          ) : (
            <FlashcardList onFlashcardSelect={handleFlashcardSelect} />
          )}
        </div>
      </main>
    </div>
  )
}