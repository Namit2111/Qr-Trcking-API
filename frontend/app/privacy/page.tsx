import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read our Privacy Policy to learn how we collect, use, and protect your personal information when you use QR Small.',
  keywords: ['privacy policy', 'data protection', 'user privacy', 'QR Small'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy',
    description: 'Read our Privacy Policy to learn how we collect, use, and protect your personal information when you use QR Small.',
    type: 'article',
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">Privacy Policy</h1>
        <p className="text-slate-600 mb-4">
          Your privacy is important to us. This Privacy Policy explains how QR Small collects, uses, and protects your information.
        </p>
        <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">Information We Collect</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-4">
          <li>Personal information you provide (such as email address, name, etc.)</li>
          <li>Usage data and analytics</li>
          <li>Cookies and tracking technologies</li>
        </ul>
        <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-4">
          <li>To provide and improve our services</li>
          <li>To communicate with you</li>
          <li>To ensure security and prevent fraud</li>
        </ul>
        <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">Your Rights</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-4">
          <li>Access, update, or delete your personal information</li>
          <li>Opt out of marketing communications</li>
        </ul>
        <p className="text-slate-600 mt-8">
          For more details or questions, please contact us at <a href="/contact" className="text-emerald-600 hover:underline">Contact Us</a>.
        </p>
      </div>
    </main>
  );
} 