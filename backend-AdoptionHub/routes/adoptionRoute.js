const router = require("express").Router();
const adoptionController = require("../controllers/AdoptController");
const { authGuard } = require("../middleware/authGuard");

router.post("/adopt", adoptionController.adoptAPet);

router.get("/get-my-adoption/:id", adoptionController.getAllAdoptionsByUser);

router.get("/get-all-adoptions", adoptionController.getAllAdoptions);

router.delete("/delete-adoption/:id", adoptionController.deleteRequest);


module.exports = router;
