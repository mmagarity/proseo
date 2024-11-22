import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const monthlyData = [
    { month: 'Jan', value: 15000 },
    { month: 'Feb', value: 35000 },
    { month: 'Mar', value: 52000 },
    { month: 'Apr', value: 78000 },
    { month: 'May', value: 95000 },
    { month: 'Jun', value: 110000 },
    { month: 'Jul', value: 125000 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12">
          {/* Left side - Performance Metrics */}
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Performance Metrics</h3>
            
            {/* Bar Chart */}
            <div className="h-48 relative mb-12">
              <div className="absolute inset-0 flex items-end justify-between">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-[#0066CC] rounded-t"
                      style={{ 
                        height: `${(data.value / maxValue) * 160}px`
                      }}
                    ></div>
                    <div className="text-sm text-gray-500 mt-2">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold">125,000+</div>
                <div className="text-sm text-gray-500">Monthly Visitors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">45%</div>
                <div className="text-sm text-gray-500">Growth Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.2%</div>
                <div className="text-sm text-gray-500">Conversion Rate</div>
              </div>
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3F5FF] text-sm font-medium mb-4 self-start">
              ✨ Ready to scale your content?
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Stop struggling with<br />
              content creation.
            </h2>
            
            <p className="text-gray-600 mb-8">
              We help you maximize your content output without the headaches, expensive writers, or time-consuming tasks.
            </p>

            <Link
              to="/app"
              className="inline-flex items-center px-6 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors self-start"
            >
              Start Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}