import { Info, DollarSign, Clock, TrendingUp, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { employees as factoryEmployees } from "./data/employees";

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
  // Optional fields for defect calculation/display
  selectedEmployeeIds?: string[];
  defectiveUnits?: number;
  finalQuantity?: number;
  averageQualityAcrossWorkers?: number;
  perEmployeeQuality?: Array<{
    id: string;
    name: string;
    defective: number;
    quality: number; // percent
  }>;
}

export function ResultsPage() {
  const [data, setData] = useState<Snapshot | null>(null);
  const [finalQty, setFinalQty] = useState<number | null>(null);
  const [defects, setDefects] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lastOrderDetails");
      if (raw) setData(JSON.parse(raw));
    } catch {
      setData(null);
    }
  }, []);

  // Compute final quantity after defects if available or use precomputed values
  useEffect(() => {
    if (!data) return;
    // If snapshot already has values, use them
    if (
      typeof data.finalQuantity === "number" &&
      typeof data.defectiveUnits === "number"
    ) {
      setFinalQty(data.finalQuantity);
      setDefects(data.defectiveUnits);
      return;
    }
    // Otherwise, try to compute if we have selected employees
    if (data.selectedEmployeeIds && data.selectedEmployeeIds.length) {
      const set = new Set(data.selectedEmployeeIds);
      const selected = factoryEmployees.filter((e) => set.has(e.id));
      // Binomial sampler
      const binomial = (n: number, p: number) => {
        let count = 0;
        for (let i = 0; i < n; i++) if (Math.random() < p) count++;
        return count;
      };
      const totalDefective = selected.reduce((sum, e) => {
        const p = (e.defectRate || 0) / 100;
        if (!data.quantity || p <= 0) return sum;
        return sum + binomial(data.quantity, p);
      }, 0);
      const fq = Math.max(0, data.quantity - totalDefective);
      setFinalQty(fq);
      setDefects(totalDefective);
    } else {
      setFinalQty(null);
      setDefects(null);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Results</h2>
          <p className="text-slate-600">
            No results to display. Please complete a simulation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
        {/* Main Column (Order Details + Time) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center mb-6">
              <Info className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">
                Order Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Initial Quantity</span>
                <span className="font-semibold text-slate-800">
                  {data.quantity.toLocaleString()} units
                </span>
              </div>
              {finalQty !== null && defects !== null && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Defective Units</span>
                    <span className="font-semibold text-red-600">
                      {defects.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Final Quantity</span>
                    <span className="font-bold text-slate-900">
                      {finalQty.toLocaleString()} units
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Quality</span>
                <span className="font-semibold text-slate-800">
                  {data.qualityRating >= 70 ? "Premium" : "Basic"}
                </span>
              </div>
              {typeof data.averageQualityAcrossWorkers === "number" && (
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Average Quality Across Workers
                  </span>
                  <span className="font-semibold text-slate-800">
                    {data.averageQualityAcrossWorkers.toFixed(1)}%
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Unit Price (selected)</span>
                <span className="font-semibold text-slate-800">
                  ${data.pricePerUnit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">
                Time to Produce
              </h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-1">
                {data.timeToProduceWeeks.toFixed(1)}
              </div>
              <div className="text-slate-500">weeks</div>
            </div>
          </div>
        </div>

        {/* Sidebar (Financials) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">
                Potential Revenue
              </h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                ${Math.round(data.potentialRevenue).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-5 w-5 text-slate-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">
                Spending Forecast
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Warehouse</span>
                <span className="font-semibold text-slate-800">
                  $
                  {Math.round(
                    data.spendingForecast.warehouseCost
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Labour</span>
                <span className="font-semibold text-slate-800">
                  $
                  {Math.round(
                    data.spendingForecast.labourCost
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Factory</span>
                <span className="font-semibold text-slate-800">
                  $
                  {Math.round(
                    data.spendingForecast.factoryCost
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Showroom</span>
                <span className="font-semibold text-slate-800">
                  $
                  {Math.round(
                    data.spendingForecast.showroomCost
                  ).toLocaleString()}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">Total</span>
                  <span className="font-bold text-slate-800">
                    $
                    {Math.round(
                      data.spendingForecast.totalSpending
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-center mb-4">
              <Target className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">
                Potential Profit
              </h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${Math.round(data.potentialProfit).toLocaleString()}
              </div>
              <div className="text-slate-600 text-sm">
                {((data.potentialProfit / data.potentialRevenue) * 100).toFixed(
                  1
                )}
                % margin
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
