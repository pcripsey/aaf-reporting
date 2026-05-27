import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import ReportTable from './components/ReportTable';
import { fetchEvents, fetchPolicies, fetchUsers, login } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);

  const summary = useMemo(
    () => ({
      totalAuthentications: events.length,
      failures: events.filter((event) => String(event.status || '').toLowerCase() === 'failed').length,
      activeUsers: users.length,
      policies: policies.length,
    }),
    [events, users, policies],
  );

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [eventsResponse, usersResponse, policiesResponse] = await Promise.all([fetchEvents(), fetchUsers(), fetchPolicies()]);
      setEvents(eventsResponse.data.items || eventsResponse.data || []);
      setUsers(usersResponse.data.items || usersResponse.data || []);
      setPolicies(policiesResponse.data.items || policiesResponse.data || []);
    } catch (requestError) {
      setError(requestError.response?.data?.error?.message || requestError.message || 'Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (credentials) => {
    setAuthLoading(true);
    setError('');
    try {
      await login(credentials);
      setIsAuthenticated(true);
    } catch (requestError) {
      setError(requestError.response?.data?.error?.message || requestError.message || 'Login failed');
    } finally {
      setAuthLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main>
        {error && <p role="alert">{error}</p>}
        <LoginForm loading={authLoading} onSubmit={handleLogin} />
      </main>
    );
  }

  return (
    <BrowserRouter>
      <main>
        <h1>AAF Reporting</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link> | <Link to="/reports">Reports</Link>
        </nav>
        {error && <p role="alert">{error}</p>}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard summary={summary} loading={loading} error={error} />} />
          <Route path="/reports" element={<ReportTable rows={events} loading={loading} error={error} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
