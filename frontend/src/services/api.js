import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

export const login = (payload) => api.post('/auth/login', payload);
export const fetchEvents = () => api.get('/reports/events');
export const fetchUsers = () => api.get('/reports/users');
export const fetchPolicies = () => api.get('/reports/policies');
export const fetchAuditLogs = () => api.get('/reports/audit-logs');

export default api;
