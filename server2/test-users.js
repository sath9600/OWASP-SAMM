const db = require('./app/config/db.config');
const User = db.user;

// Query all users
User.findAll()
  .then(users => {
    console.log('All users:');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Role: ${user.role}`);
    });
    process.exit(0);
  })
  .catch(err => {
    console.error('Error querying users:', err);
    process.exit(1);
  });
