const { rateLimit } = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 500,
  limit: 10,
  message: { message: 'Too many requests from this IP' }
});