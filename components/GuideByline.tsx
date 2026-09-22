import React from 'react';
import Link from 'next/link';
import { Clock, CalendarDays, RefreshCw, BookCheck, UserRound } from 'lucide-react';
import { Guide } from '@/lib/guidesData';
import { bylineLabel, getPerson } from '@/lib/siteIdentity';

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Visible authorship, revision dates and sourcing for an editorial guide.
 *
 * Guides previously carried a read-time chip and nothing else — no author, no
 * publication date, no indication of what the figures were based on. For cost
 * and building-code content that is the difference between "article" and
 * "unattributed page", both to readers and to review systems.
 */
export function GuideByline({ guide }: { guide: Guide }) {
  const author = getPerson(guide.authorId);
  const reviewer = getPerson(guide.reviewerId);

  return (
    <div className="mt-5 rounded-2xl border border-charcoal-200 bg-warm-50/60 px-4 py-3.5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-charcoal-600">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#263238]">
          <UserRound className="w-3.5 h-3.5 text-terracotta" />
          <span>{bylineLabel(guide.authorId)}</span>
        </span>

        {reviewer && (
          <span className="inline-flex items-center gap-1.5">
            <BookCheck className="w-3.5 h-3.5 text-terracotta" />
            <span>
              Reviewed by{' '}
              <span className="font-semibold text-[#263238]">{bylineLabel(guide.reviewerId)}</span>
            </span>
          </span>
        )}

        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-charcoal-400" />
          <span>
            Published <time dateTime={guide.datePublished}>{formatDate(guide.datePublished)}</time>
          </span>
        </span>

        {guide.dateModified !== guide.datePublished && (
          <span className="inline-flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-charcoal-400" />
            <span>
              Updated <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)}</time>
            </span>
          </span>
        )}

        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-charcoal-400" />
          <span>{guide.readTime}</span>
        </span>
      </div>

      {guide.standards && guide.standards.length > 0 && (
        <p className="mt-2.5 pt-2.5 border-t border-charcoal-200/70 text-[11px] leading-relaxed text-charcoal-500">
          <span className="font-semibold text-charcoal-600">Figures benchmarked against:</span>{' '}
          {guide.standards.join(' · ')}.{' '}
          <Link href="/editorial-policy" className="text-terracotta hover:underline font-semibold">
            How we research and review
          </Link>
          {author?.bio ? '' : ''}
        </p>
      )}
    </div>
  );
}
