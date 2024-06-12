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
	});
	return res.json({ id: shortID });
}

async function handleRedirectURL(req, res) {
	const id = req.params.id;
	const url = await URL.findById(id);
	return res.json(url);
}

async function handleGetAnalytics(req, res) {
	const shortId = req.params.shortId;
	const result = await URL.findOne({ shortId });
	return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = { handleGenerateNewShortURL, handleRedirectURL, handleGetAnalytics };
