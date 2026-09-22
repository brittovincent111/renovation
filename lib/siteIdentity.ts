/**
 * Single source of truth for publisher identity, editorial attribution and
 * structured-data constants.
 *
 * Why this file exists
 * --------------------
 * AdSense flagged the site under "Low value content". A large part of that
 * assessment is the absence of E-E-A-T signals: the site published cost and
 * building-code guidance with no identifiable publisher, no named author, no
 * review process and no Organization schema. Search and ad-review systems treat
 * unattributed advice on money/safety topics as low trust regardless of how
 * accurate it is.
 *
 * Everything below is factual and verifiable today. Nothing here invents a
 * person or a credential — see EDITORIAL_TEAM for the one part that must be
 * filled in by a human before it carries any weight.
 */

export const SITE_URL = 'https://renovationcalculator.online';

export const ORGANIZATION = {
  name: 'RenovationCalculator',
  legalName: 'RenovationCalculator',
  url: SITE_URL,
  logo: `${SITE_URL}/brand-icon-circle.png`,
  email: 'support@renovationcalculator.online',
  foundingDate: '2026',
  description:
    'Free, client-side construction and renovation material calculators benchmarked against published trade standards.',
  /**
   * Social / verification profiles. Google uses sameAs to reconcile an
   * Organization with third-party corroboration; an empty array is a weaker
   * signal than a populated one, so add every profile that genuinely exists.
   */
  sameAs: [] as string[],
} as const;

/**
 * Named humans responsible for the content.
 *
 * DELIBERATELY EMPTY. Populating this with invented names, job titles or
 * licence numbers would be fabricating credentials — it is the exact pattern
 * reviewers look for, and being caught at it is far worse than having no byline
 * at all.
 *
 * Add real people here, using only claims that can be verified if checked:
 *
 *   export const EDITORIAL_TEAM: Person[] = [
 *     {
 *       id: 'a-real-person',
 *       name: 'Their real name',
 *       role: 'Their real role, e.g. Founder & Editor',
 *       credentials: 'Only if genuinely held and checkable',
 *       bio: 'Two or three sentences of real, specific background.',
 *       url: `${SITE_URL}/about#a-real-person`,
 *       sameAs: ['https://www.linkedin.com/in/their-real-profile'],
 *     },
 *   ];
 *
 * Until it is populated, attribution falls back to the Organization, which is
 * honest and still valid schema — just weaker than a named, verifiable author.
 */
export interface Person {
  id: string;
  name: string;
  role: string;
  credentials?: string;
  bio: string;
  url?: string;
  sameAs?: string[];
}

export const EDITORIAL_TEAM: Person[] = [];

export function getPerson(id?: string): Person | undefined {
  if (!id) return undefined;
  return EDITORIAL_TEAM.find((p) => p.id === id);
}

/** Schema.org author/publisher node for a person if known, else the organization. */
export function authorNode(personId?: string) {
  const person = getPerson(personId);
  if (person) {
    return {
      '@type': 'Person',
      name: person.name,
      jobTitle: person.role,
      description: person.bio,
      ...(person.url ? { url: person.url } : {}),
      ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
    };
  }
  return {
    '@type': 'Organization',
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
  };
}

export const PUBLISHER_NODE = {
  '@type': 'Organization',
  name: ORGANIZATION.name,
  url: ORGANIZATION.url,
  logo: {
    '@type': 'ImageObject',
    url: ORGANIZATION.logo,
  },
} as const;

/** Human-readable label for a byline when no named author is configured. */
export function bylineLabel(personId?: string): string {
  const person = getPerson(personId);
  if (person) {
    return person.credentials ? `${person.name}, ${person.credentials}` : person.name;
  }
  return `The ${ORGANIZATION.name} editorial team`;
}
