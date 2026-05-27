const express = require('express');
const aafClient = require('../services/aafClient');

const router = express.Router();

const toErrorResponse = (error) => ({
  message: error.response?.data?.message || error.message || 'AAF request failed',
  status: error.response?.status || 500,
  details: error.response?.data || null,
});

router.get('/events', async (_req, res) => {
  try {
    const response = await aafClient.getAuthenticationEvents();
    res.json(response.data);
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

router.get('/users', async (_req, res) => {
  try {
    const response = await aafClient.getUserReports();
    res.json(response.data);
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

router.get('/policies', async (_req, res) => {
  try {
    const response = await aafClient.getPolicyReports();
    res.json(response.data);
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

router.get('/audit-logs', async (_req, res) => {
  try {
    const response = await aafClient.getAuditLogs();
    res.json(response.data);
  } catch (error) {
    const err = toErrorResponse(error);
    res.status(err.status).json({ error: err });
  }
});

module.exports = router;
