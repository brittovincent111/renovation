'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { ORGANIZATION } from '@/lib/siteIdentity';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Calculation Suggestion');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Trigger user's email client with prefilled values
    const mailtoUrl = `mailto:support@renovationcalculator.online?subject=${encodeURIComponent(
      `[RenovationCalculator] ${subject} from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCategory: ${subject}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 border border-terracotta-200/60 mb-3">
          Editorial &amp; Engineering Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#263238]">
          Contact the RenovationCalculator Team
        </h1>
        <p className="mt-3 text-sm sm:text-base text-charcoal-600 leading-relaxed">
          Have a suggestion for a new building material formula, noticed a code discrepancy, or want to share local contractor waste rules? Our engineering and editorial team welcomes your input.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
            <div className="p-3 w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta mb-3 flex items-center justify-center border border-terracotta-200/50">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#263238]">Direct Inquiries</h2>
            <p className="mt-1 text-xs text-charcoal-500">For general support and partnerships</p>
            <a
              href="mailto:support@renovationcalculator.online"
              className="mt-2 inline-block text-xs font-semibold text-terracotta hover:underline break-all"
            >
              support@renovationcalculator.online
            </a>
          </div>

          <div className="p-6 rounded-3xl border border-charcoal-200 bg-white shadow-xs">
            <div className="p-3 w-10 h-10 rounded-xl bg-warm-100 text-charcoal-700 mb-3 flex items-center justify-center border border-charcoal-200">
              <FileCheck className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#263238]">Editorial Review &amp; Code Inquiries</h2>
            <p className="mt-1 text-xs text-charcoal-500">
              Contractors and quantity surveyors: submit local building standard corrections or regional trade specifications.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-charcoal-200 bg-warm-50 text-xs text-charcoal-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#263238]">
              <Clock className="w-4 h-4 text-terracotta" />
              <span>Response Time</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              We review incoming messages Monday through Friday and aim to respond within 24–48 business hours.
            </p>
          </div>

          {/*
            Publisher identity.

            A contact page that offers only a mailto and a form gives a reader no
            way to establish who is behind cost and building-code advice, and ad
            and search review systems read that absence as an anonymity signal.
            Values come from lib/siteIdentity.ts so the page, the Organization
            schema and the editorial policy cannot disagree.

            TODO (owner): add the registered legal entity name and a postal
            address to ORGANIZATION in lib/siteIdentity.ts. Those are the two
            fields that most strengthen this block, and they must be the real
            ones — invented details are worse than none.
          */}
          <div className="p-5 rounded-3xl border border-charcoal-200 bg-white text-xs text-charcoal-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#263238]">
              <ShieldCheck className="w-4 h-4 text-terracotta" />
              <span>Who publishes this site</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {ORGANIZATION.name} is an independent publisher of free construction
              estimating tools, operating since {ORGANIZATION.foundingDate}. We take
              no payment for placement or recommendation.
            </p>
            <p className="text-[11px] leading-relaxed">
              Read our{' '}
              <Link href="/editorial-policy" className="text-terracotta font-semibold hover:underline">
                editorial and methodology policy
              </Link>{' '}
              for how formulas are sourced and corrected, or{' '}
              <Link href="/about" className="text-terracotta font-semibold hover:underline">
                about the project
              </Link>{' '}
              for the standards behind each calculator.
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
              <h2 className="text-xl font-bold text-[#263238]">Draft Created in Your Email Client</h2>
              <p className="mt-2 text-xs sm:text-sm text-charcoal-500 max-w-sm leading-relaxed">
                Your message has been formatted for our support queue. If your email app did not open automatically, please send your note directly to:
              </p>
              <code className="mt-3 px-3 py-1.5 rounded-lg bg-warm-100 text-xs font-mono font-semibold text-[#263238]">
                support@renovationcalculator.online
              </code>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 px-4 py-2 rounded-xl bg-warm-100 text-xs font-semibold text-[#263238] hover:bg-warm-200 border border-charcoal-200 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1.5">
                  Subject / Inquiry Type
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm text-[#263238] focus:outline-hidden focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta cursor-pointer"
                >
                  <option value="Formula Feedback">Formula or Calculation Discrepancy</option>
                  <option value="New Calculator Suggestion">Suggest a New Calculator</option>
                  <option value="Trade Standard Submission">Trade Standard / Local Code Submission</option>
                  <option value="Partnership or Press">Partnership / Press Inquiry</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1.5">
                  Message Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide details about your project, the calculator in question, or suggested code adjustments..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 bg-warm-50 text-sm text-[#263238] placeholder:text-charcoal-400 focus:outline-hidden focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Email to Submit</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
