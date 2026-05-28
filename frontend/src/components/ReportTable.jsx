function ReportTable({ rows, loading, error }) {
  if (loading) {
    return <p>Loading report...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Event type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan="4">No data available</td>
          </tr>
        ) : (
          rows.map((row, index) => (
            <tr key={`${row.user || 'unknown'}-${index}`}>
              <td>{row.date || '-'}</td>
              <td>{row.user || '-'}</td>
              <td>{row.eventType || '-'}</td>
              <td>{row.status || '-'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ReportTable;
