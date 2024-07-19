const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { authGuard } = require("../middleware/authGuard");

// create Order
router.post("/createOrder", orderController.createOrder);

//get Order
router.get("/getOrder/:id", orderController.getMyOrder);

//getAllOder
//get all blog API
router.get("/get_all_orders", orderController.getAllOrder);

module.exports = router;
