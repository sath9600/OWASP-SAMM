module.exports = {
  'secret': process.env.JWT_SECRET || 'samm-secure-jwt-secret-key-' + Math.random().toString(36).substring(2, 15),
  ROLEs: ['USER', 'ADMIN', 'AUDITOR']
};
