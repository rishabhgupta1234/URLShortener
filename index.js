const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const connectToMongo = require("./db");
const PORT = 8001;
const URL = require("./models/url");

connectToMongo("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());

app.get("/test", async (req, res) => {
	// return res.end("<h1>This is server side rendering</h1>");
	// return res.end("<h1>It is server side rendering</h1>");

	const allUrls = await URL.find({});
	return res.end(`
	<html>
<head>
</head>
<body>
<ol>
${allUrls.map((url) => `<li> ${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join()}
</ol>
</body>
	</html>
	`);
});

app.use("/url", urlRoute);
// app.use("/url", urlRoute);

app.get("/url/:shortId", async (req, res) => {
	const shortId = req.params.shortId;
	console.log("shortid is ", shortId);
	// const url = await URL.findOne({ shortId: shortId });
	// return res.json(url);

	const entry = await URL.findOneAndUpdate(
		{
			shortId,
		},
		{
			$push: {
				visitHistory: {
					timestamp: Date.now(),
				},
			},
		}
	);
	// res.json(entry);
	// res.redirect(req.params.id, entry.redirectURL.bind(entry));
	res.redirect("https://" + entry.redirectURL);
});

app.listen(PORT, () => {
	console.log("Server started at PORT ", PORT);
});
