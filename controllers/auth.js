const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
	const { email, password } = req.body;

	try{
		let user = await User.findOne({ email });

		if(user){
			return res.status(400).json({
				ok: false,
				msg: "User already exists with that email"
			});
		}

		user = new User( req.body );

		//encrypt password
		const salt = bcrypt.genSaltSync(10);
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//Generate JWT
		const token = await generateJWT(user.id, user.name);
		
		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		});
	} catch(error){
		res.status(500).json({
			ok: false,
			message: "Please contact the administrator",
		});
	}



};

const userLogin = async (req, res = response) => {
    const { email, password } = req.body;

	try {

		const user = await User.findOne({ email });

		if(!user){
			return res.status(400).json({
				ok: false,
				msg: "User and password don't match"
			});
		}

		//compare password
		const validPassword = bcrypt.compareSync(password, user.password);

		if(!validPassword){
			return res.status(400).json({
				ok: false,
				msg: "User and password don't match"
			});
		}

		///Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: "Please contact the administrator",
		});
	}

	// res.json({
	// 	ok: true,
	// 	message: "login",
	// });
};

const renewToken = async (req, res = response) => {
	const { uid, name } = req

	//generate new JWT and return it on this request
	const token = await generateJWT(uid, name);


	res.json({
		ok: true,
		token
	});
};

module.exports = {
	createUser,
	userLogin,
	renewToken,
};
