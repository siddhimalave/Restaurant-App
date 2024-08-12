const express = require("express");
const router = express.Router();
const {
  handleGetAllDishes,
  handleGetSpecificDishes,
  handleEditDishes,
  hanldeDeleteDishes,
  handleAddDishes,
} = require("../controllers/dishController");
router
  .route("/:id")
  .get(handleGetSpecificDishes)
  .patch(handleEditDishes)
  .delete(hanldeDeleteDishes);

router.post("/", handleAddDishes);

router.get("/", handleGetAllDishes);

module.exports = router;
