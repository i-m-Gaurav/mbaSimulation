import React, { useState } from 'react';
import { Target, Users, TrendingUp, DollarSign, Eye, MousePointer } from 'lucide-react';

export function MarketingSimulation() {
  const [campaign, setCampaign] = useState({
    budget: 50000,
    targetAudience: 'millennials',
    channels: [] as string[],
    message: 'premium',
    duration: 4
  });

  const [results, setResults] = useState({
    reach: 0,
    engagement: 0,
    conversions: 0,
    roi: 0,
    brandAwareness: 0
  });

  const audiences = [
    { id: 'gen-z', label: 'Gen Z (18-24)', size: '2.5M', engagement: 'High', cost: 0.8 },
    { id: 'millennials', label: 'Millennials (25-40)', size: '4.2M', engagement: 'Medium', cost: 1.0 },
    { id: 'gen-x', label: 'Gen X (41-56)', size: '3.1M', engagement: 'Medium', cost: 1.2 },
    { id: 'boomers', label: 'Baby Boomers (57+)', size: '2.8M', engagement: 'Low', cost: 1.5 }
  ];

  const channels = [
    { id: 'social-media', label: 'Social Media', reach: 85, cost: 0.9, engagement: 'High' },
    { id: 'google-ads', label: 'Google Ads', reach: 70, cost: 1.2, engagement: 'Medium' },
    { id: 'tv', label: 'Television', reach: 60, cost: 2.0, engagement: 'Low' },
    { id: 'radio', label: 'Radio', reach: 45, cost: 0.7, engagement: 'Low' },
    { id: 'print', label: 'Print Media', reach: 30, cost: 1.5, engagement: 'Low' },
    { id: 'influencer', label: 'Influencer Marketing', reach: 40, cost: 1.8, engagement: 'Very High' }
  ];

  const messages = [
    { id: 'premium', label: 'Premium Quality', appeal: 'Luxury', effectiveness: 1.2 },
    { id: 'affordable', label: 'Best Value', appeal: 'Price-conscious', effectiveness: 1.0 },
    { id: 'innovative', label: 'Cutting-edge Innovation', appeal: 'Tech-savvy', effectiveness: 1.1 },
    { id: 'sustainable', label: 'Eco-friendly', appeal: 'Environmentally conscious', effectiveness: 1.3 }
  ];

  const toggleChannel = (channelId: string) => {
    setCampaign(prev => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter(id => id !== channelId)
        : [...prev.channels, channelId]
    }));
  };

  const runCampaign = () => {
    const audience = audiences.find(a => a.id === campaign.targetAudience);
    const selectedChannels = channels.filter(c => campaign.channels.includes(c.id));
    const message = messages.find(m => m.id === campaign.message);
    
    if (!audience || selectedChannels.length === 0 || !message) return;

    const avgReach = selectedChannels.reduce((sum, c) => sum + c.reach, 0) / selectedChannels.length;
    const avgCost = selectedChannels.reduce((sum, c) => sum + c.cost, 0) / selectedChannels.length;
    
    const reach = Math.floor((avgReach / 100) * parseFloat(audience.size.replace('M', '')) * 1000000 * (campaign.budget / 100000));
    const engagement = Math.floor(reach * 0.15 * message.effectiveness);
    const conversions = Math.floor(engagement * 0.08);
    const revenue = conversions * 150; // Average order value
    const roi = ((revenue - campaign.budget) / campaign.budget) * 100;
    const brandAwareness = Math.min(100, Math.floor((reach / 1000000) * 10));

    setResults({
      reach,
      engagement,
      conversions,
      roi,
      brandAwareness
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <Target className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Marketing Campaign Simulation</h1>
          </div>
          <p className="text-purple-100 text-lg">Design and execute marketing campaigns to maximize reach, engagement, and ROI.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaign Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Campaign Budget</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Total Budget</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={campaign.budget}
                      onChange={(e) => setCampaign(prev => ({ ...prev, budget: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="10000"
                      step="5000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Campaign Duration (weeks)</label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={campaign.duration}
                    onChange={(e) => setCampaign(prev => ({ ...prev, duration: Number(e.target.value) }))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-500 mt-1">
                    <span>1 week</span>
                    <span className="font-semibold text-purple-600">{campaign.duration} weeks</span>
                    <span>12 weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Target Audience</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {audiences.map((audience) => (
                  <div
                    key={audience.id}
                    onClick={() => setCampaign(prev => ({ ...prev, targetAudience: audience.id }))}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      campaign.targetAudience === audience.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-slate-800 mb-1">{audience.label}</div>
                    <div className="text-sm text-slate-600 space-y-1">
                      <div>Size: {audience.size}</div>
                      <div>Engagement: {audience.engagement}</div>
                      <div>Cost Multiplier: {audience.cost}x</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing Channels */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Marketing Channels</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      campaign.channels.includes(channel.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-slate-800">{channel.label}</div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        campaign.channels.includes(channel.id)
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-slate-300'
                      }`}>
                        {campaign.channels.includes(channel.id) && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                      <div>Reach: {channel.reach}%</div>
                      <div>Engagement: {channel.engagement}</div>
                      <div>Cost: {channel.cost}x</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Strategy */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Message Strategy</h2>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setCampaign(prev => ({ ...prev, message: message.id }))}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      campaign.message === message.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-800">{message.label}</div>
                        <div className="text-sm text-slate-600">Appeals to: {message.appeal}</div>
                      </div>
                      <div className="text-sm font-semibold text-purple-600">
                        {message.effectiveness}x effectiveness
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={runCampaign}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Launch Campaign
            </button>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            {/* Campaign Results */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Campaign Results</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-slate-600">Reach</span>
                  </div>
                  <span className="font-bold text-slate-800">{results.reach.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="h-4 w-4 text-green-600" />
                    <span className="text-slate-600">Engagement</span>
                  </div>
                  <span className="font-bold text-slate-800">{results.engagement.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span className="text-slate-600">Conversions</span>
                  </div>
                  <span className="font-bold text-slate-800">{results.conversions.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <span className="text-slate-600">ROI</span>
                  </div>
                  <span className={`font-bold ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span className="text-slate-600">Brand Awareness</span>
                  </div>
                  <span className="font-bold text-slate-800">{results.brandAwareness}%</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Performance Analysis</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Cost per Reach</span>
                  <span className="font-semibold text-slate-800">
                    ${results.reach > 0 ? (campaign.budget / results.reach).toFixed(3) : '0.000'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Engagement Rate</span>
                  <span className="font-semibold text-slate-800">
                    {results.reach > 0 ? ((results.engagement / results.reach) * 100).toFixed(1) : '0.0'}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Conversion Rate</span>
                  <span className="font-semibold text-slate-800">
                    {results.engagement > 0 ? ((results.conversions / results.engagement) * 100).toFixed(1) : '0.0'}%
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