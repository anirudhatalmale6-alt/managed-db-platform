'use client';

import { use } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  Check,
  Shield,
  Zap,
  Clock,
  Server,
  Database,
  BarChart3,
  Globe,
  Lock,
  Cloud,
  HardDrive,
  RefreshCw,
  Users,
} from 'lucide-react';

const serviceData: Record<string, {
  name: string;
  icon: string;
  tagline: string;
  description: string;
  color: string;
  gradient: string;
  features: { title: string; description: string }[];
  useCases: string[];
  specs: { label: string; value: string }[];
  pricing: { plan: string; price: string; features: string[] }[];
}> = {
  mysql: {
    name: 'MySQL',
    icon: '🐬',
    tagline: 'The world\'s most popular open-source database',
    description: 'Fully managed MySQL with automated backups, high availability, and seamless scaling. Perfect for web applications, e-commerce, and enterprise workloads.',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    features: [
      { title: 'High Availability', description: 'Automatic failover with multi-AZ deployment and read replicas' },
      { title: 'Automated Backups', description: 'Point-in-time recovery with backups retained up to 30 days' },
      { title: 'Performance Insights', description: 'Query performance monitoring and optimization recommendations' },
      { title: 'Seamless Scaling', description: 'Scale compute and storage independently with zero downtime' },
      { title: 'Security', description: 'Encryption at rest and in transit, VPC isolation, IAM integration' },
      { title: 'Version Support', description: 'Support for MySQL 5.7 and 8.0 with managed upgrades' },
    ],
    useCases: [
      'Web applications and content management systems',
      'E-commerce platforms and online stores',
      'SaaS applications and multi-tenant systems',
      'Business applications and ERP systems',
      'Mobile app backends',
    ],
    specs: [
      { label: 'Max Storage', value: '64 TB' },
      { label: 'Max Connections', value: '16,000' },
      { label: 'IOPS', value: 'Up to 256,000' },
      { label: 'Backup Retention', value: '30 days' },
    ],
    pricing: [
      { plan: 'Starter', price: '$15', features: ['1 vCPU', '1 GB RAM', '10 GB Storage', 'Daily backups'] },
      { plan: 'Business', price: '$99', features: ['4 vCPU', '8 GB RAM', '100 GB Storage', 'High availability'] },
      { plan: 'Enterprise', price: '$499', features: ['16 vCPU', '64 GB RAM', '1 TB Storage', 'Dedicated support'] },
    ],
  },
  postgresql: {
    name: 'PostgreSQL',
    icon: '🐘',
    tagline: 'The world\'s most advanced open-source database',
    description: 'Enterprise-grade PostgreSQL with advanced features like JSONB, full-text search, and PostGIS. Ideal for complex queries and analytical workloads.',
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-600',
    features: [
      { title: 'Advanced Data Types', description: 'Native support for JSONB, arrays, hstore, and custom types' },
      { title: 'Extensions', description: 'PostGIS, pg_vector, TimescaleDB, and 100+ extensions available' },
      { title: 'Logical Replication', description: 'Flexible replication with pub/sub model for data distribution' },
      { title: 'Connection Pooling', description: 'Built-in PgBouncer for efficient connection management' },
      { title: 'Performance', description: 'Parallel queries, JIT compilation, and advanced optimizer' },
      { title: 'ACID Compliance', description: 'Full ACID compliance with MVCC for concurrent operations' },
    ],
    useCases: [
      'Complex analytical and reporting systems',
      'Geospatial applications with PostGIS',
      'Financial and banking applications',
      'Healthcare and life sciences',
      'AI/ML applications with vector search',
    ],
    specs: [
      { label: 'Max Storage', value: '64 TB' },
      { label: 'Max Connections', value: '5,000' },
      { label: 'Extensions', value: '100+' },
      { label: 'Versions', value: '12-16' },
    ],
    pricing: [
      { plan: 'Starter', price: '$15', features: ['1 vCPU', '1 GB RAM', '10 GB Storage', 'Daily backups'] },
      { plan: 'Business', price: '$119', features: ['4 vCPU', '8 GB RAM', '100 GB Storage', 'Read replicas'] },
      { plan: 'Enterprise', price: '$549', features: ['16 vCPU', '64 GB RAM', '1 TB Storage', 'Dedicated cluster'] },
    ],
  },
  mongodb: {
    name: 'MongoDB',
    icon: '🍃',
    tagline: 'Flexible document database for modern applications',
    description: 'Fully managed MongoDB with flexible schema design, horizontal scaling, and real-time analytics. Perfect for agile development and unstructured data.',
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    features: [
      { title: 'Flexible Schema', description: 'Dynamic schemas that evolve with your application needs' },
      { title: 'Sharding', description: 'Horizontal scaling with automatic data distribution' },
      { title: 'Aggregation Pipeline', description: 'Powerful data processing and transformation framework' },
      { title: 'Change Streams', description: 'Real-time data change notifications for event-driven apps' },
      { title: 'Atlas Search', description: 'Integrated full-text search with fuzzy matching and facets' },
      { title: 'Time Series', description: 'Optimized collections for time-series data and IoT workloads' },
    ],
    useCases: [
      'Content management and catalog systems',
      'Real-time analytics and dashboards',
      'IoT and time-series data',
      'Mobile and gaming applications',
      'Personalization engines',
    ],
    specs: [
      { label: 'Max Storage', value: 'Unlimited' },
      { label: 'Shards', value: 'Up to 50' },
      { label: 'Replica Set', value: '3-7 nodes' },
      { label: 'Versions', value: '4.4-7.0' },
    ],
    pricing: [
      { plan: 'Starter', price: '$19', features: ['Shared cluster', '512 MB RAM', '5 GB Storage', 'Basic monitoring'] },
      { plan: 'Business', price: '$149', features: ['Dedicated cluster', '8 GB RAM', '100 GB Storage', 'Auto-scaling'] },
      { plan: 'Enterprise', price: '$699', features: ['Multi-region', '64 GB RAM', '1 TB Storage', 'Advanced security'] },
    ],
  },
  redis: {
    name: 'Redis',
    icon: '⚡',
    tagline: 'Lightning-fast in-memory data store',
    description: 'Managed Redis for caching, session management, real-time analytics, and message queuing. Sub-millisecond latency for demanding applications.',
    color: 'red',
    gradient: 'from-red-500 to-red-600',
    features: [
      { title: 'Sub-millisecond Latency', description: 'In-memory operations with microsecond response times' },
      { title: 'Data Structures', description: 'Strings, hashes, lists, sets, sorted sets, streams, and more' },
      { title: 'Pub/Sub Messaging', description: 'Real-time messaging for chat, notifications, and events' },
      { title: 'Redis Cluster', description: 'Automatic sharding and high availability across nodes' },
      { title: 'Persistence', description: 'RDB snapshots and AOF for data durability' },
      { title: 'Lua Scripting', description: 'Server-side scripting for atomic operations' },
    ],
    useCases: [
      'Application caching and acceleration',
      'Session management and authentication',
      'Real-time leaderboards and counting',
      'Message queues and job processing',
      'Rate limiting and throttling',
    ],
    specs: [
      { label: 'Max Memory', value: '512 GB' },
      { label: 'Latency', value: '<1 ms' },
      { label: 'Throughput', value: '1M+ ops/sec' },
      { label: 'Versions', value: '6.x-7.x' },
    ],
    pricing: [
      { plan: 'Starter', price: '$10', features: ['256 MB RAM', 'Single node', 'Basic persistence', '99.9% SLA'] },
      { plan: 'Business', price: '$79', features: ['4 GB RAM', 'Cluster mode', 'HA failover', 'VPC peering'] },
      { plan: 'Enterprise', price: '$349', features: ['32 GB RAM', 'Multi-AZ', 'Dedicated nodes', '24/7 support'] },
    ],
  },
  elasticsearch: {
    name: 'Elasticsearch',
    icon: '🔍',
    tagline: 'Powerful search and analytics engine',
    description: 'Managed Elasticsearch for full-text search, log analytics, and observability. Scale from millions to billions of documents with ease.',
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-500',
    features: [
      { title: 'Full-Text Search', description: 'Advanced text analysis, relevance scoring, and fuzzy matching' },
      { title: 'Real-Time Analytics', description: 'Aggregations and visualizations for large-scale data' },
      { title: 'Machine Learning', description: 'Anomaly detection, forecasting, and NLP capabilities' },
      { title: 'Index Management', description: 'ILM policies, rollover, and automated retention' },
      { title: 'Security', description: 'Field-level security, audit logging, and SSO integration' },
      { title: 'Kibana Included', description: 'Pre-configured Kibana for visualization and dashboards' },
    ],
    useCases: [
      'Application and site search',
      'Log and event data analytics',
      'Security information and event management (SIEM)',
      'Business analytics and reporting',
      'Observability and APM',
    ],
    specs: [
      { label: 'Max Storage', value: 'Petabytes' },
      { label: 'Nodes', value: 'Up to 200' },
      { label: 'Indices', value: 'Unlimited' },
      { label: 'Versions', value: '7.x-8.x' },
    ],
    pricing: [
      { plan: 'Starter', price: '$29', features: ['2 GB RAM', '20 GB Storage', 'Kibana included', 'Basic monitoring'] },
      { plan: 'Business', price: '$199', features: ['16 GB RAM', '500 GB Storage', 'ML features', 'Cross-cluster'] },
      { plan: 'Enterprise', price: '$899', features: ['64 GB RAM', '2 TB Storage', 'Advanced security', 'Dedicated'] },
    ],
  },
};

export default function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = use(params);
  const service = serviceData[resolvedParams.service];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const colorClasses: Record<string, { bg: string; text: string; border: string; ring: string }> = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', ring: 'ring-blue-500' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', ring: 'ring-indigo-500' },
    green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', ring: 'ring-green-500' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', ring: 'ring-red-500' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', ring: 'ring-yellow-500' },
  };

  const colors = colorClasses[service.color];

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/10 to-gray-950 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${service.gradient} opacity-20 rounded-full blur-3xl`} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">{service.icon}</span>
                <div>
                  <h1 className="text-4xl font-bold text-white">{service.name}</h1>
                  <p className={`${colors.text} font-medium`}>Managed Service</p>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-4">{service.tagline}</p>
              <p className="text-gray-500 mb-8">{service.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className={`rounded-lg bg-gradient-to-r ${service.gradient} px-6 py-3 text-lg font-semibold text-white hover:opacity-90 transition-all text-center`}
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border border-gray-700 px-6 py-3 text-lg font-semibold text-gray-300 hover:bg-gray-800 transition-all text-center"
                >
                  Contact Sales
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>50+ Regions</span>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-2xl ${colors.bg} border ${colors.border}`}>
              <h3 className="text-lg font-semibold text-white mb-6">Quick Specs</h3>
              <div className="grid grid-cols-2 gap-6">
                {service.specs.map((spec) => (
                  <div key={spec.label}>
                    <div className={`text-2xl font-bold ${colors.text}`}>{spec.value}</div>
                    <div className="text-gray-500 text-sm">{spec.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Key Features</h2>
            <p className="mt-4 text-gray-400">Everything you need for production-ready {service.name}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-all"
              >
                <div className={`h-10 w-10 rounded-lg ${colors.bg} flex items-center justify-center mb-4`}>
                  <Check className={`h-5 w-5 ${colors.text}`} />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Common Use Cases</h2>
              <p className="text-gray-400 mb-8">
                {service.name} is the perfect choice for a wide range of applications and workloads.
              </p>
              <div className="space-y-4">
                {service.useCases.map((useCase) => (
                  <div key={useCase} className="flex items-start gap-3">
                    <div className={`h-6 w-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className={`h-3.5 w-3.5 ${colors.text}`} />
                    </div>
                    <span className="text-gray-300">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                <HardDrive className={`h-8 w-8 ${colors.text} mb-3`} />
                <h4 className="font-semibold text-white">NVMe Storage</h4>
                <p className="text-sm text-gray-500 mt-1">Fast SSD storage for all workloads</p>
              </div>
              <div className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                <RefreshCw className={`h-8 w-8 ${colors.text} mb-3`} />
                <h4 className="font-semibold text-white">Auto Failover</h4>
                <p className="text-sm text-gray-500 mt-1">Automatic recovery in seconds</p>
              </div>
              <div className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                <Lock className={`h-8 w-8 ${colors.text} mb-3`} />
                <h4 className="font-semibold text-white">Encryption</h4>
                <p className="text-sm text-gray-500 mt-1">Data encrypted at rest & in transit</p>
              </div>
              <div className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                <Users className={`h-8 w-8 ${colors.text} mb-3`} />
                <h4 className="font-semibold text-white">24/7 Support</h4>
                <p className="text-sm text-gray-500 mt-1">Expert help when you need it</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-gray-400">Start free, scale as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {service.pricing.map((tier, index) => (
              <div
                key={tier.plan}
                className={`p-8 rounded-2xl border transition-all ${
                  index === 1
                    ? `bg-gradient-to-b from-gray-800 to-gray-800/50 border-purple-500/50 ring-1 ring-purple-500/20`
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'
                }`}
              >
                {index === 1 && (
                  <span className="inline-block px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white">{tier.plan}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <Check className={`h-4 w-4 ${colors.text}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-8 block w-full py-3 px-4 rounded-lg text-center font-medium transition-all ${
                    index === 1
                      ? `bg-gradient-to-r ${service.gradient} text-white hover:opacity-90`
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 via-gray-950 to-gray-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to get started with {service.name}?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Deploy your first {service.name} database in under 2 minutes.
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
              View All Pricing <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
