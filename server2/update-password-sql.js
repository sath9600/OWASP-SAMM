const db = require('./app/config/db.config');
const bcrypt = require('bcryptjs');

console.log('Starting password update script with direct SQL...');

// Generate a new password hash
const newPasswordHash = bcrypt.hashSync('password', 8);
console.log('New password hash:', newPasswordHash);

// Update the password using direct SQL
const query = `UPDATE users SET password = ? WHERE username = 'User'`;

db.sequelize.query(query, {
  replacements: [newPasswordHash],
  type: db.sequelize.QueryTypes.UPDATE
})
.then(result => {
  console.log('SQL query executed. Result:', result);
  console.log('Password updated successfully to "password"');
  process.exit(0);
})
.catch(err => {
  console.error('Error executing SQL query:', err);
  process.exit(1);
});

console.log('Script execution started...');
