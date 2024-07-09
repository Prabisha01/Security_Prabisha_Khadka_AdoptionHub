const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { authGuard } = require("../middleware/authGuard");

// create Order
router.post("/createOrder", authGuard, orderController.createOrder);

//get Order
router.get("/getOrder/:id", authGuard, orderController.getOrder);

//getAllOder
//get all blog API
router.get("/get_orders", orderController.getAllOrder);

module.exports = router;
