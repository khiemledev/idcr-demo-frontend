export const en = {
  // Header
  siteTitle: "IDCR",
  siteSubtitle: "ID Card Reader - Extract Information Instantly",

  // Navigation
  uploadImage: "Upload Image",
  demoImages: "Demo Images",

  // Upload section
  uploadYourId: "Upload Your ID Card",
  uploadDescription: "Upload an image of your ID card to extract information",
  clickToUpload: "Click to upload or drag and drop",
  fileFormats: "PNG, JPG, JPEG up to 10MB",
  forBetterResults: "For better results:",
  guideline1: "Ensure all fields in the image are readable",
  guideline2: "Capture the whole card, including all 4 corners",
  guideline3: "Use the real card, not a copy from picture or screen",
  guideline4: "Ensure good lighting and avoid shadows",

  // Demo section
  tryDemoImages: "Try Demo Images",
  demoDescription: "Select a demo image to quickly test our system",
  selected: "Selected",

  // Image preview
  imagePreview: "Image Preview",
  clearImage: "Clear Image",
  processImage: "Process Image",
  processing: "Processing...",
  uploaded: "Uploaded:",
  demo: "Demo:",
  originalImage: "Original",
  processedImage: "Processed",

  // Results
  extractedInformation: "Extracted Information",
  copy: "Copy",
  copied: "Copied!",
  idNumber: "ID Number",
  fullName: "Full Name",
  dateOfBirth: "Date of Birth",
  issueDate: "Issue Date",
  expiryDate: "Expiry Date",
  address: "Address",
  issueLocation: "Issue Location",
  mrz: "Machine Readable Zone",
  placeOfBirth: "Place of Birth",

  // Status messages
  readyToProcess: "Ready to Process",
  readyToProcessDesc: 'Click "Process Image" to extract information from your ID card',
  readyToExtract: "Ready to Extract Information",
  readyToExtractDesc: "Upload your ID card or select a demo image to get started",

  // How to use
  howToUse: "How to Use",
  step1: "Upload your ID card image or select a demo image",
  step2: 'Click the "Process Image" button to start extraction',
  step3: "View the extracted information instantly",
  step4: 'Use "Clear Image" to start over with a new image',

  // Footer
  copyright: "© 2024 IDCR - ID Card Reader. All rights reserved.",

  // Demo image names
  driverLicense1: "Driver License 1",
  nationalId1: "National ID 1",
  passport1: "Passport 1",
  driverLicense2: "Driver License 2",
  nationalId2: "National ID 2",
  studentId: "Student ID",
  passport2: "Passport 2",

  // Language
  language: "Language",
  english: "English",
  vietnamese: "Tiếng Việt",
  processingFailed: "Processing Failed",
  tryAgain: "Try Again",
} as const

export type TranslationKey = keyof typeof en 