function Dashboard({ summary, loading, error }) {
  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px' }}>
        <article><h3>Total authentications</h3><p>{summary.totalAuthentications}</p></article>
        <article><h3>Failures</h3><p>{summary.failures}</p></article>
        <article><h3>Active users</h3><p>{summary.activeUsers}</p></article>
        <article><h3>Policies</h3><p>{summary.policies}</p></article>
      </div>
    </section>
  );
}

export default Dashboard;
