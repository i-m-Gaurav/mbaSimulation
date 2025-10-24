import OrderDetails from "../models/orderDetails.js";

export const createOrderDetails = async (req, res) => {
  try {
    const payload = req.body || {};
    const order = new OrderDetails(payload);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving order details", error: error.message });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderDetails.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order details", error: error.message });
  }
};
