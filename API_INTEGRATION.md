# IDCR API Integration

This document describes the integration of the IDCR (ID Card Recognition) API into the frontend application.

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://api-gw.autoprocai.com
NEXT_PUBLIC_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your actual API key from the IDCR service.

## API Endpoint

- **URL:** `POST https://api-gw.autoprocai.com/idcr-api/doc_extract`
- **Headers:** 
  - `apikey`: Your API key
  - `Content-Type`: `multipart/form-data`
- **Body:** 
  - `check_options`: Array of validation checks (default: all checks)
  - `image_file`: The uploaded image file

## Features

### 1. Image Processing
- Upload ID card images for processing
- Support for various image formats
- Real-time processing with the IDCR API

### 2. Validation Checks
The API performs the following validation checks:
- `face`: Face detection validation
- `partiallylost`: Check for partially lost/damaged documents
- `canceled`: Check for canceled documents
- `photocopy`: Detect photocopied documents
- `iluminate`: Check for illuminated documents
- `emblem`: Emblem validation
- `edited`: Detect edited documents

### 3. Extracted Information
The API extracts the following information:
- ID Number (`idnum`)
- Full Name (`name`)
- Date of Birth (`dob`)
- Sex (`sex`)
- Nationality (`nationality`)
- Place of Origin (`home`)
- Current Address (`address`)
- Date of Expiry (`doe`)
- Ethnicity (`ethnicity`)

### 4. Error Handling
The application handles various error scenarios:
- **401 Unauthorized**: Invalid or missing API key
- **403 Forbidden**: Insufficient permissions
- **500 Internal Server Error**: Server-side errors
- **Network Errors**: Connection issues
- **Validation Errors**: Document quality issues

### 5. Response Processing
- **Success**: Displays extracted information with processed image
- **Validation Warnings**: Shows warnings for document quality issues while still displaying available information
- **Complete Failure**: Shows error message with retry option

## Usage

1. **Upload Image**: Use the upload tab to select an ID card image
2. **Process**: Click the "Process Image" button to send the image to the API
3. **View Results**: The extracted information will be displayed in the results card
4. **Handle Warnings**: If validation warnings appear, review the document quality and try again if needed

## API Response Format

### Success Response
```json
{
  "code": "1000",
  "status": "Done",
  "data": {
    "valid_check": {
      "emblem": 0,
      "canceled": 0,
      "iluminate": 0,
      "photocopy": 0,
      "partiallylost": 0,
      "face": 0,
      "edited": 0
    },
    "doc_type": "mat_truoc_cccd",
    "info_field": {
      "qrcode": "can not read",
      "idnum": "075303022796",
      "name": "NGUYỄN THỤY BÍCH THỦY",
      "dob": "14/03/2003",
      "sex": "Nữ",
      "nationality": "Việt Nam",
      "home": "Minh Nông, Thành Phố Việt Trì, Phú Thọ",
      "address": "Ấp Phú Yên Phú Trung, Tân Phú, Đồng Nai",
      "doe": "14/03/2028",
      "ethnicity": "",
      "address_dict": {
        "province": "Đồng Nai",
        "district": "Tân Phú",
        "commune": "Phú Trung",
        "other": "Ấp Phú Yên"
      }
    },
    "doc_crop": "base64_image_data"
  }
}
```

### Validation Error Response
```json
{
  "code": "1000",
  "status": "Done",
  "data": {
    "valid_check": {
      "canceled": 0,
      "partiallylost": 0,
      "face": 1
    },
    "info_field": {},
    "doc_crop": ""
  }
}
```

## Security Notes

- API keys are stored in environment variables
- API keys are sent via request headers
- All API communication uses HTTPS
- No sensitive data is stored locally

## Troubleshooting

1. **API Key Issues**: Ensure your API key is correctly set in `.env.local`
2. **Network Errors**: Check your internet connection
3. **Image Format**: Ensure the uploaded image is in a supported format
4. **File Size**: Check if the image file size is within acceptable limits
5. **Validation Errors**: Try uploading a clearer, better-quality image 