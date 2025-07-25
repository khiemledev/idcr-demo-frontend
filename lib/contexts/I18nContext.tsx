"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Language, getTranslation, TranslationKey } from '../i18n'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>("vi")

  const t = (key: TranslationKey): string => {
    const translations = getTranslation(language)
    return translations[key] || key
  }

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
} 