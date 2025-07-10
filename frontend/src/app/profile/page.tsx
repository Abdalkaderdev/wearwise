'use client'

import { useState } from 'react'
import { UserProfile, UserPreferences, UserMeasurements } from '@/types/user'
import StylePreferences from '@/components/profile/StylePreferences'

const defaultProfile: UserProfile = {
  id: '1',
  email: 'user@example.com',
  username: 'fashionista',
  fullName: 'John Doe',
  preferences: {
    preferredStyles: ['Casual', 'Minimalist'],
    favoriteColors: ['Black', 'White', 'Navy'],
    seasonalPreferences: ['Spring', 'Fall'],
    occasionPreferences: ['Casual', 'Work'],
  },
  measurements: {
    height: 170,
    weight: 70,
    sizes: {
      top: 'M',
      bottom: '32',
      shoes: '42',
    },
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    setIsEditing(false)
  }

  const handlePreferencesChange = (newPreferences: UserPreferences) => {
    setProfile({
      ...profile,
      preferences: newPreferences,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Measurements */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Measurements</h3>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      id="height"
                      value={profile.measurements.height}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          measurements: {
                            ...profile.measurements,
                            height: Number(e.target.value),
                          },
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      value={profile.measurements.weight}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          measurements: {
                            ...profile.measurements,
                            weight: Number(e.target.value),
                          },
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sizes</h3>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  <div>
                    <label htmlFor="topSize" className="block text-sm font-medium text-gray-700">
                      Top Size
                    </label>
                    <select
                      id="topSize"
                      name="topSize"
                      value={profile.measurements.sizes.top}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          measurements: {
                            ...profile.measurements,
                            sizes: {
                              ...profile.measurements.sizes,
                              top: e.target.value,
                            },
                          },
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bottomSize" className="block text-sm font-medium text-gray-700">
                      Bottom Size
                    </label>
                    <input
                      type="text"
                      name="bottomSize"
                      id="bottomSize"
                      value={profile.measurements.sizes.bottom}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          measurements: {
                            ...profile.measurements,
                            sizes: {
                              ...profile.measurements.sizes,
                              bottom: e.target.value,
                            },
                          },
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="shoeSize" className="block text-sm font-medium text-gray-700">
                      Shoe Size (EU)
                    </label>
                    <input
                      type="text"
                      name="shoeSize"
                      id="shoeSize"
                      value={profile.measurements.sizes.shoes}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          measurements: {
                            ...profile.measurements,
                            sizes: {
                              ...profile.measurements.sizes,
                              shoes: e.target.value,
                            },
                          },
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Style Preferences */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Style Preferences</h3>
                <StylePreferences
                  preferences={profile.preferences}
                  isEditing={isEditing}
                  onChange={handlePreferencesChange}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 