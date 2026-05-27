const express = require('express');
const aafClient = require('../services/aafClient');

const router = express.Router();

const toErrorResponse = (error) => ({
  message: error.response?.data?.message || error.message || 'AAF request failed',
  status: error.response?.status || 500,
  details: error.response?.data || null,
});

router.post('/login', async (req, res) => {
  try {
    const response = await aafClient.login(req.body);
    res.json(response.data);
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

router.get('/token', async (_req, res) => {
  try {
    const accessToken = await aafClient.getAccessToken();
    res.json({ accessToken });
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

module.exports = router;
