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
  Layers,
  RefreshCw,
  HeartPulse,
  Terminal,
} from 'lucide-react';

const databases = [
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '🐬',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Reliable relational database',
    popular: true,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    color: 'bg-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    description: 'Advanced open-source database',
    popular: true,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    color: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'Flexible document database',
    popular: false,
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: '⚡',
    color: 'bg-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    description: 'In-memory data store',
    popular: false,
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    icon: '🔍',
    color: 'bg-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description: 'Search & analytics engine',
    popular: false,
  },
];

const rotatingTexts = ['Databases', 'Streaming', 'Caching', 'Search', 'Analytics'];

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, VPC isolation, SOC 2, GDPR, and HIPAA compliance built-in.',
  },
  {
    icon: Zap,
    title: 'Blazing Performance',
    description: 'NVMe SSD storage with optimized configurations for sub-millisecond latency.',
  },
  {
    icon: RefreshCw,
    title: 'Auto Failover',
    description: 'Zero-downtime failover with automatic health checks and recovery.',
  },
  {
    icon: Layers,
    title: 'Horizontal Scaling',
    description: 'Scale from a single node to a global cluster with one click.',
  },
  {
    icon: HeartPulse,
    title: 'Health Monitoring',
    description: 'Real-time metrics, anomaly detection, and intelligent alerting.',
  },
  {
    icon: Terminal,
    title: 'Developer First',
    description: 'REST APIs, CLI tools, Terraform providers, and native integrations.',
  },
];

const stats = [
  { value: '99.99%', label: 'Uptime SLA', icon: Clock },
  { value: '50+', label: 'Cloud Regions', icon: Globe },
  { value: '10M+', label: 'Databases', icon: Database },
  { value: '24/7', label: 'Expert Support', icon: HeartPulse },
];

const cloudProviders = [
  { name: 'AWS', regions: '25 regions', color: 'text-orange-400' },
  { name: 'Google Cloud', regions: '20 regions', color: 'text-blue-400' },
  { name: 'Azure', regions: '18 regions', color: 'text-cyan-400' },
  { name: 'DigitalOcean', regions: '8 regions', color: 'text-blue-500' },
];

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsVisible(true);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      {/* Hero Section - Unique CloudDB Design */}
      <section className="relative overflow-hidden bg-gray-950 pt-8">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-900/20 via-transparent to-transparent rounded-full" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium">Now with Vector Database Support</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Open Source Data</span>
              <span className="block mt-2">
                Infrastructure for{' '}
                <span
                  className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {rotatingTexts[currentTextIndex]}
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed">
              Deploy production-ready MySQL, PostgreSQL, MongoDB, Redis, and Elasticsearch
              in minutes. Enterprise security and reliability without the complexity.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="group rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white hover:from-cyan-400 hover:to-teal-400 transition-all shadow-lg shadow-cyan-500/25"
              >
                Start Free Trial
                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-gray-700 bg-gray-900/50 px-8 py-4 text-lg font-semibold text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition-all backdrop-blur-sm"
              >
                Talk to Sales
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800">
                <Shield className="h-4 w-4 text-cyan-500" />
                <span className="text-sm">SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800">
                <Lock className="h-4 w-4 text-cyan-500" />
                <span className="text-sm">GDPR Ready</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800">
                <Globe className="h-4 w-4 text-cyan-500" />
                <span className="text-sm">Multi-Cloud</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800">
                <HeartPulse className="h-4 w-4 text-cyan-500" />
                <span className="text-sm">HIPAA Eligible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </section>

      {/* Database Services - Card Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Managed Database Services</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Production-ready databases with automated backups, scaling, and 24/7 monitoring
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {databases.map((db) => (
              <Link
                key={db.id}
                href={`/services/${db.id}`}
                className={`group relative p-6 rounded-2xl border ${db.borderColor} ${db.bgColor} hover:scale-105 transition-all duration-300`}
              >
                {db.popular && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-medium bg-cyan-500 text-white rounded-full">
                    Popular
                  </span>
                )}
                <div className="text-center">
                  <span className="text-5xl block mb-4">{db.icon}</span>
                  <h3 className="font-semibold text-white text-lg">{db.name}</h3>
                  <p className="mt-2 text-sm text-gray-400">{db.description}</p>
                  <div className="mt-4 flex items-center justify-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Horizontal */}
      <section className="py-12 bg-gray-950 border-y border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section className="py-20 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why Teams Choose CloudDB</h2>
            <p className="mt-4 text-gray-400">Enterprise features without enterprise complexity</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 rounded-2xl border border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 hover:border-gray-700 transition-all ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Providers */}
      <section className="py-20 bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Deploy on Your Cloud</h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Run CloudDB on AWS, Google Cloud, Azure, or DigitalOcean. Keep your data close
                to your applications with 70+ regions worldwide.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {cloudProviders.map((provider) => (
                  <div key={provider.name} className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <Cloud className={`h-6 w-6 ${provider.color}`} />
                    <div>
                      <div className="font-medium text-white">{provider.name}</div>
                      <div className="text-xs text-gray-500">{provider.regions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-3xl blur-2xl" />
              <div className="relative p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`$ clouddb create postgresql \\
    --name my-database \\
    --region us-east-1 \\
    --plan business

✓ Database created successfully
✓ Connection string copied

Host: db-xyz.clouddb.io
Port: 5432
Status: Running`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-20 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Trusted by innovative teams</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "CloudDB cut our database management time by 80%. The automated backups and monitoring give us peace of mind.",
                author: "Sarah Chen",
                role: "CTO, TechStartup",
              },
              {
                quote: "Migrating from self-managed PostgreSQL to CloudDB was seamless. Performance improved and costs went down.",
                author: "Mike Johnson",
                role: "Lead Engineer, ScaleApp",
              },
              {
                quote: "The multi-cloud support lets us avoid vendor lock-in while maintaining enterprise-grade reliability.",
                author: "Lisa Park",
                role: "VP Engineering, DataCorp",
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-medium">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-gray-950 to-teal-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to simplify your data infrastructure?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Start with a free trial. No credit card required. Deploy in under 2 minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="group rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white hover:from-cyan-400 hover:to-teal-400 transition-all shadow-lg shadow-cyan-500/25"
            >
              Get Started Free
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
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
