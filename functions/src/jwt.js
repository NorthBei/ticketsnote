const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY not found');
}

const secretKey = process.env.JWT_SECRET_KEY;

function signToken(data, date) {
  let tokenExpireTime = date ? date : new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  let token = jwt.sign(
    {
      exp: tokenExpireTime.getTime() / 1000,
      data
    },
    secretKey
  );
  return { token, tokenExpireTime };
}

function verifyToken(token, ignoreExpiration = false) {
  let decode = jwt.verify(token, secretKey, { ignoreExpiration });
  return decode.data;
}

module.exports = {
  signToken,
  verifyToken,
  JsonWebTokenError: jwt.JsonWebTokenError,
  NotBeforeError: jwt.NotBeforeError,
  TokenExpiredError: jwt.TokenExpiredError
};
