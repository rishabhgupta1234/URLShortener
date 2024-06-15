const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
	const body = req.body;
	console.log("url is ", body.url);
	if (!body.url) {
		return res.status(400).json({ error: "url is required" });
	}
	const shortID = shortid.generate();

	await URL.create({
		shortId: shortID,
		redirectURL: body.url,
		visitHistory: [],
		createdBy: req.user._id,
	});
	// return res.json({ id: shortID });
	return res.render("home", {
		// only generate url is visible,not list of all urls
		id: shortID,
	});
}

async function handleGetAnalytics(req, res) {
	const shortId = req.params.shortId;
	const result = await URL.findOne({ shortId });
	return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
