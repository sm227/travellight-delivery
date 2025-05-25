'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading theme...</div>
  }

  return (
    <div className="fixed top-20 right-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">테마 디버그</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">현재 테마: {theme}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">해결된 테마: {resolvedTheme}</p>
      <div className="mt-2 space-x-2">
        <button 
          onClick={() => setTheme('light')}
          className="px-2 py-1 text-xs bg-yellow-200 dark:bg-yellow-800 rounded"
        >
          라이트
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className="px-2 py-1 text-xs bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded"
        >
          다크
        </button>
        <button 
          onClick={() => setTheme('system')}
          className="px-2 py-1 text-xs bg-blue-200 dark:bg-blue-800 rounded"
        >
          시스템
        </button>
      </div>
    </div>
  )
} 