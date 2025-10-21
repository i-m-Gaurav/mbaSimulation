import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, AlertTriangle, Target } from 'lucide-react';

export function TradingSimulation() {
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    positions: {} as Record<string, { shares: number; avgPrice: number }>
  });
  
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderAmount, setOrderAmount] = useState(1000);

  const [stocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.3, volume: 45000000 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -1.2, volume: 12000000 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.20, change: 1.8, volume: 28000000 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.60, change: -3.5, volume: 85000000 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.50, change: 0.8, volume: 18000000 }
  ]);

  const [marketData, setMarketData] = useState(stocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(stock => ({
        ...stock,
        price: stock.price * (1 + (Math.random() - 0.5) * 0.02),
        change: (Math.random() - 0.5) * 6
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const executeOrder = () => {
    const stock = marketData.find(s => s.symbol === selectedStock);
    if (!stock) return;

    const shares = Math.floor(orderAmount / stock.price);
    
    if (orderType === 'buy' && portfolio.cash >= orderAmount) {
      setPortfolio(prev => ({
        cash: prev.cash - (shares * stock.price),
        positions: {
          ...prev.positions,
          [selectedStock]: {
            shares: (prev.positions[selectedStock]?.shares || 0) + shares,
            avgPrice: prev.positions[selectedStock] 
              ? ((prev.positions[selectedStock].avgPrice * prev.positions[selectedStock].shares) + (shares * stock.price)) / (prev.positions[selectedStock].shares + shares)
              : stock.price
          }
        }
      }));
    } else if (orderType === 'sell' && portfolio.positions[selectedStock]?.shares >= shares) {
      setPortfolio(prev => ({
        cash: prev.cash + (shares * stock.price),
        positions: {
          ...prev.positions,
          [selectedStock]: {
            ...prev.positions[selectedStock],
            shares: prev.positions[selectedStock].shares - shares
          }
        }
      }));
    }
  };

  const portfolioValue = portfolio.cash + Object.entries(portfolio.positions).reduce((total, [symbol, position]) => {
    const stock = marketData.find(s => s.symbol === symbol);
    return total + (stock ? position.shares * stock.price : 0);
  }, 0);

  const totalPnL = portfolioValue - 100000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Trading Simulation</h1>
          </div>
          <p className="text-green-100 text-lg">Experience real-time stock trading with live market data and portfolio management.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trading Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Live Market Data</h2>
              <div className="space-y-4">
                {marketData.map((stock) => (
                  <div
                    key={stock.symbol}
                    onClick={() => setSelectedStock(stock.symbol)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedStock === stock.symbol
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800">{stock.symbol}</div>
                        <div className="text-slate-600 text-sm">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">${stock.price.toFixed(2)}</div>
                        <div className={`flex items-center text-sm font-semibold ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Place Order</h2>
              
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setOrderType('buy')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors ${
                      orderType === 'buy'
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderType('sell')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors ${
                      orderType === 'sell'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Sell
                  </button>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Order Amount ($)</label>
                  <input
                    type="number"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="100"
                    step="100"
                  />
                </div>

                <button
                  onClick={executeOrder}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-colors ${
                    orderType === 'buy'
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  }`}
                >
                  {orderType === 'buy' ? 'Execute Buy Order' : 'Execute Sell Order'}
                </button>
              </div>
            </div>
          </div>

          {/* Portfolio Sidebar */}
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Portfolio Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Value</span>
                  <span className="font-bold text-slate-800">${portfolioValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cash</span>
                  <span className="font-bold text-slate-800">${portfolio.cash.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">P&L</span>
                  <span className={`font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Positions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Current Positions</h3>
              <div className="space-y-3">
                {Object.entries(portfolio.positions).filter(([_, position]) => position.shares > 0).map(([symbol, position]) => {
                  const stock = marketData.find(s => s.symbol === symbol);
                  const currentValue = stock ? position.shares * stock.price : 0;
                  const pnl = currentValue - (position.shares * position.avgPrice);
                  
                  return (
                    <div key={symbol} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-800">{symbol}</span>
                        <span className="text-slate-600">{position.shares} shares</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Avg: ${position.avgPrice.toFixed(2)}</span>
                        <span className={`font-semibold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {pnl >= 0 ? '+' : ''}${pnl.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {Object.keys(portfolio.positions).filter(symbol => portfolio.positions[symbol].shares > 0).length === 0 && (
                  <div className="text-slate-500 text-center py-4">No positions</div>
                )}
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-slate-800">Risk Analysis</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Portfolio Concentration</span>
                  <span className="font-semibold text-orange-600">
                    {Object.keys(portfolio.positions).filter(s => portfolio.positions[s].shares > 0).length > 0 ? 'Moderate' : 'Low'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cash Allocation</span>
                  <span className="font-semibold text-slate-800">
                    {((portfolio.cash / portfolioValue) * 100).toFixed(1)}%
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