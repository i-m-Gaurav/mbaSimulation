import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
  simulationId: { type: mongoose.Schema.Types.ObjectId, ref: "Simulation" },
  quantity: Number,
  qualityRating: Number,
  pricePerUnit: Number,
  timeToProduceWeeks: Number,
  potentialRevenue: Number,
  spendingForecast: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);

export default OrderDetails;
