export interface Scan {
  timestamp: string
  location?: string
}

export interface QRCodeData {
  id: string
  content: string
  dynamicContent?: string
  isTracking: boolean
  isShortUrl: boolean
  foregroundColor: string
  backgroundColor: string
  hasLogo: boolean
  createdAt: string
  scans: Scan[]
}
