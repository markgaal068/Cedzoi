'use client'

import { ContentType } from '@/app/page'
import { useTheme } from '@/contexts/ThemeContext'

interface SidebarProps {
  selectedType: ContentType
  onTypeChange: (type: ContentType) => void
  onBackToList: () => void
  showBackButton: boolean
}

export default function Sidebar({ selectedType, onTypeChange, onBackToList, showBackButton }: SidebarProps) {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="w-full lg:w-64 bg-white dark:bg-gray-800 shadow-lg border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 flex flex-col lg:flex-col transition-colors">
      <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white text-center lg:text-left">Cedzői</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={theme === 'light' ? 'Sötét mód bekapcsolása' : 'Világos mód bekapcsolása'}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        {showBackButton && (
          <button
            onClick={onBackToList}
            className="w-full mb-4 px-4 py-2 text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Vissza a listához
          </button>
        )}
        
        <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
          <button
            onClick={() => onTypeChange('quiz')}
            className={`flex-1 lg:w-full px-3 lg:px-4 py-3 text-left rounded-lg transition-colors ${
              selectedType === 'quiz'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href="https://gaalmark.hu"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-white text-sm font-bold">GM</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Gaál Márk
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
              gaalmark.hu
            </div>
          </div>
          <svg 
            className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" 
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
