const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Dish = require("../models/Dish");

async function hanldeNewOrder(req, res) {
  const { customerId, items } = req.body;

  if (!customerId || !items || items.length === 0) {
    return res.status(400).json({ msg: "Customer and items are required" });
  }

  let totalPrice = 0;
  for (let item of items) {
    const dish = await Dish.findById(item.dishId);
    if (!dish)
      return res.status(404).json({ error: `Dish ${item.dishId} not found ` });

    if (dish.dishQuantity < item.quantity) {
      return res
        .status(400)
        .json({ error: `Insufficient quantity for ${dish.dishName}` });
    }

    dish.dishQuantity -= item.quantity;
    await dish.save();

    item.price = dish.dishPrice;
    totalPrice += item.quantity * dish.dishPrice;
  }

  const order = await Order.create({
    customerId,
    items,
    totalPrice,
  });

  await Customer.findByIdAndUpdate(customerId, {
    $push: { orders: order._id },
  });

  return res.status(201).json({ msg: "Order placed successfully", order });
}

module.exports = { hanldeNewOrder };
