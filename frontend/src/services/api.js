import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  timeout: 15000,
});

export const login = (payload) => api.post('/auth/login', payload);
export const fetchEvents = () => api.get('/reports/events');
export const fetchUsers = () => api.get('/reports/users');
export const fetchPolicies = () => api.get('/reports/policies');
export const fetchAuditLogs = () => api.get('/reports/audit-logs');

export default api;
