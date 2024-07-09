const router = require("express").Router();
const applicationController = require("../controllers/application.Controller");
const { authGuard } = require("../middleware/authGuard");

// create Order
router.post("/create-application", applicationController.createApplication);

//get Order
router.get("/get-applications/:id", applicationController.getApplications);

//getAllOder
//get all blog API
router.get("/get_applications", applicationController.getApplications);

module.exports = router;
