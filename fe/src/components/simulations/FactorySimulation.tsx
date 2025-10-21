import React, { useState } from 'react';
import { Factory, HelpCircle, User, CheckCircle } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  hourlyRate: number;
  defectRate: number;
  avatar: string;
  assignments: {
    preparation: boolean;
    assembly: boolean;
    completion: boolean;
    inspection: boolean;
  };
}

export function FactorySimulation() {
  const [productionMethod, setProductionMethod] = useState<'one-station' | 'all-stations'>('one-station');
  const [offerTraining, setOfferTraining] = useState(false);
  const [offerOvertime, setOfferOvertime] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'ashley',
      name: 'Ashley',
      hourlyRate: 17,
      defectRate: 9.0,
      avatar: '👩‍💼',
      assignments: { preparation: false, assembly: false, completion: true, inspection: false }
    },
    {
      id: 'vu',
      name: 'Vu',
      hourlyRate: 15,
      defectRate: 10.0,
      avatar: '👨‍💼',
      assignments: { preparation: false, assembly: true, completion: false, inspection: false }
    },
    {
      id: 'lucy',
      name: 'Lucy',
      hourlyRate: 48,
      defectRate: 2.0,
      avatar: '👩‍🔧',
      assignments: { preparation: false, assembly: true, completion: false, inspection: false }
    },
    {
      id: 'mark',
      name: 'Mark',
      hourlyRate: 50,
      defectRate: 1.0,
      avatar: '👨‍🔧',
      assignments: { preparation: false, assembly: false, completion: true, inspection: false }
    },
    {
      id: 'ali',
      name: 'Ali',
      hourlyRate: 24,
      defectRate: 3.5,
      avatar: '👩‍💻',
      assignments: { preparation: true, assembly: false, completion: false, inspection: false }
    },
    {
      id: 'navid',
      name: 'Navid',
      hourlyRate: 20,
      defectRate: 5.0,
      avatar: '👨‍🏭',
      assignments: { preparation: false, assembly: false, completion: false, inspection: true }
    }
  ]);

  const toggleAssignment = (employeeId: string, station: keyof Employee['assignments']) => {
    if (productionMethod === 'one-station') {
      // For one-station, only one assignment per employee
      setEmployees(employees.map(emp => 
        emp.id === employeeId 
          ? { ...emp, assignments: { preparation: false, assembly: false, completion: false, inspection: false, [station]: true } }
          : emp
      ));
    } else {
      // For all-stations, multiple assignments allowed
      setEmployees(employees.map(emp =>
        emp.id === employeeId
          ? { ...emp, assignments: { ...emp.assignments, [station]: !emp.assignments[station] } }
          : emp
      ));
    }
  };

  const getStationSpeed = (station: string) => {
    const speeds = {
      preparation: { min: 4, max: 8 },
      assembly: { min: 10, max: 20 },
      completion: { min: 8, max: 16 },
      inspection: { min: 5, max: 10 }
    };
    return speeds[station as keyof typeof speeds];
  };

  const renderSpeedBars = (station: string) => {
    const speed = getStationSpeed(station);
    const segments = 5;
    const activeSegments = Math.ceil((speed.max / 20) * segments);
    
    return (
      <div className="flex space-x-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 rounded-sm ${
              i < activeSegments ? 'bg-orange-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <Factory className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">The Factory, Round 2</h1>
          </div>
          <p className="text-orange-100 text-lg">Select production method, employees, and station assignments.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Decide your factory's production method</h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <span className="text-slate-700 mr-2">Each employee works:</span>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setProductionMethod('one-station')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  productionMethod === 'one-station'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                One Station
              </button>
              <button
                onClick={() => setProductionMethod('all-stations')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  productionMethod === 'all-stations'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Stations
              </button>
            </div>
          </div>

          {/* Station Headers */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            <div></div>
            {['Preparation', 'Assembly', 'Completion', 'Inspection'].map((station) => (
              <div key={station} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{station}</span>
                  <HelpCircle className="h-3 w-3 text-gray-400 ml-1" />
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {station === 'Preparation' && '4-8 mins'}
                  {station === 'Assembly' && '10-20 mins'}
                  {station === 'Completion' && '8-16 mins'}
                  {station === 'Inspection' && '5-10 mins'}
                </div>
                {renderSpeedBars(station.toLowerCase())}
              </div>
            ))}
          </div>

          {/* Employee Grid */}
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="grid grid-cols-6 gap-4 items-center py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                    {employee.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{employee.name}</h3>
                    <div className="text-sm text-gray-500">
                      <div>${employee.hourlyRate}/hr</div>
                      <div>{employee.defectRate}% defects</div>
                    </div>
                  </div>
                </div>
                
                {['preparation', 'assembly', 'completion', 'inspection'].map((station) => (
                  <div key={station} className="flex justify-center">
                    <button
                      onClick={() => toggleAssignment(employee.id, station as keyof Employee['assignments'])}
                      className={`w-16 h-12 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                        employee.assignments[station as keyof Employee['assignments']]
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 hover:border-blue-400 text-gray-400 hover:text-blue-600'
                      }`}
                    >
                      {employee.assignments[station as keyof Employee['assignments']] && (
                        <CheckCircle className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Employee Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Additional Employee Options</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-slate-700 mr-2">Would you like to offer training?</span>
                <HelpCircle className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-500">No</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offerTraining}
                    onChange={(e) => setOfferTraining(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
                <span className="text-sm text-slate-500">Yes</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-slate-700 mr-2">Would you like to offer overtime?</span>
                <HelpCircle className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-500">No</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offerOvertime}
                    onChange={(e) => setOfferOvertime(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
                <span className="text-sm text-slate-500">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}