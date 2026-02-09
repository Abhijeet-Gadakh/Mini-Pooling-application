const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");

router.get("/", pollController.getActivePolls);
router.get("/:id", pollController.getPollDetails);
router.post("/", pollController.createPoll);
router.post("/:id/vote", pollController.votePoll);
router.get("/:id/results", pollController.getResults);

module.exports = router;
