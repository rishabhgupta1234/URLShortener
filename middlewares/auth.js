const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
	// const authorizationHeaderValue = req.cookies?.token;
	const tokenCookie = req.cookies?.token;
	req.user = null;
	if (!tokenCookie) {
		return next();
	}
	// const token = tokenCookie;
	const user = getUser(tokenCookie);
	req.user = user;
	next();
}

function restrictTo(roles = []) {
	return function (req, res, next) {
		// closure to use roles as an argument
		if (!req.user) return res.redirect("./login");
		if (!roles.includes(req.user.role)) return res.end("UnAuthorized"); // end response here only

		return next(); // go to next middleware or function call
	};
}

// async function restrictToLoggedinUserOnly(req, res, next) {
// 	const userUid = req.cookies?.uid;
// 	if (!userUid) {
// 		console.log("redirect to login page useruid");
// 		return res.redirect("/login");
// 	}
// 	const user = getUser(userUid);
// 	if (!user) {
// 		console.log("redirect to login page user", user);
// 		return res.redirect("/login");
// 	}
// 	req.user = user;
// 	next();
// }
// async function checkAuth(req, res, next) {
// 	const userUid = req.cookies?.uid;
// 	const user = getUser(userUid);
// 	req.user = user;
// 	next();
// }

// module.exports = { restrictToLoggedinUserOnly, checkAuth };
module.exports = { checkForAuthentication, restrictTo };
