import axios from 'axios'
import { IDCRResponse, APIError } from './types'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-gw.autoprocai.com',
  timeout: 30000, // 30 seconds timeout
})

// Request interceptor to add API key
api.interceptors.request.use((config) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  if (apiKey && apiKey !== 'your_api_key_here') {
    config.headers.apikey = apiKey
  }
  return config
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      let message = 'An error occurred while processing your request.'
      
      switch (status) {
        case 401:
          message = 'Unauthorized. Please check your API key.'
          break
        case 403:
          message = 'Access forbidden. Please check your permissions.'
          break
        case 500:
          message = 'Internal server error. Please try again later.'
          break
        default:
          message = data?.message || `Error ${status}: ${data?.error || 'Unknown error'}`
      }
      
      const apiError: APIError = {
        code: status.toString(),
        message
      }
      return Promise.reject(apiError)
    } else if (error.request) {
      // Network error
      const apiError: APIError = {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your internet connection.'
      }
      return Promise.reject(apiError)
    } else {
      // Other error
      const apiError: APIError = {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An unknown error occurred.'
      }
      return Promise.reject(apiError)
    }
  }
)

export interface ProcessImageParams {
  imageFile: File
  checkOptions?: string[]
}

export const idcrApi = {
  /**
   * Process ID card image using the IDCR API
   */
  processImage: async ({ imageFile, checkOptions = ['face', 'partiallylost', 'canceled', 'photocopy', 'iluminate', 'emblem', 'edited'] }: ProcessImageParams): Promise<IDCRResponse> => {
    const formData = new FormData()
    
    // Add check options
    checkOptions.forEach(option => {
      formData.append('check_options', option)
    })
    
    // Add image file
    formData.append('image_file', imageFile)
    
    const response = await api.post<IDCRResponse>('/idcr-api/doc_extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    return response.data
  }
}

export default api 