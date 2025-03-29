const db = require('./app/config/db.config');
const User = db.user;
const bcrypt = require('bcryptjs');

console.error('Starting test-password.js script...');

// Find the User account
User.findOne({
  where: {
    username: 'User'
  }
})
.then(user => {
  if (!user) {
    console.error('User not found');
    process.exit(1);
  }
  
  console.error('User found:');
  console.error(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`);
  console.error('Password hash:', user.password);
  
  // Test some common passwords
  const testPasswords = ['password', 'User', 'user', '123456', 'admin', 'samm'];
  
  testPasswords.forEach(testPassword => {
    const isValid = bcrypt.compareSync(testPassword, user.password);
    console.error(`Password "${testPassword}" is ${isValid ? 'valid' : 'invalid'}`);
  });
  
  process.exit(0);
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

console.error('Script execution started...');
