const express = require("express");

const router = express.Router();
const { handleGenerateNewShortURL, handleRedirectURL, handleGetAnalytics } = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
// router.get("/:id", handleRedirectURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
