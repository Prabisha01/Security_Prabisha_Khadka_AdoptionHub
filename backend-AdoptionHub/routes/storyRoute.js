const router = require("express").Router();
const storyController = require("../controllers/storyController");
const { authGuard, authGuardAdmin } = require("../middleware/authGuard");
router.post("/create-story", authGuard, storyController.createStory);

router.get("/get-my-story/:id", storyController.getSingleStory);

router.get("/get-all-storys", storyController.getAllStory);

router.delete("/delete-story/:id", authGuardAdmin, storyController.deleteStory);

module.exports = router;
