import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export function PricingSection() {
  return (
    <div id="pricing" className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3F5FF] text-sm font-medium mb-4">
            ✨ Get Your First Month For $60
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Kickstart Your SEO Today.
          </h2>
          <p className="text-gray-600">
            Generate tens of thousands of pages in minutes.
          </p>
        </div>

        {/* Single Pricing Card with Gradient */}
        <div className="relative overflow-hidden rounded-2xl border border-[#0066CC]/20">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#E3F5FF] to-[#0066CC]/10"></div>
          
          {/* Content */}
          <div className="relative p-8">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#E3F5FF] text-sm font-medium mb-4">
              SPECIAL
            </div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Professional Plan</h3>
                <p className="text-gray-500">Perfect for businesses targeting organic Growth.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">$60</div>
                <p className="text-gray-500">per month</p>
                <p className="text-sm text-gray-500">cancel anytime</p>
              </div>
            </div>

            <Link
              to="/app"
              className="block w-48 mx-auto text-center px-8 py-3 mb-8 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors"
            >
              Start Free
            </Link>

            <div className="space-y-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#0066CC] mr-3 flex-shrink-0" />
                <span>Generate up to 10,000 articles per month</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#0066CC] mr-3 flex-shrink-0" />
                <span>Scale Across 1,000 of the most populated US Cities</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#0066CC] mr-3 flex-shrink-0" />
                <span>Add Relevant Images for Every Article</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#0066CC] mr-3 flex-shrink-0" />
                <span>Unlimited Demographic Variations</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#0066CC] mr-3 flex-shrink-0" />
                <span>Webflow CMS Integration</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#0066CC] mr-3 flex-shrink-0" />
                <span>Schedule Automated Publishing</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#0066CC] mr-3 flex-shrink-0" />
                <span>Pause or Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}