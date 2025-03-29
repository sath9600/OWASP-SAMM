const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Check Username is already in use
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (user) {
			res.status(400).send({ reason: "Username is already taken!" });
			return;
		}

		// -> Check Email is already in use
		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if (user) {
				res.status(400).send({ reason: "Email is already in use!" });
				return;
			}

			next();
		}).catch(err => {
			res.status(500).send({ reason: "Error checking email: " + err.message });
		});
	}).catch(err => {
		res.status(500).send({ reason: "Error checking username: " + err.message });
	});
}

checkRolesExisted = (req, res, next) => {
	// Check if roles array exists
	if (!req.body.roles || !Array.isArray(req.body.roles)) {
		// Default to USER role if not specified
		req.body.roles = ['USER'];
		next();
		return;
	}
	
	for (let i = 0; i < req.body.roles.length; i++) {
		if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
			res.status(400).send({ reason: "Invalid role: " + req.body.roles[i] });
			return;
		}
	}
	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;
