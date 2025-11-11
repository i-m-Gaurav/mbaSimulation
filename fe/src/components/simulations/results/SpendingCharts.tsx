import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpendingForecast {
  warehouseCost: number;
  factoryCost: number;
  showroomCost: number;
  labourCost: number;
  totalSpending: number;
}

interface SpendingChartsProps {
  spendingForecast: SpendingForecast;
  potentialRevenue: number;
  potentialProfit: number;
}

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

export function SpendingCharts({
  spendingForecast,
  potentialRevenue,
  potentialProfit,
}: SpendingChartsProps) {
  const barData = [
    { category: "Warehouse", amount: spendingForecast.warehouseCost },
    { category: "Factory", amount: spendingForecast.factoryCost },
    { category: "Showroom", amount: spendingForecast.showroomCost },
    { category: "Labour", amount: spendingForecast.labourCost },
  ];

  const pieData = [
    { name: "Warehouse", value: spendingForecast.warehouseCost },
    { name: "Factory", value: spendingForecast.factoryCost },
    { name: "Showroom", value: spendingForecast.showroomCost },
    { name: "Labour", value: spendingForecast.labourCost },
  ];

  const profitMargin = ((potentialProfit / potentialRevenue) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1  gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Spending by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis
                dataKey="category"
                type="category"
                stroke="#64748b"
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Spending Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => {
                  const { name, value } = props;
                  return `${name} $${(value / 1000).toFixed(1)}k`;
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6"
      >
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Financial Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
            <p className="text-sm text-slate-600 mb-2">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-600">
              ${potentialRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
            <p className="text-sm text-slate-600 mb-2">Total Spending</p>
            <p className="text-2xl font-bold text-red-600">
              ${spendingForecast.totalSpending.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
            <p className="text-sm text-slate-600 mb-2">Profit</p>
            <p className="text-2xl font-bold text-green-600">
              ${potentialProfit.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
            <p className="text-sm text-slate-600 mb-2">Profit Margin</p>
            <p className="text-2xl font-bold text-purple-600">
              {profitMargin}%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
