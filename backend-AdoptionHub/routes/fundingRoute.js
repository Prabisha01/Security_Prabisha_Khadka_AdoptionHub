const router = require("express").Router();
const fundingController = require("../controllers/fundingController");
const { authGuard, authGuardAdmin } = require("../middleware/authGuard");

// create Order
router.post("/add-fund",authGuard, fundingController.addFunding);

//get Order
router.get("/get-fund/:id",authGuard, fundingController.getSingleFunding);

//getAllOder
//get all blog API
router.get("/get-all-funds",authGuardAdmin,  fundingController.getAllFunding);

module.exports = router;
