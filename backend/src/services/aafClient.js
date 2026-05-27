const axios = require('axios');

class AafClient {
  constructor() {
    this.baseURL = process.env.AAF_BASE_URL;
    this.username = process.env.AAF_USERNAME;
    this.password = process.env.AAF_PASSWORD;
    this.clientId = process.env.AAF_CLIENT_ID;
    this.clientSecret = process.env.AAF_CLIENT_SECRET;
    this.tokenPath = process.env.AAF_TOKEN_PATH || '/oauth/token';

    this.http = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
    });

    this.accessToken = null;
    this.tokenExpiry = 0;
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const params = new URLSearchParams({
      grant_type: 'password',
      username: this.username || '',
      password: this.password || '',
      client_id: this.clientId || '',
      client_secret: this.clientSecret || '',
    });

    const response = await this.http.post(this.tokenPath, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.accessToken = response.data.access_token;
    const expiresIn = Number(response.data.expires_in || 300);
    this.tokenExpiry = Date.now() + Math.max(expiresIn - 30, 30) * 1000;

    return this.accessToken;
  }

  async request(config) {
    const token = await this.getAccessToken();
    return this.http.request({
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: 'Bearer '.concat(token),
      },
    });
  }

  async login(credentials) {
    return this.request({
      method: 'POST',
      url: '/api/v1/auth/login',
      data: credentials,
    });
  }

  async getAuthenticationEvents() {
    return this.request({ method: 'GET', url: '/api/v1/reports/authentication-events' });
  }

  async getUserReports() {
    return this.request({ method: 'GET', url: '/api/v1/reports/users' });
  }

  async getPolicyReports() {
    return this.request({ method: 'GET', url: '/api/v1/reports/policies' });
  }

  async getAuditLogs() {
    return this.request({ method: 'GET', url: '/api/v1/reports/audit-logs' });
  }
}

module.exports = new AafClient();
