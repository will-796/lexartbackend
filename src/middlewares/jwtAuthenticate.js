const { jwtVerify } = require('../utils/jwt');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação ausente' });
  }

  try {
    const decoded = jwtVerify(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Falha na autenticação do token' });
  }
};

module.exports = authenticateJWT;
