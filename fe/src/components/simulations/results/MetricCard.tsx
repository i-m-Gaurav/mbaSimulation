import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  delay?: number;
  suffix?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  delay = 0,
  suffix = "",
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow"
    >
      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-800">
          {value}
          {suffix}
        </p>
      </div>
    </motion.div>
  );
}
