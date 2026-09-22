import React from 'react';
import { FAQItem } from '@/lib/types';
import {
  ORGANIZATION,
  PUBLISHER_NODE,
  SITE_URL,
  authorNode,
} from '@/lib/siteIdentity';

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface Crumb {
  name: string;
  /** Absolute or site-relative path. Omit on the final (current) crumb. */
  path?: string;
}

/**
 * BreadcrumbList for a trail the page already renders visually.
 *
 * Every calculator, project and guide page drew a breadcrumb in markup but
 * emitted no corresponding schema, so the hierarchy was invisible to crawlers.
 */
export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          ...(c.path
            ? { item: c.path.startsWith('http') ? c.path : `${SITE_URL}${c.path}` }
            : {}),
        })),
      }}
    />
  );
}

/** Sitewide publisher identity. Rendered once, from the root layout. */
export function OrganizationJsonLd() {
  return (
    <>
      <Ld
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: ORGANIZATION.name,
          legalName: ORGANIZATION.legalName,
          url: ORGANIZATION.url,
          logo: {
            '@type': 'ImageObject',
            url: ORGANIZATION.logo,
          },
          description: ORGANIZATION.description,
          foundingDate: ORGANIZATION.foundingDate,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: ORGANIZATION.email,
            url: `${SITE_URL}/contact`,
            availableLanguage: ['en'],
          },
          ...(ORGANIZATION.sameAs.length ? { sameAs: ORGANIZATION.sameAs } : {}),
        }}
      />
      <Ld
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: ORGANIZATION.name,
          description: ORGANIZATION.description,
          publisher: { '@id': `${SITE_URL}/#organization` },
        }}
      />
    </>
  );
}

export interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorId?: string;
  section?: string;
}

/** Article schema for editorial guides. */
export function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorId,
  section,
}: ArticleJsonLdProps) {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        datePublished,
        dateModified,
        author: authorNode(authorId),
        publisher: PUBLISHER_NODE,
        ...(section ? { articleSection: section } : {}),
        isAccessibleForFree: true,
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs?.length) return null;
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }}
    />
  );
}

interface JsonLdProps {
  name: string;
  description: string;
  url: string;
  faqs?: FAQItem[];
  crumbs?: Crumb[];
}

/**
 * Tool-page schema: the calculator itself, its FAQs, and its breadcrumb trail.
 */
export function JsonLd({ name, description, url, faqs, crumbs }: JsonLdProps) {
  return (
    <>
      <Ld
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name,
          description,
          url,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          isAccessibleForFree: true,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          publisher: PUBLISHER_NODE,
        }}
      />
      {faqs && faqs.length > 0 && <FaqJsonLd faqs={faqs} />}
      {crumbs && crumbs.length > 0 && <BreadcrumbJsonLd crumbs={crumbs} />}
    </>
  );
}
