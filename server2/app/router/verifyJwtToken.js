const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (!token){
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(401).send({
					auth: false,
					message: 'Unauthorized. Invalid token.'
				});
		}
		req.userId = decoded.id;
		next();
	});
}

isAdmin = (req, res, next) => {
	User.findByPk(req.userId)
		.then(user => {
			if (!user) {
				return res.status(404).send({ message: "User not found." });
			}
			
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require Admin Role!" });
				return;
			}).catch(err => {
				res.status(500).send({ message: "Error retrieving roles: " + err.message });
			});
		}).catch(err => {
			res.status(500).send({ message: "Error retrieving user: " + err.message });
		});
}

isauditorOrAdmin = (req, res, next) => {
	User.findByPk(req.userId)
		.then(user => {
			if (!user) {
				return res.status(404).send({ message: "User not found." });
			}
			
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					if(roles[i].name.toUpperCase() === "AUDITOR" || roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require Auditor or Admin Roles!" });
			}).catch(err => {
				res.status(500).send({ message: "Error retrieving roles: " + err.message });
			});
		}).catch(err => {
			res.status(500).send({ message: "Error retrieving user: " + err.message });
		});
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isauditorOrAdmin = isauditorOrAdmin;

module.exports = authJwt;
