import { en } from './en'
import { vi } from './vi'

export type Language = "en" | "vi"
export type TranslationKey = keyof typeof en

export const translations = {
  en,
  vi,
} as const

export const getTranslation = (language: Language) => translations[language] 