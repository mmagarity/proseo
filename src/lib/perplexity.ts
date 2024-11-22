import { API_CONFIG } from '../config/api';

const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY || 'pplx-placeholder-key';
const PERPLEXITY_ENDPOINT = 'https://api.perplexity.ai/v1/generate';

export async function generateWithPerplexity(prompt: string) {
  if (import.meta.env.DEV) {
    // Return mock data in development
    return mockPerplexityResponse(prompt);
  }

  const response = await fetch(PERPLEXITY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
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
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.statusText}`);
  }

  return response.json();
}

function mockPerplexityResponse(prompt: string) {
  return {
    content: {
      title: 'Sample Article',
      sections: ['Introduction', 'Main Content', 'Conclusion'],
      content: 'This is a sample article generated for development.',
      localInsights: ['Local insight 1', 'Local insight 2'],
      expertTips: ['Expert tip 1', 'Expert tip 2']
    }
  };
}