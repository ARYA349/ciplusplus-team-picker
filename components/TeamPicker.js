'use client'

import { useState, useEffect, useMemo } from 'react'
import { generateTeams } from '../utils/teamGenerator'
import TeamDisplay from './TeamDisplay'
import { Combobox } from '@headlessui/react'
import { useTheme } from '../contexts/ThemeContext'

const allMembers = [
  'Amel', 'Fanny', 'Talitha', 'Farha', 'Fenty', 'Fatra', 'Azka', 'Shelva', 'Sekar', 'Haifa',
  'Arya', 'Adit', 'Aar', 'Fadil', 'Yusa', 'Bajsan', 'Rai', 'Iki', 'Farid', 'Fajar',
  'Kevin', 'Rafli', 'Akbar', 'Nabil', 'Dimas', 'Andi', 'Dhiya', 'Try', 'Angra'
]

export default function TeamPicker() {
  const [membersPerTeam, setMembersPerTeam] = useState(2)
  const [teamType, setTeamType] = useState('mixed')
  const [teams, setTeams] = useState([])
  const [selectedKings, setSelectedKings] = useState([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [kingsEnabled, setKingsEnabled] = useState(false)
  const { isDarkMode } = useTheme()

  const filteredMembers = useMemo(() => {
    return query === ''
      ? allMembers
      : allMembers.filter((member) =>
          member.toLowerCase().includes(query.toLowerCase())
        )
  }, [query])

  useEffect(() => {
    setSelectedKings([])
    setError('')
  }, [membersPerTeam])

  const handleGenerateTeams = () => {
    const generatedTeams = generateTeams(membersPerTeam, teamType, kingsEnabled ? selectedKings : [])
    setTeams(generatedTeams)
  }

  const handleMembersChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setMembersPerTeam(value)
      if (value < 2 || value > 10) {
        setError('Kurang anggota kocak! Pilih antara 2-10 anggota.')
      } else {
        setError('')
      }
    }
  }

  const handleKingSelection = (selected) => {
    if (selectedKings.includes(selected)) {
      setSelectedKings(selectedKings.filter(king => king !== selected))
    } else if (selectedKings.length < Math.ceil(allMembers.length / membersPerTeam)) {
      setSelectedKings([...selectedKings, selected])
    }
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-xl rounded-lg p-6 space-y-6`}>
      <div className="space-y-4">
        <div>
          <label htmlFor="membersPerTeam" className="block text-sm font-medium mb-1">
            Members per team (2-10)
          </label>
          <input
            id="membersPerTeam"
            type="number"
            min="2"
            max="10"
            value={membersPerTeam}
            onChange={handleMembersChange}
            className={`mt-1 block w-full px-3 py-2 text-base border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
              error ? 'border-red-500' : ''
            }`}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Team type</label>
          <div className="space-y-2">
            {['mensOnly', 'womensOnly', 'mixed'].map((type) => (
              <label key={type} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  value={type}
                  checked={teamType === type}
                  onChange={() => setTeamType(type)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="ml-2 text-sm">
                  {type === 'mensOnly' ? "Men's Only" : type === 'womensOnly' ? "Women's Only" : "Mixed"}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Enable Kings (Team Leaders)</span>
          <button
            onClick={() => setKingsEnabled(!kingsEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              kingsEnabled ? 'bg-indigo-600' : 'bg-gray-400'
            }`}
          >
            <span className="sr-only">Enable kings</span>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                kingsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {kingsEnabled && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Kings (Team Leaders) - {selectedKings.length}/{Math.ceil(allMembers.length / membersPerTeam)}
            </label>
            <Combobox value={null} onChange={handleKingSelection}>
              <Combobox.Input
                className={`w-full rounded-md border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                } py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                onChange={(event) => setQuery(event.target.value)}
                displayValue={() => ''}
                placeholder="Search for a member"
              />
              <Combobox.Options className={`absolute z-10 mt-1 max-h-60 w-64 overflow-auto rounded-md ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                {filteredMembers.map((member) => (
                  <Combobox.Option key={member} value={member} className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-900'
                        : isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`
                  }>
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {member}
                        </span>
                        {selectedKings.includes(member) && (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                          }`}>
                            ✓
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedKings.map((king) => (
                <span key={king} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-indigo-700 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {king}
                  <button
                    type="button"
                    onClick={() => handleKingSelection(king)}
                    className={`flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center ${
                      isDarkMode
                        ? 'text-indigo-300 hover:bg-indigo-600 hover:text-indigo-200 focus:bg-indigo-500 focus:text-white'
                        : 'text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white'
                    }`}
                  >
                    <span className="sr-only">Remove {king}</span>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleGenerateTeams}
        disabled={
          (kingsEnabled && selectedKings.length !== Math.ceil(allMembers.length / membersPerTeam)) ||
          error !== ''
        }
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
          isDarkMode
            ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-offset-gray-800'
            : 'text-white bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Generate Teams
      </button>
      {teams.length > 0 && <TeamDisplay teams={teams} />}
    </div>
  )
}
