import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-4">
          <span className="text-sm font-medium">💪 Only $60 per Month</span>
        </div>
        
        <h1 className="text-[64px] leading-[1.1] font-bold tracking-tight text-[#111827] mb-4">
          Effective, Affordable,<br />
          Done-For-You<br />
          Content Generation.
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          Our secret? High-quality SEO-optimized articles published to your site <span className="font-semibold">automatically</span>.
        </p>

        <div className="flex justify-center mb-6">
          <Link
            to="/app"
            className="inline-flex items-center px-8 py-4 text-xl font-medium rounded-lg text-white bg-[#0066CC] hover:bg-[#0052A3] transition-colors"
          >
            Start Free
          </Link>
        </div>

        <p className="text-gray-600">
          Trusted by 179 Businesses.
        </p>
      </div>
    </div>
  );
}