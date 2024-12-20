import { generateWithPerplexity } from '../lib/perplexity';
import type { HeadlineVariation, ContentVariation, GeneratedArticle } from '../types';

export async function generatePreviewContent(headline: string) {
  // Mock preview content for development
  return {
    title: headline,
    metaDescription: `Discover ${headline.toLowerCase()}. Expert insights and local recommendations updated for 2024.`,
    introduction: `Looking for ${headline.toLowerCase()}? Our comprehensive guide provides expert insights and recommendations tailored to your needs.`,
    sections: [
      'Overview',
      'Key Features',
      'Local Insights',
      'Expert Recommendations',
      'Conclusion'
    ],
    cmsFields: {
      title: headline,
      slug: headline.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      metaTitle: `${headline} | Expert Guide 2024`,
      metaDescription: `Discover ${headline.toLowerCase()}. Expert insights and local recommendations updated for 2024.`,
      canonicalUrl: `/guides/${headline.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      mainContent: generateMockContent(headline),
      images: [
        {
          url: `https://source.unsplash.com/1200x800/?${encodeURIComponent(headline)}`,
          alt: `${headline} - Primary Image`,
          caption: `Exploring ${headline}`
        }
      ],
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: headline,
        description: `Discover ${headline.toLowerCase()}. Expert insights and local recommendations updated for 2024.`,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString()
      }
    }
  };
}

function generateMockContent(headline: string) {
  return `
## Introduction

Welcome to your comprehensive guide about ${headline}. This article provides expert insights and detailed recommendations to help you make informed decisions.

## Overview

[Overview content would be generated by Perplexity API]

## Key Features

[Key features content would be generated by Perplexity API]

## Expert Recommendations

[Expert recommendations would be generated by Perplexity API]

## Conclusion

[Conclusion would be generated by Perplexity API]
  `.trim();
}

export async function generateContent(
  headline: HeadlineVariation,
  variations: ContentVariation[]
): Promise<GeneratedArticle[]> {
  // Implementation remains the same...
  return [];
}