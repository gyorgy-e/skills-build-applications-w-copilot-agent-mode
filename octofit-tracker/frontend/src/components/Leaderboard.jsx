import { useResource } from '../hooks/useResource';

function Leaderboard() {
  const { items: entries, error, loading } = useResource('leaderboard');

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">Error loading leaderboard: {error}</p>;

  const sorted = [...entries].sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

  return (
    <section>
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Points</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank ?? '-'}</td>
              <td>{entry.points}</td>
              <td>{entry.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Leaderboard;
