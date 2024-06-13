const mongoose = require("mongoose");

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
