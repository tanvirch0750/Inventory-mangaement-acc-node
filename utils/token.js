const jwt = require('jsonwebtoken');

exports.generteToken = (userInfo) => {
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: '20d',
  });

  return token;
};
