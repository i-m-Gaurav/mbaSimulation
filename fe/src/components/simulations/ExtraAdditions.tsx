import { useState } from "react";
import { Info } from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  image: string;
  cost: number;
  benefit: string;
  enabled: boolean;
}

export function ExtraAdditions() {
  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: "1",
      name: "Shoelace protector",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      cost: 0.25,
      benefit: "Buyer may pay up to 7% more",
      enabled: true
    },
    {
      id: "2",
      name: "Technology improvement",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      cost: 0.50,
      benefit: "Buyer may pay up to 5% more",
      enabled: false
    },
    {
      id: "3",
      name: "Customized flag add-on",
      image: "https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      cost: 0.30,
      benefit: "Buyer may pay up to 7% more",
      enabled: true
    },
    {
      id: "4",
      name: "Upgraded performance insole",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      cost: 1.50,
      benefit: "Buyer may pay up to 7% more",
      enabled: true
    }
  ]);

  const toggleAddOn = (id: string) => {
    setAddOns(addOns.map(addon =>
      addon.id === id ? { ...addon, enabled: !addon.enabled } : addon
    ));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-2xl font-bold text-slate-800">Extra Additions</h2>
        </div>

        <p className="text-slate-600 mb-8">
          Select optional enhancements to the finished shoe, which generally incur added cost but might draw a premium price from buyers, and in general, higher-quality shoes will yield a higher price increase per enhancement. Hint: you know from market research that the cheapest shoes may not be ideal to offer such enhancements for, as over-embellished products could be seen as overly complex. In contrast, carefully selected features would best fit your product strategy.
        </p>

        <div className="space-y-0 divide-y divide-slate-200">
          {addOns.map((addon) => (
            <div key={addon.id} className="py-6 flex items-center gap-6">
              <img
                src={addon.image}
                alt={addon.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {addon.name}
                  </h3>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>

                <div className="grid grid-cols-2 gap-x-8 text-sm">
                  <div>
                    <span className="text-slate-600">Cost</span>
                    <span className="ml-2 font-semibold text-slate-800">
                      ${addon.cost.toFixed(2)} per unit
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600">Benefit</span>
                    <span className="ml-2 font-semibold text-slate-800">
                      {addon.benefit}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleAddOn(addon.id)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  addon.enabled ? "bg-green-500" : "bg-slate-300"
                }`}
                role="switch"
                aria-checked={addon.enabled}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    addon.enabled ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
