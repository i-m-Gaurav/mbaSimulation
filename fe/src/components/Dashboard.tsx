import React from 'react';
import { Package, Factory, Store, TrendingUp, DollarSign, Users, ArrowRight, BarChart3 } from 'lucide-react';
import { SimulationPage } from '../App';

interface DashboardProps {
  onNavigate: (page: SimulationPage) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const modules = [
    {
      id: 'warehouse' as SimulationPage,
      title: 'The Warehouse',
      description: 'Master inventory management and optimize delivery strategies for maximum operational efficiency',
      icon: Package,
      color: 'blue',
      stats: { revenue: '$405,000', efficiency: '94%' },
      features: ['Inventory Control', 'Quality Management', 'Delivery Optimization', 'Cost Analysis']
    },
    {
      id: 'factory' as SimulationPage,
      title: 'The Factory',
      description: 'Design production workflows and manage your workforce for optimal manufacturing output',
      icon: Factory,
      color: 'orange',
      stats: { employees: '6 Active', productivity: '92%' },
      features: ['Production Planning', 'Employee Management', 'Quality Control', 'Workflow Design']
    },
    {
      id: 'showroom' as SimulationPage,
      title: 'The Showroom',
      description: 'Craft premium customer experiences and pricing strategies that maximize market penetration',
      icon: Store,
      color: 'purple',
      stats: { enhancements: '4 Available', margin: '+23%' },
      features: ['Product Enhancement', 'Pricing Strategy', 'Customer Experience', 'Market Analysis']
    }
  ];

  const performanceMetrics = [
    { label: 'Total Revenue', value: '$405,000', icon: DollarSign, trend: '+12.5%' },
    { label: 'Profit Margin', value: '27.5%', icon: TrendingUp, trend: '+3.2%' },
    { label: 'Units Produced', value: '4,500', icon: Package, trend: '+8.1%' },
    { label: 'Efficiency Score', value: '94%', icon: BarChart3, trend: '+5.7%' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'from-blue-500 to-blue-600',
        light: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200'
      },
      orange: {
        bg: 'from-orange-500 to-orange-600',
        light: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        light: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-6 py-3 mb-8 border border-blue-100">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-semibold">Interactive Business Learning Platform</span>
          </div>
          
          <h1 className="text-6xl font-black text-slate-800 mb-6 leading-tight">
            Master Business Strategy
            <br />
            <span className="text-blue-600">Through Simulation</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience real-world business challenges in a risk-free environment. Make strategic decisions, 
            analyze outcomes, and develop critical thinking skills through our comprehensive simulation modules.
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {performanceMetrics.map(({ label, value, icon: Icon, trend }) => (
            <div key={label} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-slate-600" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  {trend}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium mb-2">{label}</h3>
              <p className="text-3xl font-bold text-slate-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Simulation Modules */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {modules.map(({ id, title, description, icon: Icon, color, stats, features }) => {
            const colorClasses = getColorClasses(color);
            return (
              <div
                key={id}
                onClick={() => onNavigate(id)}
                className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Header */}
                <div className={`h-32 bg-gradient-to-br ${colorClasses.bg} relative`}>
                  <div className="absolute top-6 right-6">
                    <ArrowRight className="h-5 w-5 text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-500 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className={`${colorClasses.light} rounded-xl p-4 ${colorClasses.border} border`}>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-sm font-medium">Current Performance</span>
                      <div className="text-right">
                        {Object.entries(stats).map(([key, value]) => (
                          <div key={key} className={`${colorClasses.text} font-semibold text-sm`}>
                            <span className="text-slate-400 capitalize">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Ready to Begin Your Learning Journey?</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
              Select a simulation module above to start making strategic business decisions and see their real-world impact.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => onNavigate('warehouse')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start with Warehouse Management
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}