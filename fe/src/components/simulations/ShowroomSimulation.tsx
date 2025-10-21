import React, { useState } from 'react';
import { Store, HelpCircle } from 'lucide-react';

interface Enhancement {
  id: string;
  name: string;
  icon: string;
  costPerUnit: number;
  buyerWillingness: string;
  enabled: boolean;
}

export function ShowroomSimulation() {
  const [warranty, setWarranty] = useState<'none' | '1-month' | '6-month'>('1-month');
  const [launchBudget, setLaunchBudget] = useState(5000);
  
  const [enhancements, setEnhancements] = useState<Enhancement[]>([
    {
      id: 'shoelace-protector',
      name: 'Shoelace protector',
      icon: '🌸',
      costPerUnit: 0.25,
      buyerWillingness: 'Buyer may pay up to 2% more',
      enabled: true
    },
    {
      id: 'technology-improvement',
      name: 'Technology improvement',
      icon: '⚡',
      costPerUnit: 2.50,
      buyerWillingness: 'Buyer may pay up to 5% more',
      enabled: false
    },
    {
      id: 'customized-flag',
      name: 'Customized flag add-on',
      icon: '🏳️',
      costPerUnit: 0.50,
      buyerWillingness: 'Buyer may pay up to 3% more',
      enabled: false
    },
    {
      id: 'performance-insole',
      name: 'Upgraded performance insole',
      icon: '👟',
      costPerUnit: 1.50,
      buyerWillingness: 'Buyer may pay up to 3% more',
      enabled: false
    }
  ]);

  const toggleEnhancement = (id: string) => {
    setEnhancements(enhancements.map(enhancement =>
      enhancement.id === id
        ? { ...enhancement, enabled: !enhancement.enabled }
        : enhancement
    ));
  };

  const totalEnhancementCost = enhancements
    .filter(e => e.enabled)
    .reduce((sum, e) => sum + e.costPerUnit, 0);

  const estimatedPriceIncrease = enhancements
    .filter(e => e.enabled)
    .reduce((sum, e) => {
      const percentage = parseInt(e.buyerWillingness.match(/(\d+)%/)?.[1] || '0');
      return sum + percentage;
    }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <Store className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">The Showroom, Round 2</h1>
          </div>
          <p className="text-purple-100 text-lg">
            Select optional enhancements to the finished shoes. Price increases relating to enhancements are at the discretion of 
            the client, and in general, higher quality shoes will yield a higher price increase per enhancement. Hint: you know from 
            previous experience that the client won't pay more for an over-embellished product, so consider carefully which 
            features would best fit your product strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {enhancements.map((enhancement) => (
              <div key={enhancement.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                      {enhancement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-2">{enhancement.name}</h3>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Cost</span>
                          <div className="font-medium">${enhancement.costPerUnit.toFixed(2)} per unit</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Benefit</span>
                          <div className="font-medium text-green-600">{enhancement.buyerWillingness}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enhancement.enabled}
                      onChange={() => toggleEnhancement(enhancement.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enhancement Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost per Unit</span>
                  <span className="font-semibold">${totalEnhancementCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Increase Potential</span>
                  <span className="font-semibold text-green-600">+{estimatedPriceIncrease}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Enhancements</span>
                  <span className="font-semibold">{enhancements.filter(e => e.enabled).length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Showroom Options</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-3">
                    <label className="text-gray-700 mr-2">Decide whether to offer a manufacturer's warranty</label>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="warranty"
                        value="none"
                        checked={warranty === 'none'}
                        onChange={(e) => setWarranty(e.target.value as any)}
                        className="mr-2 text-purple-600"
                      />
                      <span className="text-gray-700">None</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="warranty"
                        value="1-month"
                        checked={warranty === '1-month'}
                        onChange={(e) => setWarranty(e.target.value as any)}
                        className="mr-2 text-purple-600"
                      />
                      <span className="text-gray-700">1 month</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="warranty"
                        value="6-month"
                        checked={warranty === '6-month'}
                        onChange={(e) => setWarranty(e.target.value as any)}
                        className="mr-2 text-purple-600"
                      />
                      <span className="text-gray-700">6 month</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <label className="text-gray-700 mr-2">What will your budget be for the product launch event?</label>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">$0</span>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={launchBudget}
                        onChange={(e) => setLaunchBudget(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-sm text-gray-500">$10,000</span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-lg font-semibold text-purple-600">
                        ${launchBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Impact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Launch Event ROI</span>
                  <span className="font-medium">
                    {launchBudget > 5000 ? 'High' : launchBudget > 2000 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Interest</span>
                  <span className="font-medium text-green-600">
                    +{Math.round(launchBudget / 200)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand Recognition</span>
                  <span className="font-medium">
                    {warranty !== 'none' ? 'Enhanced' : 'Standard'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}