import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Qr-Small',
  description: 'Created with love',
  generator: 'namitjain.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
