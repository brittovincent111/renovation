import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECT_COMBOS } from '@/lib/projectsData';
import { ProjectComboView } from '@/components/ProjectComboView';

interface PageProps {
  params: Promise<{ 'project-slug': string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECT_COMBOS).map((slug) => ({
    'project-slug': slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'project-slug': slug } = await params;
  const project = PROJECT_COMBOS[slug];

  if (!project) {
    return {
      title: 'Project Estimator Not Found | RenovationCalculator',
    };
  }

  const canonicalUrl = `https://buildcalc.io/projects/${project.slug}`;

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'RenovationCalculator',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.metaTitle,
      description: project.metaDescription,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { 'project-slug': slug } = await params;
  const project = PROJECT_COMBOS[slug];

  if (!project) {
    notFound();
  }

  return <ProjectComboView slug={slug} />;
}
