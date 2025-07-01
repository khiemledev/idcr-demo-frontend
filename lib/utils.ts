import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IDCRResponse, ExtractedInfo, ValidCheck } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert IDCR API response to ExtractedInfo format
 */
export function convertIDCRResponseToExtractedInfo(response: IDCRResponse): ExtractedInfo {
  const { info_field } = response.data
  
  return {
    idNumber: info_field.idnum || '',
    fullName: info_field.name || '',
    dateOfBirth: info_field.dob || '',
    issueDate: info_field.issue_date || '',
    expiryDate: info_field.doe || '',
    address: info_field.address || '',
    sex: info_field.sex || undefined,
    nationality: info_field.nationality || undefined,
    home: info_field.home || undefined,
    ethnicity: info_field.ethnicity || undefined,
    issueLocation: info_field.issue_loc || undefined,
    mrz: info_field.mrz || undefined,
    placeOfBirth: info_field.pob || undefined,
  }
}

/**
 * Check if any validation checks failed
 */
export function hasValidationErrors(validCheck: ValidCheck): boolean {
  return Object.values(validCheck).some(value => value === 1)
}

/**
 * Get validation error messages
 */
export function getValidationErrorMessages(validCheck: ValidCheck): string[] {
  const errors: string[] = []
  
  if (validCheck.face === 1) errors.push('Face detection failed')
  if (validCheck.partiallylost === 1) errors.push('Document appears to be partially lost/damaged')
  if (validCheck.canceled === 1) errors.push('Document appears to be canceled')
  if (validCheck.photocopy === 1) errors.push('Document appears to be a photocopy')
  if (validCheck.iluminate === 1) errors.push('Document appears to be illuminated')
  if (validCheck.emblem === 1) errors.push('Document emblem validation failed')
  if (validCheck.edited === 1) errors.push('Document appears to be edited')
  
  return errors
}
