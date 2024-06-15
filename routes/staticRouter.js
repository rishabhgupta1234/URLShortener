const express = require("express");

const router = express.Router();
const URL = require("../models/url");
const { getUser } = require("../service/auth");

router.get("/", async (req, res) => {
	if (!req.user) {
		console.log("redirected to login static", req.cookies?.uid, getUser(req.cookies?.uid));
		return res.redirect("/login");
	}
	const allUrls = await URL.find({ createdBy: req.user._id });
	return res.render("home", {
		urls: allUrls,
	});
});

router.get("/signup", (req, res) => {
	return res.render("signup");
});
router.get("/login", (req, res) => {
	return res.render("login");
});

module.exports = router;
