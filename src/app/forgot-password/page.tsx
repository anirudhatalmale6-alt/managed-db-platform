'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Database, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Database className="h-8 w-8 text-cyan-500" />
          <span className="text-xl font-bold text-white">CloudDB</span>
        </Link>

        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-white text-center">Reset password</h1>
            <p className="mt-2 text-gray-400 text-center">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-950 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Send reset link
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Check your email</h1>
            <p className="mt-4 text-gray-400">
              We&apos;ve sent a password reset link to{' '}
              <span className="text-white font-medium">{email}</span>
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-cyan-400 hover:text-cyan-300"
              >
                try again
              </button>
            </p>
          </div>
        )}

        <Link
          href="/login"
          className="mt-8 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
