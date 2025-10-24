import Simulation from "../models/simulation.js";

export const createSimulation = async (req, res) => {
  try {
    const payload = {};
    if (req.body && req.body.warehouseData)
      payload.warehouseData = req.body.warehouseData;
    const sim = new Simulation(payload);
    await sim.save();
    res.status(201).json(sim);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating simulation", error: error.message });
  }
};

export const updateSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const update = {};
    if (req.body.warehouseData) update.warehouseData = req.body.warehouseData;
    if (req.body.factoryData) update.factoryData = req.body.factoryData;
    if (req.body.extraAdditions)
      update.extraAdditions = req.body.extraAdditions;
    update.updatedAt = Date.now();

    const sim = await Simulation.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
    if (!sim) return res.status(404).json({ message: "Simulation not found" });
    res.json(sim);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating simulation", error: error.message });
  }
};

export const getSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const sim = await Simulation.findById(id);
    if (!sim) return res.status(404).json({ message: "Simulation not found" });
    res.json(sim);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching simulation", error: error.message });
  }
};
