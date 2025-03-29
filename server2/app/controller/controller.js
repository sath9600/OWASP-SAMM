const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Input validation
	if (!req.body.username || !req.body.password || !req.body.email) {
		return res.status(400).send({ reason: 'Username, password, and email are required fields.' });
	}
	
	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(req.body.email)) {
		return res.status(400).send({ reason: 'Invalid email format.' });
	}
	
	// Validate password strength
	if (req.body.password.length < 8) {
		return res.status(400).send({ reason: 'Password must be at least 8 characters long.' });
	}
	
	// Save User to Database
	User.create({
		name: req.body.name,
		lname: req.body.lname,
		username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Role.findAll({
			where: {
				name: {
					[Op.or]: req.body.roles
				}
			}
		}).then(roles => {
			user.setRoles(roles).then(() => {
				res.send({ message: 'Registered successfully!' });
			});
		}).catch(err => {
			res.status(500).send({ reason: err.message });
		});
	}).catch(err => {
		res.status(500).send({ reason: err.message });
	})
}

exports.signin = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send({ reason: 'User Not Found.' });
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalid UserName or Password!' });
		}

		var token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 3600 // expires in 1 hour
		});

		var authorities = [];
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				authorities.push('ROLE_' + roles[i].name.toUpperCase());
			}
			res.status(200).send({
				auth: true,
				accessToken: token,
				username: user.username,
				authorities: authorities
			});
		})
	}).catch(err => {
		res.status(500).send({ reason: err.message });
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name','lname','username', 'email','role','mobile','createdAt','updatedAt','country','groupname','company','empid'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).send({
			'description': '>>> User Contents!',
			'user': user
		});
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not access User Page',
			'error': err
		});
	})
}

exports.adminBoard = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).send({
			'description': '>>> Admin Contents',
			'user': user
		});
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not access Admin Board',
			'error': err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).send({
			'description': '>>> Project Management Board',
			'user': user
		});
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not access Management Board',
			'error': err
		});
	})
}
