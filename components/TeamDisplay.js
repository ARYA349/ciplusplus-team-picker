'use client'

import { useRef } from 'react'
import { toPng } from 'html-to-image'
import { useTheme } from '../contexts/ThemeContext'

export default function TeamDisplay({ teams }) {
  const teamDisplayRef = useRef(null)
  const { isDarkMode } = useTheme()

  const handleSaveImage = () => {
    if (teamDisplayRef.current) {
      toPng(teamDisplayRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'ciplusplus-teams.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error('Error saving image:', err)
      })
    }
  }

  const getRandomColor = () => {
    const colors = isDarkMode
    ? ['bg-red-900', 'bg-yellow-900', 'bg-green-900', 'bg-blue-900', 'bg-indigo-900', 'bg-purple-900', 'bg-pink-900']
    : ['bg-red-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-indigo-100', 'bg-purple-100', 'bg-pink-100']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="mt-8">
    <div ref={teamDisplayRef} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-inner`}>
    <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-indigo-800'} text-center`}>Generated Teams</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {teams.map((team, index) => {
      const bgColor = getRandomColor()
      return (
        <div key={index} className={`${bgColor} rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105`}>
        <div className={`${isDarkMode ? 'bg-indigo-800' : 'bg-indigo-600'} py-2 px-4`}>
        <h3 className="text-lg font-semibold text-white">Team {index + 1}</h3>
        </div>
        <ul className="p-4 space-y-2">
        {team.map((member, memberIndex) => (
          <li key={memberIndex} className="flex items-center">
          <span className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-indigo-600'} flex items-center justify-center font-bold mr-3`}>
          {memberIndex + 1}
          </span>
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>{member}</span>
          </li>
        ))}
        </ul>
        </div>
      )
    })}
    </div>
    </div>
    <button
    onClick={handleSaveImage}
    className={`mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
      isDarkMode
      ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-offset-gray-800'
      : 'text-white bg-green-600 hover:bg-green-700'
    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
    >
    Save as Image
    </button>
    </div>
  )
}

