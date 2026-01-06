'use client';

import { useState, useEffect } from 'react';
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
  Check,
  Globe,
  Lock,
  Cloud,
  Cpu,
} from 'lucide-react';

const databases = [
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '🐬',
    color: 'from-blue-500 to-blue-600',
    description: 'Reliable relational database'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    color: 'from-indigo-500 to-indigo-600',
    description: 'Advanced open-source database'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    color: 'from-green-500 to-green-600',
    description: 'Flexible document database'
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: '⚡',
    color: 'from-red-500 to-red-600',
    description: 'In-memory data store'
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    icon: '🔍',
    color: 'from-yellow-500 to-yellow-600',
    description: 'Search & analytics engine'
  },
];

const rotatingTexts = ['Databases', 'Streaming', 'Caching', 'Search'];

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, VPC isolation, SOC 2, GDPR, and HIPAA compliance.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized configurations and NVMe SSD storage for blazing fast queries.',
  },
  {
    icon: Clock,
    title: '99.99% Uptime SLA',
    description: 'Automated failover and multi-region replication for maximum availability.',
  },
  {
    icon: Server,
    title: 'Auto Scaling',
    description: 'Scale resources automatically based on your workload demands.',
  },
  {
    icon: Database,
    title: 'Automated Backups',
    description: 'Point-in-time recovery with backups retained for up to 30 days.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Monitoring',
    description: 'Comprehensive metrics, alerts, and query performance insights.',
  },
];

const customers = [
  'TechCorp', 'DataFlow', 'CloudFirst', 'ScaleUp', 'DevForce', 'AppMasters'
];

const stats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '50+', label: 'Cloud Regions' },
  { value: '10M+', label: 'Databases Deployed' },
  { value: '24/7', label: 'Expert Support' },
];

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      {/* Hero Section - Dark gradient like Aiven */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              The Open Source
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Data Platform
              </span>
            </h1>

            <div className="mt-6 h-12 flex items-center justify-center">
              <span className="text-xl sm:text-2xl text-gray-400">
                for{' '}
                <span className="text-purple-400 font-semibold transition-all duration-500">
                  {rotatingTexts[currentTextIndex]}
                </span>
              </span>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              The fastest path to production. Deploy MySQL, PostgreSQL, MongoDB, Redis,
              and Elasticsearch with enterprise-grade reliability and security.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/25"
              >
                Start for Free
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-gray-700 px-8 py-4 text-lg font-semibold text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition-all"
              >
                Book a Demo
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Multi-Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Database Services Grid */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Managed Services</h2>
            <p className="mt-4 text-gray-400">Choose from industry-leading open source databases</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {databases.map((db) => (
              <Link
                key={db.id}
                href={`/services/${db.id}`}
                className="group relative p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 hover:bg-gray-800 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${db.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
                <div className="relative text-center">
                  <span className="text-4xl">{db.icon}</span>
                  <h3 className="mt-3 font-semibold text-white">{db.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{db.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-950 border-y border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why Choose CloudDB?</h2>
            <p className="mt-4 text-gray-400">Everything you need to run databases in production</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Providers */}
      <section className="py-20 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Deploy Anywhere</h2>
            <p className="mt-4 text-gray-400">Multi-cloud support across all major providers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-gray-800/30 border border-gray-700/50 rounded-xl text-center">
              <Cloud className="h-12 w-12 mx-auto text-orange-400" />
              <h3 className="mt-4 font-semibold text-white">AWS</h3>
              <p className="mt-2 text-sm text-gray-500">20+ regions worldwide</p>
            </div>
            <div className="p-8 bg-gray-800/30 border border-gray-700/50 rounded-xl text-center">
              <Cloud className="h-12 w-12 mx-auto text-blue-400" />
              <h3 className="mt-4 font-semibold text-white">Google Cloud</h3>
              <p className="mt-2 text-sm text-gray-500">15+ regions worldwide</p>
            </div>
            <div className="p-8 bg-gray-800/30 border border-gray-700/50 rounded-xl text-center">
              <Cloud className="h-12 w-12 mx-auto text-cyan-400" />
              <h3 className="mt-4 font-semibold text-white">Azure</h3>
              <p className="mt-2 text-sm text-gray-500">15+ regions worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-900 border-y border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Trusted by thousands of companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {customers.map((customer) => (
              <div key={customer} className="text-xl font-semibold text-gray-600">
                {customer}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900/20 via-gray-950 to-gray-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Deploy your first database in minutes. No credit card required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/25"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center text-purple-400 font-semibold hover:text-purple-300"
            >
              View Pricing <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
