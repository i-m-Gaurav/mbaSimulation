import React, { useState } from 'react';
import { DollarSign, TrendingUp, PieChart, Calculator, AlertTriangle, Target } from 'lucide-react';

export function FinanceSimulation() {
  const [financialData, setFinancialData] = useState({
    revenue: 5000000,
    cogs: 3000000,
    operatingExpenses: 1200000,
    interestExpense: 150000,
    taxRate: 25,
    currentAssets: 2500000,
    currentLiabilities: 1800000,
    totalAssets: 8000000,
    totalDebt: 3200000,
    equity: 4800000
  });

  const [investmentScenario, setInvestmentScenario] = useState({
    projectCost: 1000000,
    expectedReturns: [200000, 300000, 400000, 350000, 250000],
    discountRate: 10,
    riskLevel: 'medium'
  });

  const [results, setResults] = useState({
    netIncome: 0,
    grossMargin: 0,
    operatingMargin: 0,
    netMargin: 0,
    currentRatio: 0,
    debtToEquity: 0,
    roe: 0,
    npv: 0,
    irr: 0,
    paybackPeriod: 0
  });

  const calculateFinancials = () => {
    const grossProfit = financialData.revenue - financialData.cogs;
    const operatingIncome = grossProfit - financialData.operatingExpenses;
    const ebt = operatingIncome - financialData.interestExpense;
    const taxes = ebt * (financialData.taxRate / 100);
    const netIncome = ebt - taxes;

    const grossMargin = (grossProfit / financialData.revenue) * 100;
    const operatingMargin = (operatingIncome / financialData.revenue) * 100;
    const netMargin = (netIncome / financialData.revenue) * 100;

    const currentRatio = financialData.currentAssets / financialData.currentLiabilities;
    const debtToEquity = financialData.totalDebt / financialData.equity;
    const roe = (netIncome / financialData.equity) * 100;

    // NPV Calculation
    const discountRate = investmentScenario.discountRate / 100;
    let npv = -investmentScenario.projectCost;
    investmentScenario.expectedReturns.forEach((cashFlow, index) => {
      npv += cashFlow / Math.pow(1 + discountRate, index + 1);
    });

    // IRR Calculation (simplified)
    let irr = 0;
    for (let rate = 0; rate <= 1; rate += 0.001) {
      let testNpv = -investmentScenario.projectCost;
      investmentScenario.expectedReturns.forEach((cashFlow, index) => {
        testNpv += cashFlow / Math.pow(1 + rate, index + 1);
      });
      if (Math.abs(testNpv) < 1000) {
        irr = rate * 100;
        break;
      }
    }

    // Payback Period
    let cumulativeCashFlow = -investmentScenario.projectCost;
    let paybackPeriod = 0;
    for (let i = 0; i < investmentScenario.expectedReturns.length; i++) {
      cumulativeCashFlow += investmentScenario.expectedReturns[i];
      if (cumulativeCashFlow >= 0) {
        paybackPeriod = i + 1;
        break;
      }
    }

    setResults({
      netIncome,
      grossMargin,
      operatingMargin,
      netMargin,
      currentRatio,
      debtToEquity,
      roe,
      npv,
      irr,
      paybackPeriod
    });
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-700',
      'medium': 'bg-yellow-100 text-yellow-700',
      'high': 'bg-red-100 text-red-700'
    };
    return colors[risk as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <DollarSign className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Corporate Finance Simulation</h1>
          </div>
          <p className="text-green-100 text-lg">Analyze financial statements, evaluate investment opportunities, and make strategic financial decisions.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Financial Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Income Statement */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Income Statement</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Revenue</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.revenue}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, revenue: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Cost of Goods Sold</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.cogs}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, cogs: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Operating Expenses</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.operatingExpenses}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, operatingExpenses: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Interest Expense</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.interestExpense}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, interestExpense: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-2">Tax Rate (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={financialData.taxRate}
                    onChange={(e) => setFinancialData(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-500 mt-1">
                    <span>0%</span>
                    <span className="font-semibold text-green-600">{financialData.taxRate}%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Balance Sheet */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Balance Sheet</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Current Assets</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.currentAssets}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, currentAssets: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Current Liabilities</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.currentLiabilities}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, currentLiabilities: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Total Assets</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.totalAssets}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, totalAssets: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Total Debt</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.totalDebt}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, totalDebt: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Equity</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={financialData.equity}
                      onChange={(e) => setFinancialData(prev => ({ ...prev, equity: Number(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Analysis */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Investment Project Analysis</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Initial Investment</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="number"
                        value={investmentScenario.projectCost}
                        onChange={(e) => setInvestmentScenario(prev => ({ ...prev, projectCost: Number(e.target.value) }))}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Discount Rate (%)</label>
                    <input
                      type="number"
                      value={investmentScenario.discountRate}
                      onChange={(e) => setInvestmentScenario(prev => ({ ...prev, discountRate: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                      max="30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Risk Level</label>
                  <div className="flex space-x-4">
                    {['low', 'medium', 'high'].map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setInvestmentScenario(prev => ({ ...prev, riskLevel: risk }))}
                        className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                          investmentScenario.riskLevel === risk
                            ? getRiskColor(risk)
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Expected Cash Flows (5 years)</label>
                  <div className="grid grid-cols-5 gap-3">
                    {investmentScenario.expectedReturns.map((cashFlow, index) => (
                      <div key={index}>
                        <label className="block text-xs text-slate-500 mb-1">Year {index + 1}</label>
                        <input
                          type="number"
                          value={cashFlow}
                          onChange={(e) => {
                            const newReturns = [...investmentScenario.expectedReturns];
                            newReturns[index] = Number(e.target.value);
                            setInvestmentScenario(prev => ({ ...prev, expectedReturns: newReturns }));
                          }}
                          className="w-full px-2 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={calculateFinancials}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Calculator className="h-5 w-5 inline mr-2" />
              Calculate Financial Metrics
            </button>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            {/* Profitability Ratios */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Profitability Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Net Income</span>
                  <span className="font-bold text-slate-800">${results.netIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Gross Margin</span>
                  <span className="font-bold text-slate-800">{results.grossMargin.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Operating Margin</span>
                  <span className="font-bold text-slate-800">{results.operatingMargin.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Net Margin</span>
                  <span className="font-bold text-slate-800">{results.netMargin.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Financial Ratios */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Financial Ratios</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Current Ratio</span>
                  <span className="font-bold text-slate-800">{results.currentRatio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Debt-to-Equity</span>
                  <span className="font-bold text-slate-800">{results.debtToEquity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">ROE</span>
                  <span className="font-bold text-slate-800">{results.roe.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Investment Metrics */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Investment Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">NPV</span>
                  <span className={`font-bold ${results.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${results.npv.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">IRR</span>
                  <span className="font-bold text-slate-800">{results.irr.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payback Period</span>
                  <span className="font-bold text-slate-800">{results.paybackPeriod} years</span>
                </div>
              </div>
            </div>

            {/* Investment Recommendation */}
            <div className={`rounded-2xl border p-6 ${
              results.npv > 0 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
            }`}>
              <div className="flex items-center mb-4">
                {results.npv > 0 ? (
                  <Target className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                )}
                <h3 className="text-lg font-bold text-slate-800">Investment Decision</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className={`font-semibold ${results.npv > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.npv > 0 ? 'ACCEPT PROJECT' : 'REJECT PROJECT'}
                </div>
                <div className="text-slate-600">
                  {results.npv > 0 
                    ? 'Positive NPV indicates value creation for shareholders.'
                    : 'Negative NPV suggests the project destroys value.'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}