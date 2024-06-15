// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Rishabh$$Gupta%%";

function setUser(user) {
	// sessionIdToUserMap.set(id, user);
	const payload = {
		_id: user._id,
		email: user.email,
	};

	return jwt.sign(payload, secret);
}
function getUser(token) {
	// return sessionIdToUserMap.get(id);

	if (!token) {
		return null;
	}
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return null;
	}
}
module.exports = { setUser, getUser };
