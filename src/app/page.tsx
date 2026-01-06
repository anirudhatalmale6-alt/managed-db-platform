import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Database,
  Shield,
  Zap,
  Clock,
  Server,
  BarChart3,
  ArrowRight,
  Check
} from 'lucide-react';

const databases = [
  { name: 'MySQL', icon: '🐬', description: 'Reliable relational database for web applications' },
  { name: 'PostgreSQL', icon: '🐘', description: 'Advanced open-source relational database' },
  { name: 'MongoDB', icon: '🍃', description: 'Flexible NoSQL document database' },
  { name: 'Redis', icon: '⚡', description: 'In-memory data store for caching' },
  { name: 'Elasticsearch', icon: '🔍', description: 'Distributed search and analytics engine' },
];

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, VPC isolation, and compliance with SOC 2, GDPR, and HIPAA.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized configurations and SSD storage for lightning-fast query performance.',
  },
  {
    icon: Clock,
    title: '99.99% Uptime SLA',
    description: 'Automated failover and multi-region replication for maximum availability.',
  },
  {
    icon: Server,
    title: 'Auto Scaling',
    description: 'Scale resources up or down automatically based on your workload demands.',
  },
  {
    icon: Database,
    title: 'Automated Backups',
    description: 'Point-in-time recovery with automated daily backups retained for 30 days.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Monitoring',
    description: 'Comprehensive metrics, alerts, and query performance insights.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 25,
    features: ['1 vCPU', '1 GB RAM', '20 GB SSD Storage', 'Daily Backups', 'Basic Support'],
  },
  {
    name: 'Professional',
    price: 99,
    popular: true,
    features: ['2 vCPU', '4 GB RAM', '100 GB SSD Storage', 'Point-in-time Recovery', 'Priority Support', 'VPC Peering'],
  },
  {
    name: 'Enterprise',
    price: 299,
    features: ['8 vCPU', '16 GB RAM', '500 GB SSD Storage', 'Multi-region Replication', '24/7 Support', 'Dedicated Resources'],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Managed Database Services
              <span className="block text-blue-200">Built for Scale</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
              Deploy and manage MySQL, PostgreSQL, MongoDB, Redis, and Elasticsearch with enterprise-grade reliability, security, and performance.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-50"
              >
                Start Free Trial
              </Link>
              <Link
                href="/pricing"
                className="rounded-md border-2 border-white px-6 py-3 text-lg font-semibold text-white hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Supported Databases */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Supported Databases</h2>
            <p className="mt-4 text-lg text-gray-600">Choose from industry-leading database engines</p>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
            {databases.map((db) => (
              <div
                key={db.name}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all cursor-pointer"
              >
                <span className="text-4xl mb-3">{db.icon}</span>
                <h3 className="font-semibold text-gray-900">{db.name}</h3>
                <p className="mt-2 text-sm text-gray-600 text-center">{db.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose CloudDB?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to run databases in production</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm">
                <feature.icon className="h-10 w-10 text-blue-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">Start small, scale as you grow</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-xl ${
                  plan.popular
                    ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={plan.popular ? 'text-blue-100' : 'text-gray-500'}>/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className={`h-5 w-5 ${plan.popular ? 'text-blue-200' : 'text-blue-600'}`} />
                      <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-8 block w-full py-3 rounded-md text-center font-semibold ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
              View full pricing details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Deploy your first database in minutes with our 14-day free trial.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-50"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
