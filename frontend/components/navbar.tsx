import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </div>
              <h1 className="text-xl font-semibold text-slate-800">QR Small</h1>
            </Link>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="text-slate-800 font-medium hover:text-emerald-600 transition-colors">
                  Generator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-800 font-medium hover:text-emerald-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 