const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function (app) {

	const controller = require('../controller/controller.js');

	app.use(function (req, res, next) {
		// Restrict CORS to specific origins
		const allowedOrigins = ['http://localhost:4208', 'http://localhost:4200'];
		const origin = req.headers.origin;
		if (allowedOrigins.includes(origin)) {
			res.header("Access-Control-Allow-Origin", origin);
		}
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		res.header("Access-Control-Allow-Credentials", "true");
		next();
	});

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

	app.post('/api/auth/signin', controller.signin);

	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

	app.get('/api/test/auditor', [authJwt.verifyToken, authJwt.isauditorOrAdmin], controller.managementBoard);

  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}
