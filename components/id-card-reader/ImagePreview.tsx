"use client"

import { FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/contexts/I18nContext"
import { DetectionBox, DemoImage } from "@/lib/types"

interface ImagePreviewProps {
  selectedImage: string | null
  processedImage: string | null
  showProcessedImage: boolean
  setShowProcessedImage: (show: boolean) => void
  detectionBoxes: DetectionBox[]
  uploadedFile: File | null
  selectedDemo: number | null
  demoImages: DemoImage[]
  isProcessing: boolean
  onProcessImage: () => void
  onClearImage: () => void
}

export function ImagePreview({
  selectedImage,
  processedImage,
  showProcessedImage,
  setShowProcessedImage,
  detectionBoxes,
  uploadedFile,
  selectedDemo,
  demoImages,
  isProcessing,
  onProcessImage,
  onClearImage,
}: ImagePreviewProps) {
  const { t } = useI18n()

  if (!selectedImage) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t("imagePreview")}
          </span>
          <Button variant="outline" size="sm" onClick={onClearImage}>
            {t("clearImage")}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <Button
              variant={!showProcessedImage ? "default" : "outline"}
              size="sm"
              onClick={() => setShowProcessedImage(false)}
              disabled={!processedImage}
            >
              {t("originalImage")}
            </Button>
            {processedImage && (
              <Button
                variant={showProcessedImage ? "default" : "outline"}
                size="sm"
                onClick={() => setShowProcessedImage(true)}
              >
                {t("processedImage")}
              </Button>
            )}
          </div>

          <div className="relative">
            <img
              src={
                showProcessedImage && processedImage ? processedImage : selectedImage || "/placeholder.svg"
              }
              alt={showProcessedImage ? "Processed ID card" : "Selected ID card"}
              className="w-full max-h-64 object-contain rounded-lg border"
            />

            {/* Show detection boxes overlay when viewing processed image */}
            {showProcessedImage && detectionBoxes.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {detectionBoxes.map((box, index) => (
                  <div
                    key={index}
                    className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20"
                    style={{
                      left: `${(box.x / 640) * 100}%`,
                      top: `${(box.y / 400) * 100}%`,
                      width: `${(box.width / 640) * 100}%`,
                      height: `${(box.height / 400) * 100}%`,
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-1 rounded">
                      {t(box.field)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button onClick={onProcessImage} disabled={isProcessing} className="flex-1" size="lg">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("processing")}
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                {t("processImage")}
              </>
            )}
          </Button>
        </div>

        {/* Show source info */}
        <div className="mt-3 text-sm text-gray-500">
          {uploadedFile ? (
            <p>
              {t("uploaded")} {uploadedFile.name}
            </p>
          ) : selectedDemo ? (
            <p>
              {t("demo")}{" "}
              {demoImages.find((d) => d.id === selectedDemo)?.nameKey && 
                t(demoImages.find((d) => d.id === selectedDemo)!.nameKey)}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
} 