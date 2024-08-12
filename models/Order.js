const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    require: true,
  },
  items: [
    {
      dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    require: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Order = mongoose.model("Order", ordersSchema);
module.exports = Order;
