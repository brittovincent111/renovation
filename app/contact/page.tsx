'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pure client-side confirmation
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/60 mb-3">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#263238]">
          Contact the RenovationCalculator Team
        </h1>
        <p className="mt-3 text-sm sm:text-base text-charcoal-600">
          Have a suggestion for a new calculator formula, noticed a calculation discrepancy, or want to report an issue? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-6 md:col-span-1">
          <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
            <div className="p-3 w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta mb-3 flex items-center justify-center border border-terracotta-200/50">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#263238]">Direct Email</h2>
            <p className="mt-1 text-xs text-charcoal-500">For partnership, press, or feedback</p>
            <a
              href="mailto:contact@renovationcalculator.org"
              className="mt-2 inline-block text-xs font-semibold text-terracotta hover:underline"
            >
              contact@renovationcalculator.org
            </a>
          </div>

          <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
            <div className="p-3 w-10 h-10 rounded-xl bg-warm-100 text-charcoal-700 mb-3 flex items-center justify-center border border-charcoal-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#263238]">Trade Formula Inquiries</h2>
            <p className="mt-1 text-xs text-charcoal-500">
              Are you a contractor or trade specialist? Share your local code multipliers or specific rules of thumb.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 rounded-3xl border border-charcoal-200 bg-white p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="p-3 rounded-2xl bg-terracotta-50 text-terracotta mb-4 border border-terracotta-200/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-[#263238]">Message Received!</h2>
              <p className="mt-2 text-xs text-charcoal-500 max-w-sm">
                Thank you for reaching out to RenovationCalculator. Our engineering team reviews incoming suggestions weekly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 px-4 py-2 rounded-xl bg-warm-100 text-xs font-semibold text-[#263238] hover:bg-warm-200 border border-charcoal-200 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Alex Johnson"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm text-[#263238] placeholder:text-charcoal-400 focus:outline-hidden focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm text-[#263238] placeholder:text-charcoal-400 focus:outline-hidden focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1.5">
                  Message / Feedback
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need, report an estimate discrepancy, or suggest a new tool..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm text-[#263238] placeholder:text-charcoal-400 focus:outline-hidden focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
