'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Database } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Database className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CloudDB</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-x-8">
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Documentation
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/services" className="text-sm font-medium text-gray-700">Services</Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-700">Pricing</Link>
              <Link href="/docs" className="text-sm font-medium text-gray-700">Documentation</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-700">Contact</Link>
              <hr />
              <Link href="/login" className="text-sm font-medium text-gray-700">Sign in</Link>
              <Link href="/signup" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
