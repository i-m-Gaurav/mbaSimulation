// import React, { useState } from 'react';
// import { Package, HelpCircle, Info, TrendingUp, DollarSign, Clock, Target, AlertCircle } from 'lucide-react';

// export function WarehouseSimulation() {
//   const [quantity, setQuantity] = useState(4500);
//   const [qualityRating, setQualityRating] = useState(90);
//   const [qualityZone, setQualityZone] = useState(50);
//   const [additionalOption, setAdditionalOption] = useState('buying-group');
//   const [deliveryMethod, setDeliveryMethod] = useState('in-house');
//   const [fulfillmentMethod, setFulfillmentMethod] = useState('batches');
//   const [addBuffer, setAddBuffer] = useState(false);

//   const basePrice = 42;
//   const qualityMultiplier = qualityRating / 100;
//   const pricePerUnit = basePrice * qualityMultiplier;
//   const totalRevenue = quantity * pricePerUnit * (qualityZone / 50);
  
//   const warehouseCost = quantity * 43.73;
//   const factoryCost = quantity * 20.03;
//   const showroomCost = quantity * 1.40;
//   const totalSpending = warehouseCost + factoryCost + showroomCost;
//   const potentialProfit = totalRevenue - totalSpending;

//   const timeToProduceWeeks = Math.max(6, Math.min(10, 8 - (qualityRating - 80) / 10));

//   return (
//     <div className="min-h-screen px-6 lg:px-8 py-12 bg-slate-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
//           <div className="flex items-center">
//             <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
//               <Package className="h-8 w-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-4xl font-bold text-slate-800 mb-2">The Warehouse, Round 2</h1>
//               <p className="text-slate-600 text-lg">Make inventory and final product delivery decisions.</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             {/* Shoe Materials Section */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
//                 <h2 className="text-2xl font-bold text-slate-800">Shoe Materials</h2>
//               </div>
//               <p className="text-slate-600 mb-8">Decide how many shoes you would like to produce, and at what level of quality.</p>
              
//               <div className="space-y-8">
//                 {/* Quantity Slider */}
//                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       <label className="text-slate-700 font-semibold mr-2">Quantity to Order</label>
//                       <HelpCircle className="h-4 w-4 text-slate-400" />
//                     </div>
//                     <div className="text-2xl font-bold text-blue-600">{quantity.toLocaleString()} units</div>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="range"
//                       min="1000"
//                       max="6000"
//                       value={quantity}
//                       onChange={(e) => setQuantity(parseInt(e.target.value))}
//                       className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-corporate"
//                     />
//                     <div className="flex justify-between text-slate-500 text-sm mt-2">
//                       <span>1,000</span>
//                       <span>6,000</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quality Slider */}
//                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       <label className="text-slate-700 font-semibold mr-2">Material Quality</label>
//                       <HelpCircle className="h-4 w-4 text-slate-400" />
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-slate-800">Quality rating: {qualityRating}</div>
//                       <div className="text-slate-500 text-sm">${pricePerUnit.toFixed(2)} per unit</div>
//                     </div>
//                   </div>
//                   <div className="relative mb-4">
//                     <input
//                       type="range"
//                       min="10"
//                       max="100"
//                       value={qualityRating}
//                       onChange={(e) => setQualityRating(parseInt(e.target.value))}
//                       className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-corporate"
//                     />
//                     <div className="flex justify-between text-slate-500 text-sm mt-2">
//                       <span>10</span>
//                       <span>100</span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="text-center">
//                       <div className="text-slate-500 text-sm">Basic Zone</div>
//                       <div className="font-semibold text-slate-700">$10</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-slate-500 text-sm">Premium Zone</div>
//                       <div className="font-semibold text-slate-700">$50</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Options */}
//                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
//                   <div className="flex items-center mb-6">
//                     <label className="text-slate-700 font-semibold mr-2">Additional Options</label>
//                     <HelpCircle className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <div className="space-y-3">
//                     {[
//                       { value: 'buying-group', label: 'Join a Buying Group' },
//                       { value: 'just-in-time', label: 'Receive Just-In-Time Delivery' },
//                       { value: 'none', label: 'None' }
//                     ].map((option) => (
//                       <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-white transition-colors cursor-pointer">
//                         <input
//                           type="radio"
//                           name="additional"
//                           value={option.value}
//                           checked={additionalOption === option.value}
//                           onChange={(e) => setAdditionalOption(e.target.value)}
//                           className="mr-3 w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-slate-700">{option.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Delivery Section */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-2 h-8 bg-orange-500 rounded-full mr-4"></div>
//                 <h2 className="text-2xl font-bold text-slate-800">Product Delivery</h2>
//               </div>
//               <p className="text-slate-600 mb-8">Decide which option will be used to deliver final product to the customer.</p>
              
//               <div className="space-y-6">
//                 {/* Delivery Method */}
//                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
//                   <div className="flex items-center mb-4">
//                     <label className="text-slate-700 font-semibold mr-2">Delivery Method</label>
//                     <HelpCircle className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <div className="space-y-3">
//                     {[
//                       { value: 'in-house', label: 'In-House' },
//                       { value: 'outsource', label: 'Outsource' }
//                     ].map((option) => (
//                       <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-white transition-colors cursor-pointer">
//                         <input
//                           type="radio"
//                           name="delivery"
//                           value={option.value}
//                           checked={deliveryMethod === option.value}
//                           onChange={(e) => setDeliveryMethod(e.target.value)}
//                           className="mr-3 w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-slate-700">{option.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Fulfillment Method */}
//                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
//                   <div className="flex items-center mb-4">
//                     <label className="text-slate-700 font-semibold mr-2">Fulfillment Method</label>
//                     <HelpCircle className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <div className="space-y-3">
//                     {[
//                       { value: 'batches', label: 'Batches' },
//                       { value: 'single-shipment', label: 'Single Shipment' }
//                     ].map((option) => (
//                       <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-white transition-colors cursor-pointer">
//                         <input
//                           type="radio"
//                           name="fulfillment"
//                           value={option.value}
//                           checked={fulfillmentMethod === option.value}
//                           onChange={(e) => setFulfillmentMethod(e.target.value)}
//                           className="mr-3 w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-slate-700">{option.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Buffer Toggle */}
//                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <label className="text-slate-700 font-semibold mr-2">Add Buffer for Final Delivery</label>
//                       <HelpCircle className="h-4 w-4 text-slate-400" />
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <span className="text-slate-500 text-sm">No</span>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={addBuffer}
//                           onChange={(e) => setAddBuffer(e.target.checked)}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                       </label>
//                       <span className="text-slate-500 text-sm">Yes</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Order Details */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//               <div className="flex items-center mb-6">
//                 <Info className="h-5 w-5 text-blue-600 mr-2" />
//                 <h3 className="text-lg font-bold text-slate-800">Order Details</h3>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-slate-600">Quantity</span>
//                   <span className="font-semibold text-slate-800">{quantity.toLocaleString()} units</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-slate-600">Quality</span>
//                   <span className="font-semibold text-slate-800">Premium</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-slate-600">Price</span>
//                   <span className="font-semibold text-slate-800">${Math.round(pricePerUnit * qualityZone / 50)}-${Math.round(pricePerUnit * qualityZone / 50 * 1.2)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Time to Produce */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//               <div className="flex items-center mb-4">
//                 <Clock className="h-5 w-5 text-orange-600 mr-2" />
//                 <h3 className="text-lg font-bold text-slate-800">Time to Produce</h3>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-bold text-orange-600 mb-1">{timeToProduceWeeks.toFixed(1)}</div>
//                 <div className="text-slate-500">weeks</div>
//               </div>
//             </div>

//             {/* Potential Revenue */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//               <div className="flex items-center mb-4">
//                 <DollarSign className="h-5 w-5 text-green-600 mr-2" />
//                 <h3 className="text-lg font-bold text-slate-800">Potential Revenue</h3>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-green-600">${Math.round(totalRevenue).toLocaleString()}</div>
//               </div>
//             </div>

//             {/* Spending Forecast */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//               <div className="flex items-center mb-6">
//                 <TrendingUp className="h-5 w-5 text-slate-600 mr-2" />
//                 <h3 className="text-lg font-bold text-slate-800">Spending Forecast</h3>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-slate-600">Warehouse</span>
//                   <span className="font-semibold text-slate-800">${Math.round(warehouseCost).toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-slate-600">Factory</span>
//                   <span className="font-semibold text-slate-800">${Math.round(factoryCost).toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-slate-600">Showroom</span>
//                   <span className="font-semibold text-slate-800">${Math.round(showroomCost).toLocaleString()}</span>
//                 </div>
//                 <div className="border-t border-slate-200 pt-3">
//                   <div className="flex justify-between">
//                     <span className="font-semibold text-slate-800">Total</span>
//                     <span className="font-bold text-slate-800">${Math.round(totalSpending).toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Potential Profit */}
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
//               <div className="flex items-center mb-4">
//                 <Target className="h-5 w-5 text-blue-600 mr-2" />
//                 <h3 className="text-lg font-bold text-slate-800">Potential Profit</h3>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-blue-600 mb-2">${Math.round(potentialProfit).toLocaleString()}</div>
//                 <div className="text-slate-600 text-sm">
//                   {((potentialProfit / totalRevenue) * 100).toFixed(1)}% margin
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }