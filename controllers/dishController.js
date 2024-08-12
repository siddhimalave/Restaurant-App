const Dish = require("../models/Dish");

async function handleGetAllDishes(req, res) {
  const allDishes = await Dish.find({});
  return res.json(allDishes);
}

async function handleGetSpecificDishes(req, res) {
  const dish = await Dish.findById(req.params.id);
  if (!dish) return res.status(404).json({ error: "Dish not found" });
  return res.json(dish);
}

async function handleEditDishes(req, res) {
  const updateData = req.body;
  await Dish.findByIdAndUpdate(req.params.id, updateData);
  return res.json({ status: "success" });
}

async function hanldeDeleteDishes(req, res) {
  await Dish.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleAddDishes(req, res) {
  const { dishName, dishPrice, dishQuantity } = req.body;
  if (!dishName || !dishPrice || !dishQuantity) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await Dish.create({
    dishName,
    dishPrice,
    dishQuantity,
  });
  return res.status(201).json({ msg: "Success", dish: result });
}
module.exports = {
  handleGetAllDishes,
  handleGetSpecificDishes,
  handleEditDishes,
  hanldeDeleteDishes,
  handleAddDishes,
};
