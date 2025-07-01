"use client"

import { I18nProvider } from "@/lib/contexts/I18nContext"
import { IDCardReader } from "@/components/id-card-reader/IDCardReader"

export default function HomePage() {
  return (
    <I18nProvider>
      <IDCardReader />
    </I18nProvider>
  )
}
