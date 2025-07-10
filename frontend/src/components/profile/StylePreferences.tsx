'use client'

import { useState } from 'react'
import { UserPreferences } from '@/types/user'

interface StylePreferencesProps {
  preferences: UserPreferences
  isEditing: boolean
  onChange: (preferences: UserPreferences) => void
}

const styleOptions = [
  'Casual',
  'Formal',
  'Streetwear',
  'Bohemian',
  'Minimalist',
  'Vintage',
  'Athletic',
  'Business Casual',
]

const colorOptions = [
  'Black',
  'White',
  'Navy',
  'Gray',
  'Beige',
  'Brown',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Pink',
]

const seasonOptions = ['Spring', 'Summer', 'Fall', 'Winter']

const occasionOptions = [
  'Casual',
  'Work',
  'Formal Events',
  'Date Night',
  'Workout',
  'Party',
  'Travel',
  'Beach',
]

export default function StylePreferences({
  preferences,
  isEditing,
  onChange,
}: StylePreferencesProps) {
  const handleTogglePreference = (
    category: keyof UserPreferences,
    item: string
  ) => {
    if (!isEditing) return

    const currentPreferences = preferences[category]
    const updatedPreferences = currentPreferences.includes(item)
      ? currentPreferences.filter((i) => i !== item)
      : [...currentPreferences, item]

    onChange({
      ...preferences,
      [category]: updatedPreferences,
    })
  }

  const PreferenceSection = ({
    title,
    options,
    category,
  }: {
    title: string
    options: string[]
    category: keyof UserPreferences
  }) => (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleTogglePreference(category, option)}
            disabled={!isEditing}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                preferences[category].includes(option)
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }
              ${!isEditing && 'cursor-default'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <PreferenceSection
        title="Preferred Styles"
        options={styleOptions}
        category="preferredStyles"
      />
      <PreferenceSection
        title="Favorite Colors"
        options={colorOptions}
        category="favoriteColors"
      />
      <PreferenceSection
        title="Seasonal Preferences"
        options={seasonOptions}
        category="seasonalPreferences"
      />
      <PreferenceSection
        title="Occasion Preferences"
        options={occasionOptions}
        category="occasionPreferences"
      />
    </div>
  )
} 