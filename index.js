require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
// const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const connectToMongo = require("./db");
const PORT = process.env.PORT || 8003;
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

connectToMongo(process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthentication);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
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

	res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
	console.log("Server started at PORT ", PORT);
});
