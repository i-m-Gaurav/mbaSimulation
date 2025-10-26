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

type Station = "preparation" | "assembly" | "completion" | "inspection";

interface FactoryProductionMethodProps {
  // Map employeeId -> selected station (or null if unassigned)
  assignments: Record<string, Station | null>;
  onChange: (next: Record<string, Station | null>) => void;
  productionMode: "one" | "all";
  onModeChange: (mode: "one" | "all") => void;
  allStationsEmployeeIds: string[];
  onToggleAllStations: (employeeId: string) => void;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Ashley",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 17,
    defectRate: 9,
    stations: { preparation: 2, assembly: 1, completion: 5, inspection: 2 },
  },
  {
    id: "2",
    name: "Vu",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 15,
    defectRate: 10,
    stations: { preparation: 2, assembly: 5, completion: 1, inspection: 2 },
  },
  {
    id: "3",
    name: "Lucy",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 48,
    defectRate: 2,
    stations: { preparation: 2, assembly: 4, completion: 5, inspection: 2 },
  },
  {
    id: "4",
    name: "Mark",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 50,
    defectRate: 1,
    stations: { preparation: 2, assembly: 5, completion: 4, inspection: 2 },
  },
  {
    id: "5",
    name: "Ali",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 24,
    defectRate: 3.5,
    stations: { preparation: 5, assembly: 2, completion: 1, inspection: 1 },
  },
  {
    id: "6",
    name: "Navid",
    image:
      "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 20,
    defectRate: 5,
    stations: { preparation: 4, assembly: 1, completion: 4, inspection: 4 },
  },
];

const stationTimes = {
  preparation: { min: 4, max: 5 },
  assembly: { min: 6, max: 5 },
  completion: { min: 4, max: 5 },
  inspection: { min: 3, max: 5 },
};

export function FactoryProductionMethod({
  assignments,
  onChange,
  productionMode,
  onModeChange,
  allStationsEmployeeIds,
  onToggleAllStations,
}: FactoryProductionMethodProps) {
  // Enforce a default of one-station view per requirements
  const [viewMode, setViewMode] = useState<"one" | "all">(productionMode);

  const selectStation = (employeeId: string, station: Station) => {
    const next = { ...assignments, [employeeId]: station };
    onChange(next);
  };

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
            <span className="text-slate-700 font-medium">
              Decide your factory's production method
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-700">Each employee works:</span>
            <Info className="h-4 w-4 text-slate-400" />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setViewMode("one");
                  onModeChange("one");
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === "one"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                }`}
              >
                One Station
              </button>
              <button
                onClick={() => {
                  setViewMode("all");
                  onModeChange("all");
                }}
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
          <div className="grid grid-cols-5 gap-5 ml-20">
            {/* empty first column to align with the employee info column */}
            <div />

            <div className="text-center">
              <div className="font-medium text-slate-800">Preparation</div>
              <div className="text-sm text-slate-500">
                {stationTimes.preparation.min}–{stationTimes.preparation.max}{" "}
                mins
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-800">Assembly</div>
              <div className="text-sm text-slate-500">
                {stationTimes.assembly.min}–{stationTimes.assembly.max} mins
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-800">Completion</div>
              <div className="text-sm text-slate-500">
                {stationTimes.completion.min}–{stationTimes.completion.max} mins
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-800">Inspection</div>
              <div className="text-sm text-slate-500">
                {stationTimes.inspection.min}–{stationTimes.inspection.max} mins
              </div>
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
                  <div className="font-semibold text-slate-800">
                    {employee.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    ${employee.hourlyRate}/hr
                  </div>
                  <div className="text-xs text-slate-500">
                    {employee.defectRate}% defects
                  </div>
                </div>
              </div>

              {viewMode === "all" ? (
                <button
                  type="button"
                  onClick={() => onToggleAllStations(employee.id)}
                  aria-pressed={allStationsEmployeeIds.includes(employee.id)}
                  className={`flex-1 rounded-lg py-4 px-6 flex items-center justify-center relative border-2 transition-colors ${
                    allStationsEmployeeIds.includes(employee.id)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-slate-300 hover:border-blue-400 text-slate-700"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      allStationsEmployeeIds.includes(employee.id)
                        ? "text-white"
                        : "text-slate-800"
                    }`}
                  >
                    All Tasks
                  </span>
                  {allStationsEmployeeIds.includes(employee.id) && (
                    <svg
                      className="absolute right-4 w-5 h-5"
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
                  )}

                  {/* Compact row of speed bars above the All Tasks button (matches one-station visuals) */}
                  <div className="absolute -top-2 left-0 right-0 flex items-center justify-center gap-14">
                    <div className="w-20">
                      {renderSpeedBar(
                        employee.stations.preparation,
                        stationTimes.preparation.max
                      )}
                    </div>
                    <div className="w-20">
                      {renderSpeedBar(
                        employee.stations.assembly,
                        stationTimes.assembly.max
                      )}
                    </div>
                    <div className="w-20">
                      {renderSpeedBar(
                        employee.stations.completion,
                        stationTimes.completion.max
                      )}
                    </div>
                    <div className="w-20">
                      {renderSpeedBar(
                        employee.stations.inspection,
                        stationTimes.inspection.max
                      )}
                    </div>
                  </div>
                </button>
              ) : (
                <div className="flex-1 grid grid-cols-4 gap-2">
                  {["preparation", "assembly", "completion", "inspection"].map(
                    (station) => {
                      const stationKey =
                        station as keyof typeof employee.stations;
                      const maxTime = stationTimes[stationKey].max;
                      return (
                        <div key={station} className="relative">
                          <div className="absolute -top-2 left-0 right-0">
                            {renderSpeedBar(
                              employee.stations[stationKey],
                              maxTime
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              selectStation(employee.id, stationKey as Station)
                            }
                            className={`bg-white rounded-lg py-8 px-4 w-full border-2 transition-colors ${
                              assignments[employee.id] === stationKey
                                ? "border-blue-600 ring-2 ring-blue-200"
                                : "border-slate-300 hover:border-blue-400"
                            }`}
                            aria-pressed={
                              assignments[employee.id] === stationKey
                            }
                            aria-label={`${employee.name} assigned to ${station}`}
                          />
                        </div>
                      );
                    }
                  )}
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
