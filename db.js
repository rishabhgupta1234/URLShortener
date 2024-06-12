const mongoose = require("mongoose");

// const mongoURI = "mongodb://127.0.0.1:27017/youtube-app-1";

const connectToMongo = (mongoURI) => {
	mongoose
		.connect(mongoURI)
		.then(() => {
			console.log("Connected to Mongoose Successfully");
		})
		.catch(() => {
			console.log("ERROR occurred while connecting to Mongo DB");
		});
};

module.exports = connectToMongo;
