import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: {
    default: 'QR Code Generator | Create, Customize & Track QR Codes',
    template: '%s | QR Small'
  },
  description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator. Perfect for businesses, marketing, and personal use.',
  keywords: ['QR code generator', 'QR code maker', 'QR code creator', 'custom QR codes', 'QR code tracking', 'dynamic QR codes', 'business QR codes', 'marketing QR codes'],
  authors: [{ name: 'QR Small' }],
  creator: 'QR Small',
  publisher: 'QR Small',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'QR Code Generator | Create, Customize & Track QR Codes',
    description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator.',
    siteName: 'QR Small',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator | Create, Customize & Track QR Codes',
    description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator.',
    creator: '@namit211',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
