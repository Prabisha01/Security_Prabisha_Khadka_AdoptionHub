const router = require("express").Router();
const storyController = require("../controllers/storyController");
router.post("/create-story", storyController.createStory);

router.get("/get-my-story/:id", storyController.getSingleStory);

router.get("/get-all-storys", storyController.getAllStory);

router.delete("/delete-story/:id", storyController.deleteStory);

module.exports = router;
