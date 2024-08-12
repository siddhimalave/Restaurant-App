const Customer = require("../models/Customer");

async function handleGetAllCustomers(req, res) {
  const customers = await Customer.find({});
  return res.json(customers);
}

async function handleGetSpecificCustomers(req, res) {
  const customer = await Customer.findById(req.params.id).populate("orders");
  if (!customer) return res.status(404).json({ error: "Customer not found" });
  return res.json(customer);
}

async function handleEditCustomers(req, res) {
  const updateData = req.body;
  await Customer.findByIdAndUpdate(req.params.id, updateData);
  return res.json({ status: "success" });
}

async function handleDeleteCustomers(req, res) {
  await Customer.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleAddCustomers(req, res) {
  const { name, email, phone, address } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ msg: "Name, Email, and Phone are required" });
  }
  const customer = await Customer.create({ name, email, phone, address });
  return res.status(201).json({ msg: "Customer added", customer });
}
module.exports = {
  handleGetAllCustomers,
  handleGetSpecificCustomers,
  handleEditCustomers,
  handleDeleteCustomers,
  handleAddCustomers,
};
