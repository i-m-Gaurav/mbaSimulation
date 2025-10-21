import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { NavigationState } from '../App';
import { WarehouseSimulation } from './simulations/WarehouseSimulation';
import { FactorySimulation } from './simulations/FactorySimulation';
import { ShowroomSimulation } from './simulations/ShowroomSimulation';
import { TradingSimulation } from './simulations/TradingSimulation';
import { MarketingSimulation } from './simulations/MarketingSimulation';
import { HRSimulation } from './simulations/HRSimulation';
import { FinanceSimulation } from './simulations/FinanceSimulation';

interface SimulationPageProps {
  simulationId: string;
  onNavigate: (nav: NavigationState) => void;
}

export function SimulationPage({ simulationId, onNavigate }: SimulationPageProps) {
  const renderSimulation = () => {
    switch (simulationId) {
      case 'warehouse':
        return <WarehouseSimulation />;
      case 'factory':
        return <FactorySimulation />;
      case 'showroom':
        return <ShowroomSimulation />;
      case 'trading':
        return <TradingSimulation />;
      case 'marketing':
        return <MarketingSimulation />;
      case 'hr':
        return <HRSimulation />;
      case 'finance':
        return <FinanceSimulation />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">Simulation Not Found</h1>
              <button
                onClick={() => onNavigate({ page: 'home' })}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <button
          onClick={() => onNavigate({ page: 'home' })}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>
      
      {renderSimulation()}
    </div>
  );
}