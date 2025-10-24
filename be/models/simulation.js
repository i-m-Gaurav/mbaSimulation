import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
  quantity: Number,
  qualityRating: Number,
  pricePerUnit: Number,
  additionalOption: String,
  deliveryMethod: String,
  fulfillmentMethod: String,
  addBuffer: Boolean,
});

const simulationSchema = new mongoose.Schema({
  warehouseData: { type: warehouseSchema, default: {} },
  factoryData: { type: mongoose.Schema.Types.Mixed, default: {} },
  extraAdditions: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

simulationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Simulation = mongoose.model("Simulation", simulationSchema);

export default Simulation;
