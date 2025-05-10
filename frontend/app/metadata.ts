import { Metadata } from 'next';

export const siteConfig = {
  name: 'QR Small',
  description: 'Generate and manage QR codes with ease',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@qrsmall',
  },
  icons: {
    icon: '/favicon.ico',
  },
}; 