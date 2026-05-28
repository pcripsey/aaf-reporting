require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.set('trust proxy', 1); // Trust the first proxy (nginx)

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({
    error: {
      status: 500,
      message: err.message || 'Internal server error',
    },
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on ${PORT}`);
});
