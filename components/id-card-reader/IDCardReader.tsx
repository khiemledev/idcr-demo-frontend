"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { UploadSection } from "./UploadSection"
import { DemoSection } from "./DemoSection"
import { ImagePreview } from "./ImagePreview"
import { ResultsCard } from "./ResultsCard"
import { StatusCard } from "./StatusCard"
import { HowToUseCard } from "./HowToUseCard"
import { ExtractedInfo, DemoImage, DetectionBox, IDCRResponse, APIError } from "@/lib/types"
import { demoImages } from "@/lib/data/demoImages"
import { idcrApi } from "@/lib/api"
import { convertIDCRResponseToExtractedInfo, hasValidationErrors, getValidationErrorMessages } from "@/lib/utils"

export function IDCardReader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [detectionBoxes, setDetectionBoxes] = useState<DetectionBox[]>([])
  const [showProcessedImage, setShowProcessedImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setSelectedDemo(null)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setExtractedInfo(null)
      setError(null)
      setValidationErrors([])
    }
  }

  const handleDemoSelect = (demo: DemoImage) => {
    setSelectedImage(demo.url)
    setSelectedDemo(demo.id)
    setUploadedFile(null)
    setExtractedInfo(null)
    setError(null)
    setValidationErrors([])
  }

  const processImage = async () => {
    if (!uploadedFile && !selectedDemo) {
      setError("No image selected. Please upload an image or select a demo image first.")
      return
    }

    setIsProcessing(true)
    setError(null)
    setValidationErrors([])

    try {
      let imageFile: File

      if (uploadedFile) {
        // Use uploaded file
        imageFile = uploadedFile
      } else if (selectedDemo) {
        // Convert demo image URL to File object
        const demoImage = demoImages.find(d => d.id === selectedDemo)
        if (!demoImage) {
          throw new Error("Demo image not found")
        }

        // Fetch the demo image and convert to File
        const response = await fetch(demoImage.url)
        const blob = await response.blob()
        imageFile = new File([blob], `demo${selectedDemo}.jpg`, { type: 'image/jpeg' })
      } else {
        throw new Error("No image available for processing")
      }

      const response: IDCRResponse = await idcrApi.processImage({
        imageFile: imageFile
      })

      // Check if the API call was successful
      if (response.code === "1000" && response.status === "Done") {
        const { data } = response
        
        // Check for validation errors
        if (hasValidationErrors(data.valid_check)) {
          const errors = getValidationErrorMessages(data.valid_check)
          setValidationErrors(errors)
          
          // If there are validation errors but we still have some info, show it
          if (Object.keys(data.info_field).length > 0) {
            const convertedInfo = convertIDCRResponseToExtractedInfo(response)
            setExtractedInfo(convertedInfo)
          }
        } else {
          // No validation errors, convert and display the info
          const convertedInfo = convertIDCRResponseToExtractedInfo(response)
          setExtractedInfo(convertedInfo)
        }

        // Set processed image if available
        if (data.doc_crop) {
          setProcessedImage(`data:image/jpeg;base64,${data.doc_crop}`)
          setShowProcessedImage(true)
        }

        // Clear detection boxes as they're not provided by the API
        setDetectionBoxes([])
      } else {
        throw new Error(`API Error: ${response.status}`)
      }
    } catch (error) {
      console.error("Processing failed:", error)
      
      if (error && typeof error === 'object' && 'message' in error) {
        const apiError = error as APIError
        setError(apiError.message)
      } else {
        setError("Failed to process image. Please try again.")
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    setUploadedFile(null)
    setSelectedDemo(null)
    setExtractedInfo(null)
    setProcessedImage(null)
    setDetectionBoxes([])
    setShowProcessedImage(false)
    setError(null)
    setValidationErrors([])
  }

  const handleTryAgain = () => {
    setError(null)
    setValidationErrors([])
    setExtractedInfo(null)
    setProcessedImage(null)
    setDetectionBoxes([])
    setShowProcessedImage(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Tabs for Upload/Demo OR Image Preview */}
            <div className="space-y-6">
              {!selectedImage ? (
                // Show tabs when no image is selected
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                    <TabsTrigger value="demo">Demo Images</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4">
                    <UploadSection onFileUpload={handleFileUpload} />
                  </TabsContent>

                  <TabsContent value="demo" className="space-y-4">
                    <DemoSection
                      demoImages={demoImages}
                      selectedDemo={selectedDemo}
                      onDemoSelect={handleDemoSelect}
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                // Show image preview when image is selected
                <ImagePreview
                  selectedImage={selectedImage}
                  processedImage={processedImage}
                  showProcessedImage={showProcessedImage}
                  setShowProcessedImage={setShowProcessedImage}
                  detectionBoxes={detectionBoxes}
                  uploadedFile={uploadedFile}
                  selectedDemo={selectedDemo}
                  demoImages={demoImages}
                  isProcessing={isProcessing}
                  onProcessImage={processImage}
                  onClearImage={clearImage}
                />
              )}
            </div>

            {/* Right Column - Results or Welcome */}
            <div className="space-y-6">
              {error && (
                <StatusCard
                  type="error"
                  error={error}
                  onTryAgain={handleTryAgain}
                />
              )}
              {validationErrors.length > 0 && (
                <StatusCard
                  type="warning"
                  validationErrors={validationErrors}
                  onTryAgain={handleTryAgain}
                />
              )}
              {extractedInfo ? (
                <ResultsCard extractedInfo={extractedInfo} />
              ) : selectedImage ? (
                <>
                  <StatusCard type="processing" />
                  <HowToUseCard />
                </>
              ) : (
                <>
                  <StatusCard type="ready" />
                  <HowToUseCard />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 