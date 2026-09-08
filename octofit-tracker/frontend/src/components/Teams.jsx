import { useResource } from '../hooks/useResource';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const TEAMS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const { items: teams, error, loading } = useResource(TEAMS_API_URL);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">Error loading teams: {error}</p>;

  return (
    <section>
      <h1>Teams</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.description}</td>
              <td>{team.memberIds?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Teams;
