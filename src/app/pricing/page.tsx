import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for development and small projects',
    priceMonthly: 25,
    priceHourly: 0.035,
    features: [
      { name: '1 vCPU', included: true },
      { name: '1 GB RAM', included: true },
      { name: '20 GB SSD Storage', included: true },
      { name: 'Daily Backups', included: true },
      { name: 'Basic Monitoring', included: true },
      { name: 'Community Support', included: true },
      { name: 'VPC Peering', included: false },
      { name: 'Multi-region Replication', included: false },
      { name: 'Dedicated Resources', included: false },
    ],
  },
  {
    name: 'Professional',
    description: 'For growing applications and teams',
    priceMonthly: 99,
    priceHourly: 0.137,
    popular: true,
    features: [
      { name: '2 vCPU', included: true },
      { name: '4 GB RAM', included: true },
      { name: '100 GB SSD Storage', included: true },
      { name: 'Point-in-time Recovery', included: true },
      { name: 'Advanced Monitoring', included: true },
      { name: 'Priority Support', included: true },
      { name: 'VPC Peering', included: true },
      { name: 'Multi-region Replication', included: false },
      { name: 'Dedicated Resources', included: false },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For mission-critical workloads',
    priceMonthly: 299,
    priceHourly: 0.414,
    features: [
      { name: '8 vCPU', included: true },
      { name: '16 GB RAM', included: true },
      { name: '500 GB SSD Storage', included: true },
      { name: 'Point-in-time Recovery', included: true },
      { name: 'Advanced Monitoring', included: true },
      { name: '24/7 Support', included: true },
      { name: 'VPC Peering', included: true },
      { name: 'Multi-region Replication', included: true },
      { name: 'Dedicated Resources', included: true },
    ],
  },
];

const faqs = [
  {
    question: 'What databases are supported?',
    answer: 'We support MySQL, PostgreSQL, MongoDB, Redis, and Elasticsearch. Each database can be provisioned with any of our pricing plans.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) through Stripe. Enterprise customers can also pay via invoice.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all new accounts get a 14-day free trial with access to all features. No credit card required to start.',
  },
  {
    question: 'What is your SLA?',
    answer: 'We offer a 99.99% uptime SLA for Professional and Enterprise plans. Starter plans have a 99.9% uptime commitment.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that fits your needs. All plans include automated backups and monitoring.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl ${
                  plan.popular
                    ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      ${plan.priceMonthly}
                    </span>
                    <span className={plan.popular ? 'text-blue-100' : 'text-gray-500'}>/month</span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-blue-200' : 'text-gray-400'}`}>
                    or ${plan.priceHourly}/hour
                  </p>
                  <Link
                    href="/signup"
                    className={`mt-8 block w-full py-3 rounded-lg text-center font-semibold transition ${
                      plan.popular
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
                <div className={`border-t ${plan.popular ? 'border-blue-500' : 'border-gray-100'} p-8`}>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className={`h-5 w-5 ${plan.popular ? 'text-blue-200' : 'text-blue-600'}`} />
                        ) : (
                          <span className={`h-5 w-5 flex items-center justify-center text-sm ${plan.popular ? 'text-blue-300' : 'text-gray-300'}`}>—</span>
                        )}
                        <span className={feature.included ? '' : plan.popular ? 'text-blue-300' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Add-ons & Extras</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900">Additional Storage</h3>
                <p className="mt-2 text-gray-600">$0.10/GB per month</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900">Read Replicas</h3>
                <p className="mt-2 text-gray-600">50% of primary instance cost</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900">Extended Backup Retention</h3>
                <p className="mt-2 text-gray-600">$5/month per additional 30 days</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <div className="mt-8 max-w-3xl mx-auto divide-y divide-gray-200">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-600 pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Still have questions?</h2>
            <p className="mt-2 text-gray-600">Our team is here to help you find the right plan.</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
