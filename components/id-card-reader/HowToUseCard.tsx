"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/contexts/I18nContext"

export function HowToUseCard() {
  const { t } = useI18n()

  const steps = [
    { key: "step1" as const },
    { key: "step2" as const },
    { key: "step3" as const },
    { key: "step4" as const },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("howToUse")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-gray-600">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p>{t(step.key)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 