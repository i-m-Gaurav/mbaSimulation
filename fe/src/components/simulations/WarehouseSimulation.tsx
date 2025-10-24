import { useEffect, useMemo, useState } from "react";
import {
  Package,
  HelpCircle,
  Info,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
} from "lucide-react";
import { FactoryProductionMethod } from "./FactoryProductionMethod";
import { ExtraAdditions } from "./ExtraAdditions";
import { Modal } from "../auth/Modal";
import { apiFetch, Endpoints } from "../../utils/api";

type ConfigSettings = {
  quantityRange: [number, number];
  qualityRange: [number, number];
  priceStops: number[];
};

interface WarehouseSimulationProps {
  onSubmitted?: () => void;
}

export function WarehouseSimulation({ onSubmitted }: WarehouseSimulationProps) {
  const [quantity, setQuantity] = useState(4500);
  const [qualityRating, setQualityRating] = useState(50); // 10 - 60 range per spec (steps of 10)
  const [qualityZone] = useState(50);
  const [additionalOption, setAdditionalOption] = useState("buying-group");
  const [deliveryMethod, setDeliveryMethod] = useState("in-house");
  const [fulfillmentMethod, setFulfillmentMethod] = useState("batches");
  const [addBuffer, setAddBuffer] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [config, setConfig] = useState<ConfigSettings | null>(null);
  const [simulationId, setSimulationId] = useState<string | null>(
    () => window.localStorage.getItem("simulationId") || null
  );
  type Station = "preparation" | "assembly" | "completion" | "inspection";
  const [productionMode, setProductionMode] = useState<"one" | "all">("one");
  const [factoryAssignments, setFactoryAssignments] = useState<
    Record<string, Station | null>
  >({
    "1": null,
    "2": null,
    "3": null,
    "4": null,
    "5": null,
    "6": null,
  });
  const [allStationsEmployeeIds, setAllStationsEmployeeIds] = useState<
    string[]
  >([]);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);

  const fetchConfig = async () => {
    const res = await apiFetch<ConfigSettings>(Endpoints.configGet);
    if (res.data) {
      setConfig(res.data);
      // After config arrives, clamp existing selections to valid ranges
      const [qMin, qMax] = res.data.quantityRange ?? [1000, 6000];
      const [qualMin, qualMax] = res.data.qualityRange ?? [10, 60];
      const stops = res.data.priceStops?.length
        ? res.data.priceStops
        : [10, 11, 13, 16, 20, 25];
      const step =
        stops.length > 1 ? (qualMax - qualMin) / (stops.length - 1) : 10;

      setQuantity((prev) => Math.min(qMax, Math.max(qMin, prev)));
      // Snap quality to the nearest legal step within range
      setQualityRating((prev) => {
        const clamped = Math.min(qualMax, Math.max(qualMin, prev));
        const idx = Math.round((clamped - qualMin) / step);
        const snapped = qualMin + idx * step;
        return Math.round(snapped);
      });
    } else if (res.error) {
      // Fallbacks will be used
      console.error("Error fetching config:", res.error);
    }
  };

  useEffect(() => {
    try {
      fetchConfig();
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  }, []);

  // Save warehouse data to backend (create or update a simulation)
  const saveWarehouse = async () => {
    const warehouseData = {
      quantity,
      qualityRating,
      pricePerUnit,
      additionalOption,
      deliveryMethod,
      fulfillmentMethod,
      addBuffer,
    };

    try {
      if (!simulationId) {
        const res = await apiFetch<{ _id: string }>(
          Endpoints.simulationCreate,
          {
            method: "POST",
            body: JSON.stringify({ warehouseData }),
          }
        );
        if (res.data && (res.data as unknown as { _id?: string })._id) {
          const id = (res.data as unknown as { _id?: string })._id as string;
          setSimulationId(id);
          window.localStorage.setItem("simulationId", id);
          console.log("Created simulation", id);
        } else {
          console.error("Failed creating simulation", res.error);
        }
      } else {
        const res = await apiFetch(Endpoints.simulationUpdate + simulationId, {
          method: "PUT",
          body: JSON.stringify({ warehouseData }),
        });
        if (res.error) console.error("Failed updating simulation", res.error);
        else console.log("Updated simulation", simulationId);
      }
    } catch (err) {
      console.error("Error saving warehouse data", err);
    }
  };

  // Save factory data (assignments + production mode) to backend
  const saveFactory = async () => {
    const factoryData = {
      productionMode,
      assignments: factoryAssignments,
      allStationsEmployeeIds,
    };

    try {
      if (!simulationId) {
        // Create a new simulation if missing (edge case)
        const res = await apiFetch<{ _id: string }>(
          Endpoints.simulationCreate,
          {
            method: "POST",
            body: JSON.stringify({ factoryData }),
          }
        );
        if (res.data && (res.data as unknown as { _id?: string })._id) {
          const id = (res.data as unknown as { _id?: string })._id as string;
          setSimulationId(id);
          window.localStorage.setItem("simulationId", id);
          console.log("Created simulation with factory data", id);
        } else {
          console.error("Failed creating simulation (factory)", res.error);
        }
      } else {
        const res = await apiFetch(Endpoints.simulationUpdate + simulationId, {
          method: "PUT",
          body: JSON.stringify({ factoryData }),
        });
        if (res.error) console.error("Failed updating factory data", res.error);
        else console.log("Updated factory data for simulation", simulationId);
      }
    } catch (err) {
      console.error("Error saving factory data", err);
    }
  };

  // Save extra additions selection to backend
  const saveExtraAdditions = async () => {
    const extraAdditions = { selectedAddOnIds };
    try {
      if (!simulationId) {
        const res = await apiFetch<{ _id: string }>(
          Endpoints.simulationCreate,
          {
            method: "POST",
            body: JSON.stringify({ extraAdditions }),
          }
        );
        if (res.data && (res.data as unknown as { _id?: string })._id) {
          const id = (res.data as unknown as { _id?: string })._id as string;
          setSimulationId(id);
          window.localStorage.setItem("simulationId", id);
          console.log("Created simulation with extra additions", id);
        } else {
          console.error(
            "Failed creating simulation (extraAdditions)",
            res.error
          );
        }
      } else {
        const res = await apiFetch(Endpoints.simulationUpdate + simulationId, {
          method: "PUT",
          body: JSON.stringify({ extraAdditions }),
        });
        if (res.error)
          console.error("Failed updating extra additions", res.error);
        else
          console.log("Updated extra additions for simulation", simulationId);
      }
    } catch (err) {
      console.error("Error saving extra additions", err);
    }
  };

  // Create order details document on final submit
  const createOrderDetails = async () => {
    const spendingForecast = {
      warehouseCost: Math.round(warehouseCost),
      factoryCost: Math.round(factoryCost),
      showroomCost: Math.round(showroomCost),
      totalSpending: Math.round(totalSpending),
    };
    const payload = {
      simulationId,
      quantity,
      qualityRating,
      pricePerUnit,
      timeToProduceWeeks: Number(timeToProduceWeeks.toFixed(1)),
      potentialRevenue: Math.round(totalRevenue),
      spendingForecast,
    };
    try {
      const res = await apiFetch(Endpoints.ordersCreate, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (res.error) console.error("Failed to create order details", res.error);
      else console.log("Order details saved");
    } catch (err) {
      console.error("Error creating order details", err);
    }
  };

  // Discrete mapping: Quality [10,20,30,40,50,60] -> Price [10,11,13,16,20,25]
  // Drive ranges and stops from backend config (fallback to defaults if not loaded)
  const QUANTITY_MIN = config?.quantityRange?.[0] ?? 1000;
  const QUANTITY_MAX = config?.quantityRange?.[1] ?? 6000;
  const QUALITY_MIN = config?.qualityRange?.[0] ?? 10;
  const QUALITY_MAX = config?.qualityRange?.[1] ?? 60;
  const PRICE_STOPS = useMemo<number[]>(
    () =>
      config?.priceStops && config.priceStops.length
        ? config.priceStops
        : [10, 11, 13, 16, 20, 25],
    [config?.priceStops]
  );
  const QUALITY_STEP = useMemo(() => {
    return PRICE_STOPS.length > 1
      ? (QUALITY_MAX - QUALITY_MIN) / (PRICE_STOPS.length - 1)
      : 10;
  }, [PRICE_STOPS, QUALITY_MAX, QUALITY_MIN]);

  const priceIndex = useMemo(() => {
    const clampedQ = Math.min(
      QUALITY_MAX,
      Math.max(QUALITY_MIN, qualityRating)
    );
    const idx = Math.round((clampedQ - QUALITY_MIN) / QUALITY_STEP);
    return Math.max(0, Math.min(PRICE_STOPS.length - 1, idx));
  }, [
    QUALITY_MAX,
    QUALITY_MIN,
    QUALITY_STEP,
    qualityRating,
    PRICE_STOPS.length,
  ]);

  const pricePerUnit = PRICE_STOPS[priceIndex];
  const totalRevenue = quantity * pricePerUnit * (qualityZone / 50);

  const warehouseCost = quantity * 43.73;
  const factoryCost = quantity * 20.03;
  const showroomCost = quantity * 1.4;
  const totalSpending = warehouseCost + factoryCost + showroomCost;
  const potentialProfit = totalRevenue - totalSpending;

  const timeToProduceWeeks = Math.max(
    6,
    Math.min(10, 8 - (qualityRating - 80) / 10)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">The Warehouse, Round 2</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Make inventory and final product delivery decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {step === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Shoe Materials
                  </h2>
                </div>
                <p className="text-slate-600 mb-8">
                  Decide how many shoes you would like to produce, and at what
                  level of quality.
                </p>

                <div className="space-y-8">
                  {/* Quantity Slider */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <label className="text-slate-700 font-semibold mr-2">
                          Quantity to Order
                        </label>
                        <HelpCircle className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {quantity.toLocaleString()} units
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={QUANTITY_MIN}
                        max={QUANTITY_MAX}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-corporate"
                      />
                      <div className="flex justify-between text-slate-500 text-sm mt-2">
                        <span>{QUANTITY_MIN.toLocaleString()}</span>
                        <span>{QUANTITY_MAX.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quality & Price Sliders */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <label className="text-slate-700 font-semibold mr-2">
                          Material Quality
                        </label>
                        <HelpCircle className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">
                          Quality rating: {qualityRating}
                        </div>
                        <div className="text-slate-500 text-sm">
                          ${pricePerUnit.toFixed(2)} per unit
                        </div>
                      </div>
                    </div>
                    {/* Quality slider (from backend range) */}
                    <div className="relative mb-6">
                      <input
                        type="range"
                        min={QUALITY_MIN}
                        max={QUALITY_MAX}
                        step={QUALITY_STEP}
                        value={qualityRating}
                        onChange={(e) =>
                          setQualityRating(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-corporate"
                      />
                      <div className="flex justify-between text-slate-500 text-sm mt-2">
                        <span>{QUALITY_MIN}</span>
                        <span>{QUALITY_MAX}</span>
                      </div>
                    </div>

                    {/* Price slider (backend price stops) linked to quality */}
                    <div className="relative mb-4">
                      <input
                        type="range"
                        min={0}
                        max={PRICE_STOPS.length - 1}
                        step={1}
                        value={priceIndex}
                        onChange={(e) =>
                          setQualityRating(
                            Math.round(
                              QUALITY_MIN +
                                parseInt(e.target.value) * QUALITY_STEP
                            )
                          )
                        }
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-corporate"
                      />
                      <div className="flex justify-between text-slate-500 text-sm mt-2">
                        <span>${PRICE_STOPS[0]}</span>
                        <span>${PRICE_STOPS[PRICE_STOPS.length - 1]}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className="text-slate-500 text-sm">Basic Zone</div>
                        <div className="font-semibold text-slate-700">
                          ${PRICE_STOPS[0]}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-500 text-sm">
                          Premium Zone
                        </div>
                        <div className="font-semibold text-slate-700">
                          ${PRICE_STOPS[PRICE_STOPS.length - 1]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center mb-6">
                      <label className="text-slate-700 font-semibold mr-2">
                        Additional Options
                      </label>
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="space-y-3">
                      {[
                        { value: "buying-group", label: "Join a Buying Group" },
                        {
                          value: "just-in-time",
                          label: "Receive Just-In-Time Delivery",
                        },
                        { value: "none", label: "None" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center p-3 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="additional"
                            value={option.value}
                            checked={additionalOption === option.value}
                            onChange={(e) =>
                              setAdditionalOption(e.target.value)
                            }
                            className="mr-3 w-4 h-4 text-blue-600"
                          />
                          <span className="text-slate-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-orange-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Product Delivery
                  </h2>
                </div>
                <p className="text-slate-600 mb-8">
                  Decide which option will be used to deliver final product to
                  the customer.
                </p>

                <div className="space-y-6">
                  {/* Delivery Method */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center mb-4">
                      <label className="text-slate-700 font-semibold mr-2">
                        Delivery Method
                      </label>
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="space-y-3">
                      {[
                        { value: "in-house", label: "In-House" },
                        { value: "outsource", label: "Outsource" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center p-3 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="delivery"
                            value={option.value}
                            checked={deliveryMethod === option.value}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                            className="mr-3 w-4 h-4 text-blue-600"
                          />
                          <span className="text-slate-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Fulfillment Method */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center mb-4">
                      <label className="text-slate-700 font-semibold mr-2">
                        Fulfillment Method
                      </label>
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="space-y-3">
                      {[
                        { value: "batches", label: "Batches" },
                        { value: "single-shipment", label: "Single Shipment" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center p-3 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="fulfillment"
                            value={option.value}
                            checked={fulfillmentMethod === option.value}
                            onChange={(e) =>
                              setFulfillmentMethod(e.target.value)
                            }
                            className="mr-3 w-4 h-4 text-blue-600"
                          />
                          <span className="text-slate-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Buffer Toggle */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <label className="text-slate-700 font-semibold mr-2">
                          Add Buffer for Final Delivery
                        </label>
                        <HelpCircle className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500 text-sm">No</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={addBuffer}
                            onChange={(e) => setAddBuffer(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="text-slate-500 text-sm">Yes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <FactoryProductionMethod
                assignments={factoryAssignments}
                onChange={setFactoryAssignments}
                productionMode={productionMode}
                onModeChange={setProductionMode}
                allStationsEmployeeIds={allStationsEmployeeIds}
                onToggleAllStations={(id) =>
                  setAllStationsEmployeeIds((prev) =>
                    prev.includes(id)
                      ? prev.filter((x) => x !== id)
                      : [...prev, id]
                  )
                }
              />
            )}
            {step === 2 && (
              <ExtraAdditions
                selectedIds={selectedAddOnIds}
                onToggle={toggleAddOn}
              />
            )}

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                onClick={async () => {
                  // Persist data before moving to the next step or submit on final step
                  if (step === 0) await saveWarehouse();
                  else if (step === 1) await saveFactory();
                  else if (step === 2) {
                    await saveExtraAdditions();
                    await createOrderDetails();
                    setShowSubmittedModal(true);
                    setTimeout(() => {
                      setShowSubmittedModal(false);
                      onSubmitted?.();
                    }, 1200);
                  }
                  setStep((prev) => (prev < 2 ? ((prev + 1) as 0 | 1 | 2) : 2));
                }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {step < 2 ? "Next" : "Submit"}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-6">
                <Info className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-slate-800">
                  Order Details
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Quantity</span>
                  <span className="font-semibold text-slate-800">
                    {quantity.toLocaleString()} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Quality</span>
                  <span className="font-semibold text-slate-800">Premium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Price</span>
                  <span className="font-semibold text-slate-800">
                    ${Math.round((pricePerUnit * qualityZone) / 50)}-$
                    {Math.round(((pricePerUnit * qualityZone) / 50) * 1.2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Time to Produce */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-slate-800">
                  Time to Produce
                </h3>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-1">
                  {timeToProduceWeeks.toFixed(1)}
                </div>
                <div className="text-slate-500">weeks</div>
              </div>
            </div>

            {/* Potential Revenue */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-slate-800">
                  Potential Revenue
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  ${Math.round(totalRevenue).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Spending Forecast */}
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
                    ${Math.round(warehouseCost).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Factory</span>
                  <span className="font-semibold text-slate-800">
                    ${Math.round(factoryCost).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Showroom</span>
                  <span className="font-semibold text-slate-800">
                    ${Math.round(showroomCost).toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800">Total</span>
                    <span className="font-bold text-slate-800">
                      ${Math.round(totalSpending).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Potential Profit */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-center mb-4">
                <Target className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-slate-800">
                  Potential Profit
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${Math.round(potentialProfit).toLocaleString()}
                </div>
                <div className="text-slate-600 text-sm">
                  {((potentialProfit / totalRevenue) * 100).toFixed(1)}% margin
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={showSubmittedModal} onClose={() => {}}>
        <div className="p-6 text-center">
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Submitted
          </h3>
          <p className="text-slate-600 text-sm">
            Your simulation choices and order details have been saved.
          </p>
        </div>
      </Modal>
    </div>
  );
}
