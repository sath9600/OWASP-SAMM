const db = require('./app/config/db.config');
const User = db.user;
const bcrypt = require('bcryptjs');

console.log('Starting password update script...');

// Find the User account
console.log('Finding User account...');
User.findOne({
  where: {
    username: 'User'
  }
})
.then(user => {
  if (!user) {
    console.log('User not found');
    process.exit(1);
  }
  
  console.log('User found:');
  console.log(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`);
  
  // Update the password to 'password'
  console.log('Generating new password hash...');
  const newPasswordHash = bcrypt.hashSync('password', 8);
  console.log('New password hash:', newPasswordHash);
  
  console.log('Updating password in database...');
  return user.update({
    password: newPasswordHash
  });
})
.then(() => {
  console.log('Password updated successfully to "password"');
  process.exit(0);
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

console.log('Script execution started...');
