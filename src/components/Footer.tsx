import Link from 'next/link';
import { Database } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Database className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">CloudDB</span>
            </Link>
            <p className="mt-4 text-sm">
              Enterprise-grade managed database services for modern applications.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/mysql" className="hover:text-white">MySQL</Link></li>
              <li><Link href="/services/postgresql" className="hover:text-white">PostgreSQL</Link></li>
              <li><Link href="/services/mongodb" className="hover:text-white">MongoDB</Link></li>
              <li><Link href="/services/redis" className="hover:text-white">Redis</Link></li>
              <li><Link href="/services/elasticsearch" className="hover:text-white">Elasticsearch</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/sla" className="hover:text-white">SLA</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} CloudDB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
