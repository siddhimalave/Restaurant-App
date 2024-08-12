const express = require("express");
const router = express.Router();
const { hanldeNewOrder } = require("../controllers/orderController");

router.post("/", hanldeNewOrder);

module.exports = router;
