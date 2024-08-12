const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  dishPrice: {
    type: Number,
    required: true,
  },
  dishQuantity: {
    type: Number,
    required: true,
  },
});

const Dish = mongoose.model("Dish", dishesSchema);
module.exports = Dish;
