"use client"

import { useI18n } from "@/lib/contexts/I18nContext"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center text-gray-600">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
} 