'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Info } from 'lucide-react';

const databaseTypes = [
  { id: 'mysql', name: 'MySQL', icon: '🐬', versions: ['8.0', '5.7'] },
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', versions: ['16', '15', '14'] },
  { id: 'mongodb', name: 'MongoDB', icon: '🍃', versions: ['7.0', '6.0'] },
  { id: 'redis', name: 'Redis', icon: '⚡', versions: ['7.2', '7.0', '6.2'] },
  { id: 'elasticsearch', name: 'Elasticsearch', icon: '🔍', versions: ['8.x', '7.x'] },
];

const regions = [
  { id: 'us-east-1', name: 'US East (N. Virginia)' },
  { id: 'us-west-2', name: 'US West (Oregon)' },
  { id: 'eu-west-1', name: 'Europe (Ireland)' },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)' },
];

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    cpu: '1 vCPU',
    ram: '1 GB',
    storage: '20 GB',
    price: 25,
  },
  {
    id: 'professional',
    name: 'Professional',
    cpu: '2 vCPU',
    ram: '4 GB',
    storage: '100 GB',
    price: 99,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    cpu: '8 vCPU',
    ram: '16 GB',
    storage: '500 GB',
    price: 299,
  },
];

export default function CreateDatabasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    version: '',
    region: 'us-east-1',
    plan: 'professional',
  });

  const selectedDb = databaseTypes.find((db) => db.id === formData.type);

  const handleSubmit = async () => {
    setLoading(true);

    // Simulate API call - replace with actual API integration
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, call your backend API here
    // const response = await fetch('/api/databases', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // });

    router.push('/dashboard/databases');
  };

  const canProceed = () => {
    if (step === 1) return formData.type && formData.version;
    if (step === 2) return formData.name && formData.region;
    if (step === 3) return formData.plan;
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/databases"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Databases
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Database</h1>
        <p className="text-gray-500">Deploy a new managed database instance</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">Select Database</span>
          <span className="text-sm text-gray-600">Configuration</span>
          <span className="text-sm text-gray-600">Choose Plan</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {/* Step 1: Select Database Type */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Select Database Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {databaseTypes.map((db) => (
                <button
                  key={db.id}
                  onClick={() => setFormData({ ...formData, type: db.id, version: db.versions[0] })}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    formData.type === db.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-3xl">{db.icon}</span>
                  <p className="mt-2 font-medium text-gray-900">{db.name}</p>
                </button>
              ))}
            </div>

            {selectedDb && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version
                </label>
                <select
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {selectedDb.versions.map((v) => (
                    <option key={v} value={v}>
                      {selectedDb.name} {v}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Database Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="my-database"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Use lowercase letters, numbers, and hyphens only
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Choose a region closest to your users for optimal latency. Data will be stored in this region.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Choose Plan */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Choose Plan</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setFormData({ ...formData, plan: plan.id })}
                  className={`relative p-6 rounded-xl border-2 text-left transition ${
                    formData.plan === plan.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-sm font-normal text-gray-500">/mo</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li>{plan.cpu}</li>
                    <li>{plan.ram} RAM</li>
                    <li>{plan.storage} SSD</li>
                  </ul>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Database</span>
                  <span className="font-medium">{selectedDb?.name} {formData.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Region</span>
                  <span className="font-medium">
                    {regions.find((r) => r.id === formData.region)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium">
                    {plans.find((p) => p.id === formData.plan)?.name}
                  </span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Estimated Monthly Cost</span>
                  <span className="text-blue-600">
                    ${plans.find((p) => p.id === formData.plan)?.price}/mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !canProceed()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Database...' : 'Create Database'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
