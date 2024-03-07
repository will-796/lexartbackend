const jwt = require('jsonwebtoken')

const createToken = (user) => {
  const jwt = require('jsonwebtoken');
  const secret = process.env.JWTSECRET 
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
}

const jwtVerify = (token) => {
  const secret = process.env.JWTSECRET
  const decoded = jwt.verify(token, secret);
  return decoded;
}

module.exports = {
  createToken,
  jwtVerify,
}