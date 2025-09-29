'use client'

import { ContentType } from '@/app/page'

interface SidebarProps {
  selectedType: ContentType
  onTypeChange: (type: ContentType) => void
  onBackToList: () => void
  showBackButton: boolean
}

export default function Sidebar({ selectedType, onTypeChange, onBackToList, showBackButton }: SidebarProps) {
  return (
    <div className="w-full lg:w-64 bg-white shadow-lg border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col lg:flex-col">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h1 className="text-lg lg:text-xl font-bold text-gray-800 text-center lg:text-left">Cedzői</h1>
      </div>
      
      <nav className="flex-1 p-4">
        {showBackButton && (
          <button
            onClick={onBackToList}
            className="w-full mb-4 px-4 py-2 text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Vissza a listához
          </button>
        )}
        
        <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
          <button
            onClick={() => onTypeChange('quiz')}
            className={`flex-1 lg:w-full px-3 lg:px-4 py-3 text-left rounded-lg transition-colors ${
              selectedType === 'quiz'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs lg:text-sm font-semibold">Q</span>
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm lg:text-base">Kvíz</div>
                <div className="text-xs opacity-75 hidden lg:block">Feleletválasztós tesztek</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => onTypeChange('flashcard')}
            className={`flex-1 lg:w-full px-3 lg:px-4 py-3 text-left rounded-lg transition-colors ${
              selectedType === 'flashcard'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs lg:text-sm font-semibold">F</span>
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm lg:text-base">Tananyag</div>
                <div className="text-xs opacity-75 hidden lg:block">Flashcard tanulás</div>
              </div>
            </div>
          </button>
        </div>
      </nav>
    </div>
  )
}
