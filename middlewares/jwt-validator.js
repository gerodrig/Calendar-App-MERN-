const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
	//x-token headers
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No token provided",
		});
	}

	try {
		const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
		req.uid = uid;
        req.name = name;
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "Token invalid",
		});
	}
};

module.exports = {
	validateJWT,
};
