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
      
      {/* Fejlesztői link */}
      <div className="p-4 border-t border-gray-200">
        <a
          href="https://gaalmark.hu"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-white text-sm font-bold">GM</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm text-gray-800 group-hover:text-purple-600 transition-colors">
              Gaál Márk
            </div>
            <div className="text-xs text-gray-500 group-hover:text-purple-500 transition-colors">
              gaalmark.hu
            </div>
          </div>
          <svg 
            className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}
