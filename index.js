const express = require("express");
const mongoose = require("mongoose");
const app = express();
const customerRouter = require("./routes/customerRoutes");
const dishesRouter = require("./routes/dishRoutes");
const orderRouter = require("./routes/orderRoutes");

const PORT = 8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB Connection
const MONGO_URL =
  "mongodb+srv://sammalave16:l6tgJ97g8iIClodk@cluster0.w47tp.mongodb.net/resto-app";

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to database ${mongoose.connection.host}`);
  } catch (error) {
    console.log("Db error", error);
  }
};

connectDb();

const Customer = require("./models/Customer");

// Routes

// Dishes Routes
app.use("/dishes", dishesRouter);
// Customers Routes

app.use("/customer", customerRouter);
// Orders Routes

app.use("/orders", orderRouter);

app.get("/api/customers/:customerId/orders", async (req, res) => {
  const orders = await Order.find({
    customerId: req.params.customerId,
  }).populate("items.dishId");
  return res.json(orders);
});

// Billing Routes
app.get("/api/customers/:customerId/billing", async (req, res) => {
  const customer = await Customer.findById(req.params.customerId).populate(
    "orders"
  );
  if (!customer) return res.status(404).json({ error: "Customer not found" });

  const billingDetails = customer.orders.map((order) => {
    return {
      orderId: order._id,
      totalPrice: order.totalPrice,
      orderDate: order.orderDate,
      items: order.items.map((item) => ({
        dishName: item.dishId.dishName,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  });

  return res.json({ customerName: customer.name, billingDetails });
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
