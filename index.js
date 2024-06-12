const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const connectToMongo = require("./db");
const PORT = 8001;
const URL = require("./models/url");

connectToMongo("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());

app.use("/url", urlRoute);
// app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
	const shortId = req.params.shortId;
	console.log("id is ", shortId);
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
	res.json(entry);
});

app.listen(PORT, () => {
	console.log("Server started at PORT ", PORT);
});
