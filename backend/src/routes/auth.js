const express = require('express');
const rateLimit = require('express-rate-limit');
const aafClient = require('../services/aafClient');

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT_MAX || 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      status: 429,
      message: 'Too many authentication requests. Please try again later.',
    },
  },
});

const toErrorResponse = (error) => ({
  message: error.response?.data?.message || error.message || 'AAF request failed',
  status: error.response?.status || 500,
  details: error.response?.data || null,
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const response = await aafClient.login(req.body);
    res.json(response.data);
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

router.get('/token', authLimiter, async (_req, res) => {
  try {
    const accessToken = await aafClient.getAccessToken();
    res.json({ accessToken });
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

module.exports = router;
