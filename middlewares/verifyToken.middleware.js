/**
 * 1. Check if token exists
 * 2. If not token send res
 * 3. Decode the token
 * 4. If valid next
 */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')?.[1];

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        error: 'You are not logged in',
      });
    }

    // promisify we can not use await in jwt.verify
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_TOKEN
    );

    // to get all user info
    // const user = User.findOne({email: decoded.email})

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      error: 'Invalid token',
    });
  }
};
