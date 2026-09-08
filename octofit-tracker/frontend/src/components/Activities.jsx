import { useResource } from '../hooks/useResource';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const ACTIVITIES_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const { items: activities, error, loading } = useResource(ACTIVITIES_API_URL);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">Error loading activities: {error}</p>;

  return (
    <section>
      <h1>Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories</th>
            <th>Performed at</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.calories ?? '-'}</td>
              <td>{activity.performedAt ? new Date(activity.performedAt).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Activities;
