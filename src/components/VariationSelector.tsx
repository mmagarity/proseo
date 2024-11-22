import React, { useState } from 'react';
import { MapPin, Users, Calendar, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { VARIATION_TYPES } from '../data/variationTypes';
import type { ContentVariation } from '../types';

interface VariationSelectorProps {
  onVariationsSelected: (variations: ContentVariation[]) => void;
  selectedHeadlines: any[];
}

export function VariationSelector({ onVariationsSelected, selectedHeadlines }: VariationSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<Map<string, Set<string>>>(new Map());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['location']));
  const [cityCount, setCityCount] = useState(300);
  const [customDemographics, setCustomDemographics] = useState<string[]>([]);
  const [newDemographic, setNewDemographic] = useState('');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleOption = (typeId: string, optionId: string) => {
    const currentOptions = selectedOptions.get(typeId) || new Set();
    const newOptions = new Set(currentOptions);
    
    if (newOptions.has(optionId)) {
      newOptions.delete(optionId);
    } else {
      newOptions.add(optionId);
    }
    
    setSelectedOptions(new Map(selectedOptions.set(typeId, newOptions)));
  };

  const addCustomDemographic = () => {
    if (newDemographic.trim()) {
      setCustomDemographics([...customDemographics, newDemographic.trim()]);
      setNewDemographic('');
    }
  };

  const calculateTotalArticles = () => {
    const baseCount = selectedHeadlines.length;
    let total = 0;

    // Location variations
    const locationOptions = selectedOptions.get('location') || new Set();
    locationOptions.forEach(format => {
      if (format === 'state-only') {
        total += baseCount * 50; // All states
      } else {
        total += baseCount * cityCount;
      }
    });

    // Demographic variations (including custom)
    const demographicCount = (selectedOptions.get('demographic')?.size || 0) + customDemographics.length;
    total += baseCount * demographicCount;

    // Year variations
    const yearCount = selectedOptions.get('year')?.size || 0;
    total += baseCount * yearCount;

    return total;
  };

  const handleReviewVariations = () => {
    const variations: ContentVariation[] = [];
    
    // Add location variations
    const locationOptions = selectedOptions.get('location') || new Set();
    locationOptions.forEach(format => {
      variations.push({
        type: 'location',
        format,
        value: format === 'state-only' ? 'All States' : `Top ${cityCount} Cities`,
        preposition: 'in',
        cityCount: format === 'state-only' ? 50 : cityCount
      });
    });

    // Add demographic variations
    const demographicOptions = selectedOptions.get('demographic') || new Set();
    demographicOptions.forEach(optionId => {
      const option = VARIATION_TYPES.find(t => t.id === 'demographic')?.options.find(o => o.id === optionId);
      if (option) {
        variations.push({
          type: 'demographic',
          value: option.label,
          preposition: 'for'
        });
      }
    });

    // Add custom demographics
    customDemographics.forEach(demo => {
      variations.push({
        type: 'demographic',
        value: demo,
        preposition: 'for'
      });
    });

    // Add year variations
    const yearOptions = selectedOptions.get('year') || new Set();
    yearOptions.forEach(optionId => {
      const option = VARIATION_TYPES.find(t => t.id === 'year')?.options.find(o => o.id === optionId);
      if (option) {
        variations.push({
          type: 'year',
          value: option.value,
          format: option.value
        });
      }
    });

    onVariationsSelected(variations);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Add Variations</h2>
            <p className="text-sm text-gray-500">Select how your content will be varied</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Articles</div>
            <div className="text-3xl font-bold text-blue-600">{calculateTotalArticles()}</div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Location Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('location')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900">Location</h3>
                  <p className="text-sm text-gray-500">Add city and state variations</p>
                </div>
              </div>
              {expandedSections.has('location') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.has('location') && (
              <div className="px-6 py-4 border-t">
                <div className="space-y-4">
                  {VARIATION_TYPES.find(t => t.id === 'location')?.options.map(option => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOptions.get('location')?.has(option.id) || false}
                        onChange={() => toggleOption('location', option.id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-3">
                        <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        <span className="text-sm text-gray-500 block">{option.preview}</span>
                      </span>
                    </label>
                  ))}

                  {/* City Count Slider */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Cities: {cityCount}
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="100"
                      value={cityCount}
                      onChange={(e) => setCityCount(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Demographics Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('demographic')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-400 mr-3" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900">Demographics</h3>
                  <p className="text-sm text-gray-500">Target specific audiences</p>
                </div>
              </div>
              {expandedSections.has('demographic') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.has('demographic') && (
              <div className="px-6 py-4 border-t">
                <div className="space-y-4">
                  {VARIATION_TYPES.find(t => t.id === 'demographic')?.options.map(option => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOptions.get('demographic')?.has(option.id) || false}
                        onChange={() => toggleOption('demographic', option.id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-3">
                        <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        <span className="text-sm text-gray-500 block">{option.preview}</span>
                      </span>
                    </label>
                  ))}

                  {/* Custom Demographics */}
                  {customDemographics.map((demo, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-3">
                        <span className="text-sm font-medium text-gray-900">{demo}</span>
                        <span className="text-sm text-gray-500 block">Coffee Shops for {demo}</span>
                      </span>
                    </div>
                  ))}

                  {/* Add Custom Demographic */}
                  <div className="flex items-center mt-4">
                    <input
                      type="text"
                      value={newDemographic}
                      onChange={(e) => setNewDemographic(e.target.value)}
                      placeholder="Add custom demographic"
                      className="flex-1 rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      onClick={addCustomDemographic}
                      disabled={!newDemographic.trim()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Year Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('year')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900">Year</h3>
                  <p className="text-sm text-gray-500">Add time-based variations</p>
                </div>
              </div>
              {expandedSections.has('year') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.has('year') && (
              <div className="px-6 py-4 border-t">
                <div className="space-y-4">
                  {VARIATION_TYPES.find(t => t.id === 'year')?.options.map(option => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOptions.get('year')?.has(option.id) || false}
                        onChange={() => toggleOption('year', option.id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-3">
                        <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        <span className="text-sm text-gray-500 block">{option.preview}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t">
          <button
            onClick={handleReviewVariations}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Review Variations
          </button>
        </div>
      </div>
    </div>
  );
}