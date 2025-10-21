import { useState } from "react";
import { Info } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  image: string;
  hourlyRate: number;
  defectRate: number;
  stations: {
    preparation: number;
    assembly: number;
    completion: number;
    inspection: number;
  };
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Ashley",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 97,
    defectRate: 9.60,
    stations: { preparation: 4, assembly: 6, completion: 4, inspection: 3 }
  },
  {
    id: "2",
    name: "Vu",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 75,
    defectRate: 10.00,
    stations: { preparation: 3, assembly: 8, completion: 5, inspection: 4 }
  },
  {
    id: "3",
    name: "Lucy",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 40,
    defectRate: 2.00,
    stations: { preparation: 3, assembly: 7, completion: 2, inspection: 2 }
  },
  {
    id: "4",
    name: "Mark",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 50,
    defectRate: 1.00,
    stations: { preparation: 2, assembly: 8, completion: 5, inspection: 1 }
  },
  {
    id: "5",
    name: "Ali",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 26,
    defectRate: 3.00,
    stations: { preparation: 9, assembly: 4, completion: 5, inspection: 2 }
  },
  {
    id: "6",
    name: "Navid",
    image: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 20,
    defectRate: 0.80,
    stations: { preparation: 5, assembly: 2, completion: 7, inspection: 5 }
  }
];

const stationTimes = {
  preparation: { min: 4, max: 8 },
  assembly: { min: 6, max: 8 },
  completion: { min: 4, max: 8 },
  inspection: { min: 3, max: 8 }
};

export function FactoryProductionMethod() {
  const [viewMode, setViewMode] = useState<"one" | "all">("all");

  const renderSpeedBar = (value: number, max: number) => {
    const segments = max;
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < value ? "bg-red-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-2xl font-bold text-slate-800">
            Factory Production Method
          </h2>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-slate-700 font-medium">Decide your factory's production method</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-700">Each employee works:</span>
            <Info className="h-4 w-4 text-slate-400" />
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("one")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === "one"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                }`}
              >
                One Station
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                }`}
              >
                All Stations
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-slate-700 font-medium">Station Speed</span>
            <Info className="h-4 w-4 text-slate-400" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-medium text-slate-800">Preparation</div>
              <div className="text-sm text-slate-500">{stationTimes.preparation.min}–{stationTimes.preparation.max} mins</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-800">Assembly</div>
              <div className="text-sm text-slate-500">{stationTimes.assembly.min}–{stationTimes.assembly.max} mins</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-800">Completion</div>
              <div className="text-sm text-slate-500">{stationTimes.completion.min}–{stationTimes.completion.max} mins</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-800">Inspection</div>
              <div className="text-sm text-slate-500">{stationTimes.inspection.min}–{stationTimes.inspection.max} mins</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {employees.map((employee) => (
            <div key={employee.id} className="flex items-center gap-4">
              <div className="flex items-center gap-3 w-48">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-800">{employee.name}</div>
                  <div className="text-sm text-slate-600">
                    ${employee.hourlyRate}/hr
                  </div>
                  <div className="text-xs text-slate-500">
                    {employee.defectRate}% defects
                  </div>
                </div>
              </div>

              {viewMode === "all" ? (
                <div className="flex-1 bg-blue-600 rounded-lg py-4 px-6 flex items-center justify-center relative">
                  <span className="text-white font-medium">All Tasks</span>
                  <svg
                    className="absolute right-4 w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div className="absolute -top-2 left-6">
                    {renderSpeedBar(employee.stations.preparation, stationTimes.preparation.max)}
                  </div>
                  <div className="absolute -top-2 left-1/4 ml-6">
                    {renderSpeedBar(employee.stations.assembly, stationTimes.assembly.max)}
                  </div>
                  <div className="absolute -top-2 right-1/4 mr-6">
                    {renderSpeedBar(employee.stations.completion, stationTimes.completion.max)}
                  </div>
                  <div className="absolute -top-2 right-6">
                    {renderSpeedBar(employee.stations.inspection, stationTimes.inspection.max)}
                  </div>
                </div>
              ) : (
                <div className="flex-1 grid grid-cols-4 gap-2">
                  {["preparation", "assembly", "completion", "inspection"].map((station) => {
                    const stationKey = station as keyof typeof employee.stations;
                    const maxTime = stationTimes[stationKey].max;
                    return (
                      <div key={station} className="relative">
                        <div className="absolute -top-2 left-0 right-0">
                          {renderSpeedBar(employee.stations[stationKey], maxTime)}
                        </div>
                        <div className="bg-white border-2 border-slate-300 rounded-lg py-8 px-4"></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
          <Info className="h-4 w-4" />
          <span>Stations</span>
          <Info className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
