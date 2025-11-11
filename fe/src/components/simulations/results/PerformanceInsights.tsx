import { motion } from "framer-motion";
import { Award, AlertTriangle, Activity, TrendingUp, Zap } from "lucide-react";

interface PerEmployeeQuality {
  name: string;
  quality: number;
}

interface InsightCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

function InsightCard({
  title,
  value,
  icon,
  gradient,
  delay,
}: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`${gradient} rounded-2xl shadow-lg p-6`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white/30 rounded-lg">{icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-700 mb-1">{title}</p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface PerformanceInsightsProps {
  perEmployeeQuality: PerEmployeeQuality[];
  averageQualityAcrossWorkers: number;
  bottleneckStation?: string;
  defectiveUnits?: number;
  quantity?: number;
}

export function PerformanceInsights({
  perEmployeeQuality,
  averageQualityAcrossWorkers,
  bottleneckStation,
  defectiveUnits,
  quantity,
}: PerformanceInsightsProps) {
  const sortedEmployees = [...perEmployeeQuality].sort(
    (a, b) => b.quality - a.quality
  );
  const topPerformer = sortedEmployees[0];
  const lowestPerformer = sortedEmployees[sortedEmployees.length - 1];
  const performanceGap = Number(
    (topPerformer.quality - lowestPerformer.quality).toFixed(1)
  );

  const getQualityGrade = (avgQuality: number): string => {
    if (avgQuality >= 95) return "Excellent";
    if (avgQuality >= 85) return "Good";
    if (avgQuality >= 75) return "Fair";
    return "Needs Improvement";
  };

  const qualityGrade = getQualityGrade(averageQualityAcrossWorkers);

  const defectRate = quantity ? ((defectiveUnits || 0) / quantity) * 100 : 0;

  const insights = [];
  if (averageQualityAcrossWorkers >= 90) {
    insights.push("Excellent team quality - maintain current setup");
  } else if (averageQualityAcrossWorkers >= 80) {
    insights.push("Good quality performance - room for improvement");
  } else {
    insights.push("Quality needs attention - consider optimizing assignments");
  }

  if (bottleneckStation) {
    insights.push(`Focus on ${bottleneckStation} to improve speed`);
  }

  if (performanceGap > 10) {
    insights.push("Large performance gap between employees");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Performance Insights
      </h3>

      <div className="flex  flex-col gap-4 mb-6">
        <InsightCard
          title="Overall Grade"
          value={qualityGrade}
          icon={<Award className="w-5 h-5 text-amber-600" />}
          gradient="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200"
          delay={0.9}
        />
        <InsightCard
          title="Team Average Quality"
          value={`${averageQualityAcrossWorkers.toFixed(1)}%`}
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          gradient="bg-gradient-to-br from-green-50 to-green-100 border border-green-200"
          delay={0.95}
        />
        <InsightCard
          title="Performance Gap"
          value={`${performanceGap}%`}
          icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
          gradient="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200"
          delay={1.0}
        />
        <InsightCard
          title="Defect Rate"
          value={`${defectRate.toFixed(1)}%`}
          icon={<Zap className="w-5 h-5 text-red-600" />}
          gradient="bg-gradient-to-br from-red-50 to-red-100 border border-red-200"
          delay={1.05}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-6"
      >
        <div className="flex gap-3">
          <Activity className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-blue-900 mb-3">Key Recommendations</p>
            <ul className="space-y-2">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-blue-800">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
