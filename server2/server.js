var express = require('express');
var app = express();

// Security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Apply security headers
app.use(helmet());

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { reason: 'Too many requests, please try again later.' }
});

// Apply rate limiting to auth endpoints
app.use('/api/auth', limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false , alter : true }).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});

// Create a Server
var server = app.listen(8082, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s", host, port)
})

function initial() {
	Role.create({
		id: 1,
		name: "USER"
	}).then(() => {
		console.log('USER role created successfully');
	}).catch(err => {
		console.error('Failed to create USER role:', err);
	});

	Role.create({
		id: 2,
		name: "AUDITOR"
	}).then(() => {
		console.log('AUDITOR role created successfully');
	}).catch(err => {
		console.error('Failed to create AUDITOR role:', err);
	});

	Role.create({
		id: 3,
		name: "ADMIN"
	}).then(() => {
		console.log('ADMIN role created successfully');
	}).catch(err => {
		console.error('Failed to create ADMIN role:', err);
	});
}

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ reason: 'Internal server error' });
});
