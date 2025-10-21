import React, { useState } from 'react';
import { Users, Award, TrendingUp, AlertCircle, Clock, Target } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  performance: number;
  satisfaction: number;
  salary: number;
  experience: number;
  skills: string[];
  avatar: string;
}

export function HRSimulation() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      department: 'Engineering',
      performance: 85,
      satisfaction: 78,
      salary: 95000,
      experience: 4,
      skills: ['React', 'Node.js', 'Python'],
      avatar: '👩‍💻'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Product Manager',
      department: 'Product',
      performance: 92,
      satisfaction: 85,
      salary: 110000,
      experience: 6,
      skills: ['Strategy', 'Analytics', 'Leadership'],
      avatar: '👨‍💼'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      department: 'Design',
      performance: 88,
      satisfaction: 72,
      salary: 85000,
      experience: 3,
      skills: ['Figma', 'User Research', 'Prototyping'],
      avatar: '👩‍🎨'
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Data Analyst',
      department: 'Analytics',
      performance: 79,
      satisfaction: 68,
      salary: 75000,
      experience: 2,
      skills: ['SQL', 'Python', 'Tableau'],
      avatar: '👨‍💻'
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [hrActions, setHrActions] = useState({
    training: false,
    promotion: false,
    salaryIncrease: 0,
    teamBuilding: false,
    mentorship: false
  });

  const [companyMetrics, setCompanyMetrics] = useState({
    overallSatisfaction: 75.8,
    averagePerformance: 86.0,
    turnoverRate: 12.5,
    productivityIndex: 88.2
  });

  const applyHRActions = () => {
    if (!selectedEmployee) return;

    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedEmployee) {
        let newPerformance = emp.performance;
        let newSatisfaction = emp.satisfaction;
        let newSalary = emp.salary;

        if (hrActions.training) {
          newPerformance = Math.min(100, newPerformance + 8);
          newSatisfaction = Math.min(100, newSatisfaction + 5);
        }

        if (hrActions.promotion) {
          newPerformance = Math.min(100, newPerformance + 5);
          newSatisfaction = Math.min(100, newSatisfaction + 12);
          newSalary = Math.floor(newSalary * 1.15);
        }

        if (hrActions.salaryIncrease > 0) {
          newSalary = Math.floor(newSalary * (1 + hrActions.salaryIncrease / 100));
          newSatisfaction = Math.min(100, newSatisfaction + hrActions.salaryIncrease / 2);
        }

        if (hrActions.teamBuilding) {
          newSatisfaction = Math.min(100, newSatisfaction + 7);
        }

        if (hrActions.mentorship) {
          newPerformance = Math.min(100, newPerformance + 6);
          newSatisfaction = Math.min(100, newSatisfaction + 4);
        }

        return {
          ...emp,
          performance: newPerformance,
          satisfaction: newSatisfaction,
          salary: newSalary
        };
      }
      return emp;
    }));

    // Update company metrics
    const avgSatisfaction = employees.reduce((sum, emp) => sum + emp.satisfaction, 0) / employees.length;
    const avgPerformance = employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length;
    
    setCompanyMetrics(prev => ({
      ...prev,
      overallSatisfaction: avgSatisfaction,
      averagePerformance: avgPerformance,
      turnoverRate: Math.max(5, prev.turnoverRate - (avgSatisfaction - 75) * 0.2),
      productivityIndex: Math.min(100, avgPerformance * 1.02)
    }));

    // Reset actions
    setHrActions({
      training: false,
      promotion: false,
      salaryIncrease: 0,
      teamBuilding: false,
      mentorship: false
    });
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">HR Management Simulation</h1>
          </div>
          <p className="text-indigo-100 text-lg">Manage employee performance, satisfaction, and development to build a thriving organization.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Employee Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Metrics */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Company Metrics</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{companyMetrics.overallSatisfaction.toFixed(1)}%</div>
                  <div className="text-slate-600 text-sm">Satisfaction</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{companyMetrics.averagePerformance.toFixed(1)}%</div>
                  <div className="text-slate-600 text-sm">Performance</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{companyMetrics.turnoverRate.toFixed(1)}%</div>
                  <div className="text-slate-600 text-sm">Turnover</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{companyMetrics.productivityIndex.toFixed(1)}</div>
                  <div className="text-slate-600 text-sm">Productivity</div>
                </div>
              </div>
            </div>

            {/* Employee List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Employee Directory</h2>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    onClick={() => setSelectedEmployee(employee.id)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedEmployee === employee.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                          {employee.avatar}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{employee.name}</h3>
                          <p className="text-slate-600">{employee.role} • {employee.department}</p>
                          <p className="text-slate-500 text-sm">{employee.experience} years experience</p>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getPerformanceColor(employee.performance)}`}>
                              {employee.performance}%
                            </div>
                            <div className="text-xs text-slate-500 mt-1">Performance</div>
                          </div>
                          
                          <div className="text-center">
                            <div className={`text-lg font-bold ${getSatisfactionColor(employee.satisfaction)}`}>
                              {employee.satisfaction}%
                            </div>
                            <div className="text-xs text-slate-500">Satisfaction</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">
                              ${employee.salary.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-500">Salary</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 justify-end">
                          {employee.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HR Actions Sidebar */}
          <div className="space-y-6">
            {selectedEmployee ? (
              <>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">HR Actions</h3>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={hrActions.training}
                        onChange={(e) => setHrActions(prev => ({ ...prev, training: e.target.checked }))}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">Provide Training</div>
                        <div className="text-sm text-slate-600">+8% performance, +5% satisfaction</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={hrActions.promotion}
                        onChange={(e) => setHrActions(prev => ({ ...prev, promotion: e.target.checked }))}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">Promote Employee</div>
                        <div className="text-sm text-slate-600">+5% performance, +12% satisfaction, +15% salary</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={hrActions.teamBuilding}
                        onChange={(e) => setHrActions(prev => ({ ...prev, teamBuilding: e.target.checked }))}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">Team Building</div>
                        <div className="text-sm text-slate-600">+7% satisfaction</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={hrActions.mentorship}
                        onChange={(e) => setHrActions(prev => ({ ...prev, mentorship: e.target.checked }))}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">Assign Mentor</div>
                        <div className="text-sm text-slate-600">+6% performance, +4% satisfaction</div>
                      </div>
                    </label>
                    
                    <div>
                      <label className="block text-slate-700 font-semibold mb-2">Salary Increase (%)</label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={hrActions.salaryIncrease}
                        onChange={(e) => setHrActions(prev => ({ ...prev, salaryIncrease: Number(e.target.value) }))}
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-slate-500 mt-1">
                        <span>0%</span>
                        <span className="font-semibold text-indigo-600">{hrActions.salaryIncrease}%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={applyHRActions}
                    className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Apply Actions
                  </button>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Employee Insights</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Risk Level</span>
                      <span className={`font-semibold ${
                        employees.find(e => e.id === selectedEmployee)?.satisfaction! > 80 
                          ? 'text-green-600' 
                          : employees.find(e => e.id === selectedEmployee)?.satisfaction! > 60 
                            ? 'text-yellow-600' 
                            : 'text-red-600'
                      }`}>
                        {employees.find(e => e.id === selectedEmployee)?.satisfaction! > 80 ? 'Low' : 
                         employees.find(e => e.id === selectedEmployee)?.satisfaction! > 60 ? 'Medium' : 'High'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Career Stage</span>
                      <span className="font-semibold text-slate-800">
                        {employees.find(e => e.id === selectedEmployee)?.experience! < 3 ? 'Junior' :
                         employees.find(e => e.id === selectedEmployee)?.experience! < 7 ? 'Mid-level' : 'Senior'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Potential</span>
                      <span className="font-semibold text-indigo-600">High</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="text-center text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>Select an employee to view HR actions and insights</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}