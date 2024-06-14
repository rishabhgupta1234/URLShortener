const express = require("express");
const app = express();
const path = require("path");

const connectToMongo = require("./db");
const PORT = 8001;
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

connectToMongo("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/test", async (req, res) => {
// 	const allUrls = await URL.find({});
// 	return res.render("home", {
// 		urls: allUrls,
// 	});
// });
app.use("/url", urlRoute);
app.use("/user", userRoute);
// app.use("/url", urlRoute);
app.use("/", staticRoute);

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
	// res.redirect("https://" + entry.redirectURL);
	res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
	console.log("Server started at PORT ", PORT);
});
