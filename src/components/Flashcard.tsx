'use client'

import { useState, useEffect } from 'react'

interface FlashcardData {
  id: string
  title: string
  description: string
  cards: {
    id: string
    front: string
    back: string
  }[]
}

interface FlashcardProps {
  flashcardId: string
  onBack: () => void
}

export default function Flashcard({ flashcardId, onBack }: FlashcardProps) {
  const [flashcardData, setFlashcardData] = useState<FlashcardData | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [studyMode, setStudyMode] = useState<'all' | 'known' | 'unknown'>('all')
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set())
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadFlashcardData = async () => {
      try {
        const response = await fetch('/data/flashcards.json')
        const flashcardSets = await response.json()
        const flashcardSet = flashcardSets.find((set: FlashcardData) => set.id === flashcardId)
        
        if (flashcardSet) {
          setFlashcardData(flashcardSet)
        } else {
          console.error('Tananyag nem található:', flashcardId)
        }
      } catch (error) {
        console.error('Hiba a tananyag betöltése során:', error)
        // Fallback minta adatok
        const mockFlashcardData: FlashcardData = {
          id: flashcardId,
          title: 'Angol Szókincs',
          description: 'Alapvető angol szavak és kifejezések',
          cards: [
            {
              id: 'card-1',
              front: 'Hello',
              back: 'Szia / Helló'
            }
          ]
        }
        setFlashcardData(mockFlashcardData)
      } finally {
        setLoading(false)
      }
    }
    
    loadFlashcardData()
  }, [flashcardId])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentCardIndex < flashcardData!.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleKnown = () => {
    const currentCard = flashcardData!.cards[currentCardIndex]
    setKnownCards(prev => new Set([...prev, currentCard.id]))
    setUnknownCards(prev => {
      const newSet = new Set(prev)
      newSet.delete(currentCard.id)
      return newSet
    })
    handleNext()
  }

  const handleUnknown = () => {
    const currentCard = flashcardData!.cards[currentCardIndex]
    setUnknownCards(prev => new Set([...prev, currentCard.id]))
    setKnownCards(prev => {
      const newSet = new Set(prev)
      newSet.delete(currentCard.id)
      return newSet
    })
    handleNext()
  }

  const handleRestart = () => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setKnownCards(new Set())
    setUnknownCards(new Set())
  }

  const getFilteredCards = () => {
    if (!flashcardData) return []
    
    switch (studyMode) {
      case 'known':
        return flashcardData.cards.filter(card => knownCards.has(card.id))
      case 'unknown':
        return flashcardData.cards.filter(card => unknownCards.has(card.id))
      default:
        return flashcardData.cards
    }
  }

  const filteredCards = getFilteredCards()
  const currentCard = filteredCards[currentCardIndex]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!flashcardData) {
    return (
      <div className="text-center">
        <p className="text-red-600">Nem sikerült betölteni a tananyag adatait.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Vissza
        </button>
      </div>
    )
  }

  if (filteredCards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Nincs több kártya!</h2>
            <p className="text-sm sm:text-base text-gray-600">
              {studyMode === 'known' ? 'Minden ismert kártyát átnéztél!' : 
               studyMode === 'unknown' ? 'Minden ismeretlen kártyát átnéztél!' : 
               'Minden kártyát átnéztél!'}
            </p>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-gray-800">{flashcardData.cards.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Összes</div>
              </div>
              <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-green-600">{knownCards.size}</div>
                <div className="text-xs sm:text-sm text-gray-600">Ismert</div>
              </div>
              <div className="p-3 sm:p-4 bg-red-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-red-600">{unknownCards.size}</div>
                <div className="text-xs sm:text-sm text-gray-600">Ismeretlen</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vissza a tananyagokhoz
        </button>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{flashcardData.title}</h1>
            <p className="text-sm sm:text-base text-gray-600">{flashcardData.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStudyMode('all')}
              className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors ${
                studyMode === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Összes
            </button>
            <button
              onClick={() => setStudyMode('unknown')}
              className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors ${
                studyMode === 'unknown' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ismeretlen
            </button>
            <button
              onClick={() => setStudyMode('known')}
              className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors ${
                studyMode === 'known' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ismert
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <div className="text-xs sm:text-sm text-gray-500">
            Kártya {currentCardIndex + 1} / {filteredCards.length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Ismert: {knownCards.size} | Ismeretlen: {unknownCards.size}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div 
          className={`relative h-64 sm:h-80 lg:h-96 cursor-pointer flip-card ${
            isFlipped ? 'flipped' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div className="flip-card-front">
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 sm:p-6 lg:p-8">
              <div className="text-center">
                <div className="text-xs sm:text-sm opacity-75 mb-2">Kérdés</div>
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold break-words">{currentCard.front}</div>
                <div className="text-xs sm:text-sm opacity-75 mt-3 sm:mt-4">Kattints a megfordításhoz</div>
              </div>
            </div>
          </div>
          
          {/* Back of card */}
          <div className="flip-card-back">
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-6 lg:p-8">
              <div className="text-center">
                <div className="text-xs sm:text-sm opacity-75 mb-2">Válasz</div>
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold break-words">{currentCard.back}</div>
                <div className="text-xs sm:text-sm opacity-75 mt-3 sm:mt-4">Kattints a megfordításhoz</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentCardIndex === 0}
                className="px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentCardIndex === filteredCards.length - 1}
                className="px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleUnknown}
                className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Nem tudom
              </button>
              <button
                onClick={handleKnown}
                className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                Tudom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
