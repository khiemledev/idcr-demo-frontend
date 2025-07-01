import { type NextRequest, NextResponse } from "next/server"

// Mock data for demo images
const demoData: Record<number, {
  idNumber: string
  fullName: string
  dateOfBirth: string
  issueDate: string
  expiryDate: string
  address: string
}> = {
  1: {
    idNumber: "DL123456789",
    fullName: "John Michael Smith",
    dateOfBirth: "1985-03-15",
    issueDate: "2020-03-15",
    expiryDate: "2025-03-15",
    address: "123 Main Street, Springfield, IL 62701",
  },
  2: {
    idNumber: "ID987654321",
    fullName: "Sarah Elizabeth Johnson",
    dateOfBirth: "1990-07-22",
    issueDate: "2019-07-22",
    expiryDate: "2029-07-22",
    address: "456 Oak Avenue, Chicago, IL 60601",
  },
  3: {
    idNumber: "PP123456789",
    fullName: "Michael Robert Davis",
    dateOfBirth: "1988-11-08",
    issueDate: "2021-11-08",
    expiryDate: "2031-11-08",
    address: "789 Pine Road, Boston, MA 02101",
  },
  4: {
    idNumber: "DL555666777",
    fullName: "Emily Grace Wilson",
    dateOfBirth: "1992-05-12",
    issueDate: "2022-05-12",
    expiryDate: "2027-05-12",
    address: "321 Elm Street, Austin, TX 73301",
  },
  5: {
    idNumber: "ID111222333",
    fullName: "David Alexander Brown",
    dateOfBirth: "1987-09-30",
    issueDate: "2018-09-30",
    expiryDate: "2028-09-30",
    address: "654 Maple Drive, Seattle, WA 98101",
  },
  6: {
    idNumber: "ST789012345",
    fullName: "Jessica Marie Taylor",
    dateOfBirth: "2001-12-03",
    issueDate: "2023-09-01",
    expiryDate: "2027-06-30",
    address: "987 University Blvd, College Town, CA 90210",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { isDemoImage, demoId } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let extractedInfo
    let processedImageUrl

    if (isDemoImage && demoId && demoData[demoId]) {
      // Return predefined demo data
      extractedInfo = demoData[demoId]
      // Generate processed image URL for demo
      processedImageUrl = `/placeholder.svg?height=400&width=640&text=Processed+Demo+${demoId}+with+Highlights`
    } else {
      // For uploaded images, return mock extracted data
      extractedInfo = {
        idNumber: "ID" + Math.random().toString().substr(2, 9),
        fullName: "Sample User Name",
        dateOfBirth: "1990-01-01",
        issueDate: "2020-01-01",
        expiryDate: "2030-01-01",
        address: "123 Sample Street, Sample City, SC 12345",
      }
      // Generate processed image URL for uploaded image
      processedImageUrl = `/placeholder.svg?height=400&width=640&text=Processed+Upload+with+OCR+Highlights`
    }

    return NextResponse.json({
      success: true,
      extractedInfo,
      processedImageUrl,
      detectionBoxes: [
        { field: "idNumber", x: 120, y: 80, width: 200, height: 25 },
        { field: "fullName", x: 120, y: 120, width: 250, height: 25 },
        { field: "dateOfBirth", x: 120, y: 160, width: 150, height: 25 },
        { field: "issueDate", x: 120, y: 200, width: 150, height: 25 },
        { field: "expiryDate", x: 120, y: 240, width: 150, height: 25 },
        { field: "address", x: 120, y: 280, width: 300, height: 50 },
      ],
    })
  } catch (error) {
    console.error("Processing error:", error)
    return NextResponse.json({ success: false, error: "Failed to process image" }, { status: 500 })
  }
}
