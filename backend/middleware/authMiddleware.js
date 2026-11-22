const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'v1st_nutrition_secret_jwt_key_surat_2026');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token is expired or invalid' });
  }
};

module.exports = authMiddleware;
