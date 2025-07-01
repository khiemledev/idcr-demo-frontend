"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/contexts/I18nContext"
import { DemoImage } from "@/lib/types"

interface DemoSectionProps {
  demoImages: DemoImage[]
  selectedDemo: number | null
  onDemoSelect: (demo: DemoImage) => void
}

export function DemoSection({ demoImages, selectedDemo, onDemoSelect }: DemoSectionProps) {
  const { t } = useI18n()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("tryDemoImages")}</CardTitle>
        <CardDescription>{t("demoDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {demoImages.map((demo) => (
            <div
              key={demo.id}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                selectedDemo === demo.id
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onDemoSelect(demo)}
            >
              <img
                src={demo.url || "/placeholder.svg"}
                alt={t(demo.nameKey)}
                className="w-full h-24 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <p className="text-xs font-medium">{t(demo.nameKey)}</p>
              </div>
              {selectedDemo === demo.id && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    {t("selected")}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 