import type { ContentRequest, GeneratedArticle } from '../types/content';

const PERPLEXITY_API_ENDPOINT = 'https://api.perplexity.ai/v1/generate';

export async function generateArticleContent(request: ContentRequest): Promise<GeneratedArticle> {
  try {
    const response = await fetch(PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b',
        messages: [
          {
            role: 'system',
            content: 'You are a local expert content writer specializing in detailed, engaging articles.'
          },
          {
            role: 'user',
            content: generatePrompt(request)
          }
        ],
        max_tokens: 2048,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    return parseResponse(data, request);
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
}

function generatePrompt(request: ContentRequest): string {
  const { headline, location, topic, demographic, year } = request;
  
  return `Create a comprehensive article about ${topic} in ${location.city}, ${location.state}.

Key Details:
- Title: ${headline}
- Location: ${location.city}, ${location.state}
- Target Audience: ${demographic || 'General'}
- Year: ${year}

Required Sections:
1. Introduction
2. Overview of ${topic} in ${location.city}
3. Top Recommendations (with specific local details)
4. Expert Tips
5. Local Insights
6. Conclusion

Requirements:
- Include specific local details and landmarks
- Mention nearby attractions or related businesses
- Use natural, engaging language
- Include expert recommendations
- Add local statistics or data where relevant
- Optimize for SEO while maintaining readability

Please format the response in JSON with clear sections and metadata.`;
}

function parseResponse(response: any, request: ContentRequest): GeneratedArticle {
  // Parse and structure the API response
  const content = JSON.parse(response.content);
  
  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      location: request.location,
      topic: request.topic,
      demographic: request.demographic,
      year: request.year
    },
    content: {
      title: content.title,
      introduction: content.introduction,
      mainContent: content.mainContent,
      sections: content.sections,
      conclusion: content.conclusion,
      expertTips: content.expertTips,
      localInsights: content.localInsights
    },
    seo: {
      metaTitle: content.seo.metaTitle,
      metaDescription: content.seo.metaDescription,
      focusKeywords: content.seo.focusKeywords,
      headings: content.seo.headings
    },
    images: [], // Will be populated by image generation
    internalLinks: [], // Will be populated by linking logic
    publishingSchedule: null // Will be set by scheduling logic
  };
}