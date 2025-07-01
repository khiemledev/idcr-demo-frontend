"use client"

import { Upload, Camera } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useI18n } from "@/lib/contexts/I18nContext"

interface UploadSectionProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function UploadSection({ onFileUpload }: UploadSectionProps) {
  const { t } = useI18n()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {t("uploadYourId")}
        </CardTitle>
        <CardDescription>{t("uploadDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={onFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">{t("clickToUpload")}</p>
            <p className="text-sm text-gray-500">{t("fileFormats")}</p>
          </label>
        </div>

        {/* Guidelines */}
        <Alert className="mt-4">
          <AlertDescription>
            <strong>{t("forBetterResults")}</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• {t("guideline1")}</li>
              <li>• {t("guideline2")}</li>
              <li>• {t("guideline3")}</li>
              <li>• {t("guideline4")}</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
} 