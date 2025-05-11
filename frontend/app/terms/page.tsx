import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read our Terms of Service to understand the rules and guidelines for using QR Small and its services.',
  keywords: ['terms of service', 'terms', 'user agreement', 'QR Small'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Terms of Service',
    description: 'Read our Terms of Service to understand the rules and guidelines for using QR Small and its services.',
    type: 'article',
  },
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">Terms of Service</h1>
        <p className="text-slate-600 mb-4">
          Please read these Terms of Service ("Terms") carefully before using QR Small. By accessing or using our services, you agree to be bound by these Terms.
        </p>
        <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">Use of Service</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-4">
          <li>You must use the service in compliance with all applicable laws.</li>
          <li>Do not misuse, abuse, or attempt to disrupt the service.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">Intellectual Property</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-4">
          <li>All content, trademarks, and data on this site are the property of QR Small or its licensors.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">Limitation of Liability</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-4">
          <li>QR Small is not liable for any damages or losses resulting from your use of the service.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-slate-700 mt-8 mb-2">Changes to Terms</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-4">
          <li>We may update these Terms at any time. Continued use of the service means you accept the new Terms.</li>
        </ul>
        <p className="text-slate-600 mt-8">
          For questions, please <a href="/contact" className="text-emerald-600 hover:underline">Contact Us</a>.
        </p>
      </div>
    </main>
  );
} 