"use client"

import { useState } from "react"
import { FileText, Copy, Check, CreditCard, User, Calendar, MapPin, Globe, Users, Building, FileCode, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/contexts/I18nContext"
import { ExtractedInfo } from "@/lib/types"

interface ResultsCardProps {
  extractedInfo: ExtractedInfo
}

export function ResultsCard({ extractedInfo }: ResultsCardProps) {
  const { t } = useI18n()
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = async () => {
    let textToCopy = `${t("extractedInformation")}:
${t("idNumber")}: ${extractedInfo.idNumber}
${t("fullName")}: ${extractedInfo.fullName}
${t("dateOfBirth")}: ${extractedInfo.dateOfBirth}`

    if (extractedInfo.sex) {
      textToCopy += `\nSex: ${extractedInfo.sex}`
    }
    if (extractedInfo.nationality) {
      textToCopy += `\nNationality: ${extractedInfo.nationality}`
    }
    if (extractedInfo.issueDate) {
      textToCopy += `\n${t("issueDate")}: ${extractedInfo.issueDate}`
    }
    if (extractedInfo.issueLocation) {
      textToCopy += `\n${t("issueLocation")}: ${extractedInfo.issueLocation}`
    }
    textToCopy += `\n${t("expiryDate")}: ${extractedInfo.expiryDate}
${t("address")}: ${extractedInfo.address}`

    if (extractedInfo.placeOfBirth) {
      textToCopy += `\n${t("placeOfBirth")}: ${extractedInfo.placeOfBirth}`
    }
    if (extractedInfo.home && extractedInfo.home !== extractedInfo.address) {
      textToCopy += `\nPlace of Origin: ${extractedInfo.home}`
    }
    if (extractedInfo.mrz) {
      textToCopy += `\n${t("mrz")}: ${extractedInfo.mrz}`
    }

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t("extractedInformation")}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2 bg-transparent"
          >
            {copySuccess ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                {t("copied")}
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                {t("copy")}
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">{t("idNumber")}</p>
                <p className="font-semibold">{extractedInfo.idNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">{t("fullName")}</p>
                <p className="font-semibold">{extractedInfo.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">{t("dateOfBirth")}</p>
                <p className="font-semibold">{extractedInfo.dateOfBirth}</p>
              </div>
            </div>

            {extractedInfo.sex && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Sex</p>
                  <p className="font-semibold">{extractedInfo.sex}</p>
                </div>
              </div>
            )}

            {extractedInfo.nationality && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Globe className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Nationality</p>
                  <p className="font-semibold">{extractedInfo.nationality}</p>
                </div>
              </div>
            )}

            {extractedInfo.issueDate && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("issueDate")}</p>
                  <p className="font-semibold">{extractedInfo.issueDate}</p>
                </div>
              </div>
            )}

            {extractedInfo.issueLocation && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("issueLocation")}</p>
                  <p className="font-semibold">{extractedInfo.issueLocation}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">{t("expiryDate")}</p>
                <p className="font-semibold">{extractedInfo.expiryDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">{t("address")}</p>
                <p className="font-semibold">{extractedInfo.address}</p>
              </div>
            </div>

            {extractedInfo.placeOfBirth && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Home className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("placeOfBirth")}</p>
                  <p className="font-semibold">{extractedInfo.placeOfBirth}</p>
                </div>
              </div>
            )}

            {extractedInfo.home && extractedInfo.home !== extractedInfo.address && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Place of Origin</p>
                  <p className="font-semibold">{extractedInfo.home}</p>
                </div>
              </div>
            )}

            {extractedInfo.mrz && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileCode className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-600">{t("mrz")}</p>
                  <p className="font-semibold text-xs break-all">{extractedInfo.mrz}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 