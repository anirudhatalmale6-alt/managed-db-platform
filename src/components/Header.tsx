'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Database, ChevronDown } from 'lucide-react';

const services = [
  { name: 'MySQL', href: '/services/mysql', icon: '🐬' },
  { name: 'PostgreSQL', href: '/services/postgresql', icon: '🐘' },
  { name: 'MongoDB', href: '/services/mongodb', icon: '🍃' },
  { name: 'Redis', href: '/services/redis', icon: '⚡' },
  { name: 'Elasticsearch', href: '/services/elasticsearch', icon: '🔍' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  if (isDashboard) return null;

  return (
    <header className="bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Database className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold text-white">CloudDB</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-x-8">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setServicesOpen(false)} />
                  <div className="absolute left-0 mt-4 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-20 py-2">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="text-xl">{service.icon}</span>
                        <span>{service.name}</span>
                      </Link>
                    ))}
                    <hr className="my-2 border-gray-800" />
                    <Link
                      href="/services"
                      className="block px-4 py-3 text-purple-400 hover:text-purple-300 hover:bg-gray-800"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                </>
              )}
            </div>

            <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition-colors"
            >
              Start Free
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider px-2">Services</p>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{service.icon}</span>
                    {service.name}
                  </Link>
                ))}
              </div>
              <hr className="border-gray-800" />
              <Link href="/pricing" className="text-sm font-medium text-gray-300 px-2">Pricing</Link>
              <Link href="/docs" className="text-sm font-medium text-gray-300 px-2">Docs</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-300 px-2">Contact</Link>
              <hr className="border-gray-800" />
              <Link href="/login" className="text-sm font-medium text-gray-300 px-2">Sign in</Link>
              <Link
                href="/signup"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white text-center"
              >
                Start Free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
