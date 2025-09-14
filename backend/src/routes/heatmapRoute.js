const express = require("express");
const heatmapController = require("../controllers/heatmapController")
const router = express.Router();

router.get("/api/submissions/:username", heatmapController.FetchHeatmap);

module.exports = router;