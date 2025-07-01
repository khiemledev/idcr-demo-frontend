"use client"

import { FileText, ScanLine, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/contexts/I18nContext"

interface StatusCardProps {
  type: "ready" | "processing" | "error" | "warning"
  error?: string | null
  validationErrors?: string[]
  onTryAgain?: () => void
}

export function StatusCard({ type, error, validationErrors, onTryAgain }: StatusCardProps) {
  const { t } = useI18n()

  if (type === "error" && error) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-red-500 mb-4">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">{t("processingFailed")}</h3>
            <p className="text-sm">{error}</p>
          </div>
          {onTryAgain && (
            <Button variant="outline" onClick={onTryAgain}>
              {t("tryAgain")}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (type === "warning" && validationErrors) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-orange-500 mb-4">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Validation Warnings</h3>
            <div className="text-sm text-left max-w-md mx-auto">
              <p className="mb-2">The following issues were detected:</p>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-orange-600">{error}</li>
                ))}
              </ul>
            </div>
          </div>
          {onTryAgain && (
            <Button variant="outline" onClick={onTryAgain}>
              {t("tryAgain")}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (type === "processing") {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-16 w-16 text-blue-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("readyToProcess")}</h3>
          <p className="text-gray-500">{t("readyToProcessDesc")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="text-center py-12">
        <ScanLine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("readyToExtract")}</h3>
        <p className="text-gray-500">{t("readyToExtractDesc")}</p>
      </CardContent>
    </Card>
  )
} 