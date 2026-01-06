import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Check } from 'lucide-react';

const databases = [
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '🐬',
    tagline: 'The world\'s most popular open-source database',
    description: 'MySQL is a reliable, high-performance relational database perfect for web applications, e-commerce, and content management systems.',
    features: [
      'ACID compliance',
      'Full-text search',
      'Replication support',
      'Stored procedures',
      'JSON support',
      'InnoDB engine',
    ],
    useCases: ['Web Applications', 'E-commerce', 'CMS', 'SaaS Platforms'],
    versions: ['8.0', '5.7'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    tagline: 'The world\'s most advanced open-source database',
    description: 'PostgreSQL is a powerful, enterprise-class relational database with advanced features like JSON support, full-text search, and geospatial data.',
    features: [
      'Advanced indexing',
      'JSONB support',
      'PostGIS extension',
      'Parallel queries',
      'Table partitioning',
      'Logical replication',
    ],
    useCases: ['Analytics', 'Geospatial Apps', 'Financial Systems', 'Data Warehousing'],
    versions: ['16', '15', '14'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    tagline: 'The leading NoSQL document database',
    description: 'MongoDB offers flexibility with a document model that maps to how you think and code. Perfect for modern applications with evolving data models.',
    features: [
      'Flexible schema',
      'Horizontal scaling',
      'Aggregation framework',
      'Change streams',
      'Atlas Search',
      'Time series collections',
    ],
    useCases: ['Mobile Apps', 'IoT', 'Real-time Analytics', 'Content Management'],
    versions: ['7.0', '6.0'],
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: '⚡',
    tagline: 'In-memory data store for blazing fast performance',
    description: 'Redis is an in-memory key-value store known for its speed. Use it for caching, session management, real-time leaderboards, and pub/sub messaging.',
    features: [
      'Sub-millisecond latency',
      'Data persistence',
      'Pub/Sub messaging',
      'Lua scripting',
      'Cluster mode',
      'Streams',
    ],
    useCases: ['Caching', 'Session Store', 'Message Queues', 'Real-time Analytics'],
    versions: ['7.2', '7.0', '6.2'],
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    icon: '🔍',
    tagline: 'Distributed search and analytics engine',
    description: 'Elasticsearch is a distributed, RESTful search and analytics engine. Ideal for log analytics, full-text search, and application performance monitoring.',
    features: [
      'Full-text search',
      'Near real-time indexing',
      'RESTful API',
      'Aggregations',
      'Machine learning',
      'Index lifecycle management',
    ],
    useCases: ['Log Analytics', 'Full-text Search', 'APM', 'Security Analytics'],
    versions: ['8.x', '7.x'],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold">Managed Database Services</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Choose from five industry-leading database engines, fully managed with automated backups, monitoring, and scaling.
            </p>
          </div>
        </section>

        {/* Database List */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {databases.map((db, index) => (
                <div
                  key={db.id}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{db.icon}</span>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{db.name}</h2>
                        <p className="text-blue-600 font-medium">{db.tagline}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg">{db.description}</p>

                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {db.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Available Versions</h3>
                      <div className="flex gap-2">
                        {db.versions.map((version) => (
                          <span
                            key={version}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                          >
                            {version}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/signup"
                      className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                      Deploy {db.name} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-2xl p-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {db.useCases.map((useCase) => (
                        <div
                          key={useCase}
                          className="bg-white p-4 rounded-lg shadow-sm text-center"
                        >
                          <span className="text-gray-700 font-medium">{useCase}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Starting at $25/month</strong> with automated backups, monitoring, and 24/7 support included.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-blue-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to deploy your database?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Get started in minutes with our 14-day free trial.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
