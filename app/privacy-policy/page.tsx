import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookie Disclosure | RenovationCalculator',
  description:
    'RenovationCalculator privacy policy explaining our client-side processing, cookie usage, advertising partners, and data handling standards.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#263238]">
      <div className="mb-10 pb-6 border-b border-charcoal-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#263238]">
          Privacy Policy & Cookie Notice
        </h1>
        <p className="mt-2 text-sm text-charcoal-500">
          Last updated: January 2026 • RenovationCalculator Suite
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-charcoal-700 leading-relaxed space-y-6">
        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-2">1. Client-Side Data Processing</h2>
          <p>
            RenovationCalculator is engineered on a privacy-first foundation. All calculations, measurements, dimensions, custom prices, and project estimate forms run entirely inside your browser using client-side JavaScript. We do not transmit, log, or store your room dimensions, project names, or material estimates on any remote server or database.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-2">2. Local Storage and Preferences</h2>
          <p>
            To remember your preferred unit system (Imperial vs Metric) and geographical region (US, UK, India, Australia), RenovationCalculator saves simple key-value pairs in your browser&apos;s local storage (`localStorage`). This data never leaves your personal device and can be cleared at any time via your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-2">3. Advertising & Google AdSense</h2>
          <p>
            To keep RenovationCalculator 100% free for everyone, we display advertisements provided by Google AdSense and third-party advertising vendors.
          </p>
          <p className="mt-2">
            Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to RenovationCalculator and/or other sites on the Internet.
          </p>
          <p className="mt-2">
            You may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta underline font-medium hover:text-terracotta-700"
            >
              Google Ad Settings
            </a>{' '}
            or via{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta underline font-medium hover:text-terracotta-700"
            >
              www.aboutads.info
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-2">4. Log Data & Analytics</h2>
          <p>
            Like most websites, our web hosting provider may log non-identifiable technical data such as your IP address, browser user agent, operating system, referring URL, and timestamp strictly for server health, DDoS prevention, and traffic analytics.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-2">5. Children&apos;s Privacy</h2>
          <p>
            RenovationCalculator does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#263238] mb-2">6. Contact Us</h2>
          <p>
            If you have questions or suggestions regarding our Privacy Policy or data security practices, please contact us at{' '}
            <a href="mailto:support@renovationcalculator.online" className="text-terracotta underline font-medium hover:text-terracotta-700">
              support@renovationcalculator.online
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
