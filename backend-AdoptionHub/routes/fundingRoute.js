const router = require("express").Router();
const fundingController = require("../controllers/fundingController");

// create Order
router.post("/add-fund", fundingController.addFunding);

//get Order
router.get("/get-fund/:id", fundingController.getSingleFunding);

//getAllOder
//get all blog API
router.get("/get-all-funds", fundingController.getAllFunding);

module.exports = router;
