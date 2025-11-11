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
import { User } from "lucide-react";

interface PerEmployeeQuality {
  name: string;
  quality: number;
  id?: string;
  defective?: number;
}

interface EmployeePerformanceProps {
  perEmployeeQuality: PerEmployeeQuality[];
}

const getColorForQuality = (quality: number): string => {
  if (quality >= 95) return "#10b981"; // Green - Excellent
  if (quality >= 90) return "#3b82f6"; // Blue - Good
  if (quality >= 85) return "#f59e0b"; // Amber - Fair
  return "#ef4444"; // Red - Needs Improvement
};

const getQualityLabel = (quality: number): string => {
  if (quality >= 95) return "Excellent";
  if (quality >= 90) return "Good";
  if (quality >= 85) return "Fair";
  return "Needs Improvement";
};

export function EmployeePerformance({
  perEmployeeQuality,
}: EmployeePerformanceProps) {
  if (!perEmployeeQuality || perEmployeeQuality.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6"
      >
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Employee Quality Performance
        </h3>
        <p className="text-slate-500 text-center py-8">
          No employee data available
        </p>
      </motion.div>
    );
  }

  const sortedEmployees = [...perEmployeeQuality].sort(
    (a, b) => b.quality - a.quality
  );
  const topPerformer = sortedEmployees[0];
  const averageQuality =
    sortedEmployees.reduce((sum, e) => sum + e.quality, 0) /
    sortedEmployees.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-6">
        Employee Quality Performance
      </h3>

      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedEmployees}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis
              stroke="#64748b"
              domain={[0, 100]}
              label={{ value: "Quality %", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Quality"]}
              labelFormatter={(label: string | number) => `${label}`}
            />
            <Bar dataKey="quality" radius={[8, 8, 0, 0]}>
              {sortedEmployees.map((employee, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColorForQuality(employee.quality)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <p className="text-sm text-slate-600 mb-2">Top Performer</p>
          <p className="text-2xl font-bold text-green-600">
            {topPerformer.name}
          </p>
          <p className="text-lg font-semibold text-green-700">
            {topPerformer.quality.toFixed(1)}%
          </p>
          <p className="text-xs text-green-600 mt-1">
            {getQualityLabel(topPerformer.quality)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-slate-600 mb-2">Average Quality</p>
          <p className="text-2xl font-bold text-blue-600">
            {averageQuality.toFixed(1)}%
          </p>
          <p className="text-lg font-semibold text-blue-700">Across Team</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-slate-800 text-sm mb-4">
          Individual Performance
        </h4>
        {sortedEmployees.map((employee, index) => (
          <motion.div
            key={employee.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.85 + index * 0.1 }}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{employee.name}</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${employee.quality}%`,
                      backgroundColor: getColorForQuality(employee.quality),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="text-right ml-4">
              <p className="font-bold text-slate-800">
                {employee.quality.toFixed(1)}%
              </p>
              <p className="text-xs text-slate-500">
                {getQualityLabel(employee.quality)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
