'use client'

import { useState, useEffect } from 'react'

interface FlashcardSet {
  id: string
  title: string
  description: string
  cardCount: number
}

interface FlashcardListProps {
  onFlashcardSelect: (flashcardId: string) => void
}

export default function FlashcardList({ onFlashcardSelect }: FlashcardListProps) {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const response = await fetch('/data/flashcards.json')
        const flashcardData = await response.json()
        
        const flashcardSetsWithCount: FlashcardSet[] = flashcardData.map((set: { id: string; title: string; description: string; cards: { id: string; front: string; back: string }[] }) => ({
          id: set.id,
          title: set.title,
          description: set.description,
          cardCount: set.cards.length
        }))
        
        setFlashcardSets(flashcardSetsWithCount)
      } catch (error) {
        console.error('Hiba a tananyagok betöltése során:', error)
        // Fallback minta adatok
        const mockFlashcardSets: FlashcardSet[] = [
          {
            id: 'flashcard-1',
            title: 'Angol Szókincs',
            description: 'Alapvető angol szavak és kifejezések',
            cardCount: 10
          }
        ]
        setFlashcardSets(mockFlashcardSets)
      } finally {
        setLoading(false)
      }
    }
    
    loadFlashcards()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Tananyagok</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Válassz ki egy tananyagot a flashcard tanuláshoz</p>
      </div>
      
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {flashcardSets.map((set) => (
          <div
            key={set.id}
            onClick={() => onFlashcardSelect(set.id)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm sm:text-base font-semibold">F</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{set.cardCount} kártya</span>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">{set.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2">{set.description}</p>
              
              <div className="mt-3 sm:mt-4 flex items-center text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium">
                <span>Tanuljunk</span>
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
