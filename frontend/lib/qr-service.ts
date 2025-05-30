export interface QRCodeData {
  id: string;
  content: string;
  isTracking: boolean;
  isShortUrl: boolean;
  foregroundColor: string;
  backgroundColor: string;
  hasLogo: boolean;
  createdAt: string;
  scans: any[];
  trackingUrl?: string;
}

// Mock storage for QR codes (in a real app, this would be a database)
const qrCodes: QRCodeData[] = [
  {
    id: "1",
    content: "https://example.com",
    isTracking: true,
    isShortUrl: false,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    hasLogo: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    scans: [
      {
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        location: "New York, USA",
      },
      {
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: "London, UK",
      },
      {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Tokyo, Japan",
      },
    ],
  },
  {
    id: "2",
    content: "https://mywebsite.com/product",
    isTracking: true,
    isShortUrl: true,

    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    hasLogo: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    scans: [
      {
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Paris, France",
      },
      {
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Berlin, Germany",
      },
    ],
  },
  {
    id: "3",
    content: "https://blog.example.com/article",
    isTracking: true,
    isShortUrl: false,

    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    hasLogo: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    scans: [],
  },
]

// Get QR codes (filtered by private key if provided)


// Save a new QR code
export function saveQRCode(qrCode: QRCodeData): void {
  // In a real app, this would save to a database
  qrCodes.push(qrCode)
  console.log("QR code saved:", qrCode)
}

// Update an existing QR code
export function updateQRCode(id: string, updates: Partial<QRCodeData>): void {
  const index = qrCodes.findIndex((qr) => qr.id === id)
  if (index !== -1) {
    qrCodes[index] = { ...qrCodes[index], ...updates }
    console.log("QR code updated:", qrCodes[index])
  }
}

// Add a scan to a QR code
export function addScan(id: string, location?: string): void {
  const index = qrCodes.findIndex((qr) => qr.id === id)
  if (index !== -1) {
    qrCodes[index].scans.push({
      timestamp: new Date().toISOString(),
      location,
    })
    console.log("Scan added to QR code:", qrCodes[index])
  }
}
