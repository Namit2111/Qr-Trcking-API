import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact QR Small for support, questions, or feedback. We are here to help you with your QR code needs.',
  keywords: ['contact', 'support', 'help', 'QR Small'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Contact Us',
    description: 'Contact QR Small for support, questions, or feedback. We are here to help you with your QR code needs.',
    type: 'website',
  },
};

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">Contact Us</h1>
        <p className="text-slate-600 mb-8">
          Have questions, feedback, or need support? Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none text-lg transition-all shadow-sm" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none text-lg transition-all shadow-sm" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none text-lg transition-all shadow-sm" required></textarea>
          </div>
          <button type="submit" className="w-full py-3 px-4 rounded-lg bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition-all">Send Message</button>
        </form>
      </div>
    </main>
  );
} 