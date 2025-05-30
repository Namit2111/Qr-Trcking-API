'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/context';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-20 h-20 rounded-md flex items-center justify-center">
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </div>
              <h1 className="text-xl font-semibold text-slate-800">QR Small</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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
              {user && (
                <li>
                  <Link href="/dashboard" className="text-slate-800 font-medium hover:text-emerald-600 transition-colors">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-slate-800 font-medium">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-800 font-medium hover:text-emerald-600 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-slate-800 font-medium hover:text-emerald-600 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-800 hover:text-emerald-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-slate-800 font-medium hover:text-emerald-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Generator
              </Link>
              <Link
                href="/blog"
                className="text-slate-800 font-medium hover:text-emerald-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className="text-slate-800 font-medium hover:text-emerald-600 transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="flex flex-col space-y-2 pt-2 border-t border-slate-200">
                {user ? (
                  <>
                    <div className="px-2 py-1 text-slate-800 font-medium">
                      Welcome, {user.name}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-slate-800 font-medium hover:text-emerald-600 transition-colors px-2 py-1"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-slate-800 font-medium hover:text-emerald-600 transition-colors px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 