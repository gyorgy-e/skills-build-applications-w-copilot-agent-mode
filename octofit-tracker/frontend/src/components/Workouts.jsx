import { useResource } from '../hooks/useResource';

function Workouts() {
  const { items: workouts, error, loading } = useResource('workouts');

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">Error loading workouts: {error}</p>;

  return (
    <section>
      <h1>Workouts</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Duration (min)</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.durationMinutes}</td>
              <td>{workout.exercises?.join(', ') ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Workouts;
