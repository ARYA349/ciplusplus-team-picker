'use client'

import TeamPicker from '../components/TeamPicker'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
    onClick={toggleDarkMode}
    className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
    {isDarkMode ? (
      <SunIcon className="h-6 w-6" />
    ) : (
      <MoonIcon className="h-6 w-6" />
    )}
    </button>
  )
}

function MainContent() {
  const { isDarkMode } = useTheme()

  return (
    <main className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    }`}>
    <div className="max-w-4xl mx-auto">
    <h1 className={`text-4xl font-extrabold text-center mb-8 ${
      isDarkMode ? 'text-white' : 'text-indigo-800'
    }`}>
    Ciplusplus Team Picker
    </h1>
    <TeamPicker />
    </div>
    <ThemeToggle />
    </main>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
    <MainContent />
    </ThemeProvider>
  )
}

