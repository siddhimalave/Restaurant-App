const express = require("express");
const router = express.Router();
const {
  handleGetAllCustomers,
  handleGetSpecificCustomers,
  handleEditCustomers,
  handleDeleteCustomers,
  handleAddCustomers,
} = require("../controllers/customerController");
router.route("/").post(handleAddCustomers).get(handleGetAllCustomers);

router
  .route("/:id")
  .get(handleGetSpecificCustomers)
  .put(handleEditCustomers)
  .delete(handleDeleteCustomers);

module.exports = router;
