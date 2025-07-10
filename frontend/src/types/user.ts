export interface UserProfile {
  id: string
  email: string
  username: string
  fullName: string
  preferences: UserPreferences
  measurements: UserMeasurements
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  preferredStyles: string[]
  favoriteColors: string[]
  seasonalPreferences: string[]
  occasionPreferences: string[]
}

export interface UserMeasurements {
  height: number
  weight: number
  sizes: {
    top: string
    bottom: string
    shoes: string
  }
  customMeasurements?: Record<string, number>
} 