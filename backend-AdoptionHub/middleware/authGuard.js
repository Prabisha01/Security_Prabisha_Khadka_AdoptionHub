const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
  // Get header authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header not found!',
    });
  }

  // Get token by splitting the header
  // Format = 'Bearer tokenxyfghjhgfdfghg'
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token not found!',
    });
  }

  try {
    // Verify token
    const decodeUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid Token',
    });
  }
};

const authGuardAdmin = (req, res, next) => {
  // Get header authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header not found!',
    });
  }

  // Get token by splitting the header
  // Format = 'Bearer tokenxyfghjhgfdfghg'
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token not found!',
    });
  }

  try {
    // Verify token
    const decodeUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUser;

    // Check if the user is admin or not
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Permission denied',
      });
    }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid Token',
    });
  }
};

module.exports = { authGuard, authGuardAdmin };
