export interface ExtractedInfo {
  idNumber: string
  fullName: string
  dateOfBirth: string
  issueDate: string
  expiryDate: string
  address: string
  sex?: string
  nationality?: string
  home?: string
  ethnicity?: string
  // New fields for different document types
  issueLocation?: string
  mrz?: string
  placeOfBirth?: string
}

// New API response types
export interface ValidCheck {
  emblem: number
  canceled: number
  iluminate: number
  photocopy: number
  partiallylost: number
  face: number
  edited: number
}

export interface AddressDict {
  province: string
  district: string
  commune: string
  other: string
}

export interface InfoField {
  qrcode?: string
  idnum: string
  name: string
  dob: string
  sex: string
  nationality?: string
  home?: string
  address: string
  doe: string
  ethnicity?: string
  address_dict: AddressDict
  // New fields for different document types
  issue_date?: string
  issue_loc?: string
  mrz?: string
  pob?: string
}

export interface IDCRResponse {
  code: string
  status: string
  data: {
    valid_check: ValidCheck
    doc_type: string
    info_field: InfoField
    doc_crop: string
  }
}

export interface APIError {
  code: string
  message: string
}

export interface DemoImage {
  id: number
  nameKey: "driverLicense1" | "nationalId1" | "passport1" | "driverLicense2" | "nationalId2" | "studentId" | "passport2"
  url: string
}

export interface DetectionBox {
  x: number
  y: number
  width: number
  height: number
  field: "idNumber" | "fullName" | "dateOfBirth" | "issueDate" | "expiryDate" | "address" | "issueLocation" | "placeOfBirth" | "mrz"
} 