import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AlertCircle, TrendingDown } from "lucide-react";

interface StationData {
  station: string;
  time: number;
}

interface BottleneckAnalysisProps {
  stationData: StationData[];
}

export function BottleneckAnalysis({ stationData }: BottleneckAnalysisProps) {
  const maxTime = Math.max(...stationData.map((d) => d.time));
  const bottleneck = stationData.find((d) => d.time === maxTime);
  const totalTime = stationData.reduce((sum, d) => sum + d.time, 0);
  const bottleneckPercentage = ((maxTime / totalTime) * 100).toFixed(1);

  const getColorForStation = (station: StationData): string => {
    if (station.time === maxTime) return "#ef4444"; // Red for bottleneck
    return "#3b82f6"; // Blue for others
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">
          Process Bottleneck Analysis
        </h3>
        {bottleneck && (
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">
              {bottleneck.station}
            </span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="station" stroke="#64748b" />
            <YAxis
              stroke="#64748b"
              label={{ value: "Hours", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
              formatter={(value: number) => `${value.toFixed(1)} hours`}
            />
            <Bar dataKey="time" radius={[8, 8, 0, 0]}>
              {stationData.map((station, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColorForStation(station)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-sm text-slate-600 mb-2">Bottleneck Station</p>
          <p className="text-2xl font-bold text-red-600">
            {bottleneck?.station}
          </p>
          <p className="text-xs text-red-500 mt-1">
            {bottleneckPercentage}% of total time
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-slate-600 mb-2">Bottleneck Duration</p>
          <p className="text-2xl font-bold text-blue-600">
            {maxTime.toFixed(1)}
          </p>
          <p className="text-xs text-blue-500 mt-1">hours</p>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">
              Performance Insight
            </p>
            <p className="text-sm text-amber-800">
              {bottleneck?.station} is your production bottleneck. Consider
              optimizing this station or adding more capable employees to
              improve overall efficiency.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
