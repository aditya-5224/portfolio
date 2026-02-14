const jwt = require('jsonwebtoken');

// Generate a test JWT token
const generateToken = (payload = { admin: true }, expiresIn = '7d') => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

// Usage: node src/utils/tokenGenerator.js
if (require.main === module) {
  const token = generateToken({ admin: true });
  console.log('\n✓ Generated JWT Token (valid for 7 days):');
  console.log(token);
  console.log('\n✓ Use this token in Postman:');
  console.log('Headers: Authorization: Bearer ' + token);
}

module.exports = generateToken;
