import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Factory } from "lucide-react";
import { motion } from "framer-motion";
import { MetricCard } from "./results/MetricCard";
import { SpendingCharts } from "./results/SpendingCharts";
import { BottleneckAnalysis } from "./results/BottleneckAnalysis";
import { EmployeePerformance } from "./results/EmployeePerformance";
import { PerformanceInsights } from "./results/PerformanceInsights";
import { Package, Award, Clock, DollarSign } from "lucide-react";

interface Snapshot {
  quantity: number;
  qualityRating: number;
  pricePerUnit: number;
  timeToProduceWeeks: number;
  potentialRevenue: number;
  potentialProfit: number;
  spendingForecast: {
    warehouseCost: number;
    factoryCost: number;
    showroomCost: number;
    labourCost: number;
    totalSpending: number;
  };
  selectedEmployeeIds?: string[];
  defectiveUnits?: number;
  finalQuantity?: number;
  averageQualityAcrossWorkers?: number;
  priceMultiplier?: number;
  perEmployeeQuality?: Array<{
    id: string;
    name: string;
    defective: number;
    quality: number;
  }>;
}

interface StationData {
  station: string;
  time: number;
}

export function ResultsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Snapshot | null>(null);
  const [stationData, setStationData] = useState<StationData[]>([
    { station: "Preparation", time: 0 },
    { station: "Assembly", time: 0 },
    { station: "Completion", time: 0 },
    { station: "Inspection", time: 0 },
  ]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lastOrderDetails");
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(parsed);

        // Initialize station data with mock times (in real scenario, this would come from FactoryProductionMethod)
        // For now, we'll use a simple distribution based on time to produce
        const baseTime = parsed.timeToProduceWeeks * 40; // Convert weeks to hours
        setStationData([
          { station: "Preparation", time: baseTime * 0.2 },
          { station: "Assembly", time: baseTime * 0.35 },
          { station: "Completion", time: baseTime * 0.25 },
          { station: "Inspection", time: baseTime * 0.2 },
        ]);
      }
    } catch {
      setData(null);
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const defectRate =
    data.quantity > 0 ? ((data.defectiveUnits || 0) / data.quantity) * 100 : 0;

  // Calculate effective quality based on worker performance
  const effectiveQuality =
    data.qualityRating * ((data.averageQualityAcrossWorkers || 100) / 100);

  // Calculate selling price based on effective quality
  // Basic: Quality [10, 70) -> Price [25, 45]
  // Premium: Quality [70, 100] -> Price [80, 100]
  let baseSellingPrice = 0;
  if (effectiveQuality < 70) {
    // Interpolate between 10 and 70 for price 25 to 45
    // Slope = (45 - 25) / (70 - 10) = 20 / 60 = 1/3
    // Price = 25 + (Quality - 10) * (1/3)
    // Clamp quality to min 10 just in case
    const q = Math.max(10, effectiveQuality);
    baseSellingPrice = 25 + (q - 10) * (1 / 3);
  } else {
    // Interpolate between 70 and 100 for price 80 to 100
    // Slope = (100 - 80) / (100 - 70) = 20 / 30 = 2/3
    // Price = 80 + (Quality - 70) * (2/3)
    baseSellingPrice = 80 + (effectiveQuality - 70) * (2 / 3);
  }

  // Apply showroom multiplier
  const finalSellingPrice = baseSellingPrice * (data.priceMultiplier || 1);

  // Recalculate revenue and profit
  const actualRevenue = data.quantity * finalSellingPrice;
  const actualProfit = actualRevenue - data.spendingForecast.totalSpending;

  const profitMargin =
    actualRevenue > 0
      ? ((actualProfit / actualRevenue) * 100).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className=" p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              
              <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
                Final Production Results
              </h1>
            </div>
            <p className="text-lg text-slate-600">
              Summary of your Harvard Factory Simulation Round
            </p>
          </div>
        </motion.header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Units Produced"
            value={
              data.finalQuantity?.toLocaleString() ||
              data.quantity.toLocaleString()
            }
            icon={Package}
            delay={0.1}
          />
          <MetricCard
            title="Production Time"
            value={data.timeToProduceWeeks.toFixed(1)}
            suffix=" weeks"
            icon={Clock}
            delay={0.2}
          />
          <MetricCard
            title="Revenue"
            value={`$${Math.round(actualRevenue).toLocaleString()}`}
            icon={DollarSign}
            delay={0.3}
          />
          <MetricCard
            title="Profit Margin"
            value={profitMargin}
            suffix="%"
            icon={Award}
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Spending Charts */}
          <div className="lg:col-span-2 space-y-8">
            <SpendingCharts
              spendingForecast={data.spendingForecast}
              potentialRevenue={actualRevenue}
              potentialProfit={actualProfit}
            />
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Initial Quantity</p>
                <p className="text-2xl font-bold text-slate-800">
                  {data.quantity.toLocaleString()} units
                </p>
              </div>

              {data.defectiveUnits && data.defectiveUnits > 0 && (
                <>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">
                      Defective Units
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {data.defectiveUnits.toLocaleString()}
                    </p>
                    <p className="text-xs text-red-500 mt-1">
                      {defectRate.toFixed(1)}% defect rate
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">
                      Final Quantity
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {data.finalQuantity?.toLocaleString()} units
                    </p>
                  </div>
                </>
              )}

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Quality Rating</p>
                <p className="text-2xl font-bold text-blue-600">
                  {effectiveQuality >= 70 ? "Premium" : "Basic"}
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  Rating: {effectiveQuality.toFixed(1)} (was {data.qualityRating})
                </p>
              </div>

              {data.averageQualityAcrossWorkers !== undefined && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">
                    Average Worker Quality
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {data.averageQualityAcrossWorkers.toFixed(1)}%
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <p className="text-sm text-slate-600 mb-1">Actual Profit</p>
                <p className="text-2xl font-bold text-indigo-600">
                  ${Math.round(actualProfit).toLocaleString()}
                </p>
                <p className="text-xs text-indigo-500 mt-1">
                  {profitMargin}% margin
                </p>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <p className="text-sm text-slate-600 mb-1">Selling Price</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${finalSellingPrice.toFixed(2)}
                </p>
                <p className="text-xs text-emerald-500 mt-1">
                  per unit
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Analysis */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Bottleneck Analysis */}
          <div className="lg:col-span-2">
            <BottleneckAnalysis stationData={stationData} />
          </div>

          {/* Performance Insights - Right Sidebar */}
          <div>
            <PerformanceInsights
              perEmployeeQuality={data.perEmployeeQuality || []}
              averageQualityAcrossWorkers={
                data.averageQualityAcrossWorkers || 0
              }
              bottleneckStation={
                stationData.length > 0
                  ? stationData.reduce((max, current) =>
                      current.time > max.time ? current : max
                    ).station
                  : undefined
              }
              defectiveUnits={data.defectiveUnits}
              quantity={data.quantity}
            />
          </div>
        </div>

        {/* Employee Performance */}
        {data.perEmployeeQuality && data.perEmployeeQuality.length > 0 && (
          <EmployeePerformance perEmployeeQuality={data.perEmployeeQuality} />
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center gap-4 mt-12"
        >
          <button
            onClick={() => {
              // Clear simulation data and go home
              window.localStorage.removeItem("lastOrderDetails");
              window.localStorage.removeItem("simulationId");
              navigate("/");
            }}
            className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => {
              // Go back to the warehouse simulation with the existing simulation ID preserved
              const simId = window.localStorage.getItem("simulationId");
              if (simId) {
                navigate("/simulation/warehouse?step=0");
              } else {
                // If no simulation ID, start fresh
                window.localStorage.removeItem("lastOrderDetails");
                navigate("/simulation/warehouse?step=0");
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Simulation
          </button>
          <button
            onClick={() => {
              // Start a completely new simulation
              window.localStorage.removeItem("lastOrderDetails");
              window.localStorage.removeItem("simulationId");
              navigate("/simulation/warehouse?step=0");
            }}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start New Simulation
          </button>
        </motion.div>
      </div>
    </div>
  );
}
