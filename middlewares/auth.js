const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
	const userUid = req.cookies?.uid;
	if (!userUid) {
		console.log("redirect to login page useruid");
		return res.redirect("/login");
	}
	const user = getUser(userUid);
	if (!user) {
		console.log("redirect to login page user", user);
		return res.redirect("/login");
	}
	req.user = user;
	next();
}
async function checkAuth(req, res, next) {
	const userUid = req.cookies?.uid;
	const user = getUser(userUid);
	req.user = user;
	next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
