import { useResource } from '../hooks/useResource';

function Users() {
  const { items: users, error, loading } = useResource('users');

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">Error loading users: {error}</p>;

  return (
    <section>
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Display name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Users;
