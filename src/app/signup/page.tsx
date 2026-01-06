'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Database, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    acceptTerms: false,
  });

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains a number', met: /\d/.test(formData.password) },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    const allRequirementsMet = passwordRequirements.every((req) => req.met);
    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-cyan-900/20 via-gray-900 to-gray-950 items-center justify-center p-12">
        <div className="max-w-lg">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <Database className="h-10 w-10 text-cyan-500" />
            <span className="text-2xl font-bold text-white">CloudDB</span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-6">
            Start building with managed databases today
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of developers who trust CloudDB for their production workloads.
          </p>

          <div className="space-y-4">
            {[
              'Deploy databases in under 2 minutes',
              'Automatic backups & point-in-time recovery',
              '99.99% uptime SLA guaranteed',
              '24/7 expert support',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-gray-300">
                <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-cyan-400" />
                </div>
                {feature}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm mb-4">Trusted by developers at</p>
            <div className="flex gap-6 text-gray-600 font-semibold">
              <span>TechCorp</span>
              <span>DataFlow</span>
              <span>CloudFirst</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Database className="h-8 w-8 text-cyan-500" />
              <span className="text-xl font-bold text-white">CloudDB</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-gray-400">
            Start your 14-day free trial. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company <span className="text-gray-600">(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Your company"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {passwordRequirements.map((req) => (
                    <div key={req.text} className="flex items-center gap-2 text-xs">
                      <Check
                        className={`h-3 w-3 ${req.met ? 'text-green-500' : 'text-gray-600'}`}
                      />
                      <span className={req.met ? 'text-green-400' : 'text-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="h-4 w-4 mt-0.5 bg-gray-900 border-gray-700 rounded text-cyan-600 focus:ring-cyan-500 focus:ring-offset-gray-950"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-950 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Start free trial'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-950 text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
