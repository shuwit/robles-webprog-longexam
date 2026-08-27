import { useEffect, useState } from "react";
import Button from "../../components/Button";
import AdminTabs from "../../components/AdminTabs";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../utils/api";

const AdminUsersPage = () => {
  const { userInfo } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const load = () =>
    apiRequest("/api/users", { token: userInfo.token })
      .then(setUsers)
      .catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const save = async (user, changes) => {
    setError("");
    try {
      await apiRequest(`/api/users/${user._id}`, {
        method: "PUT",
        token: userInfo.token,
        body: changes,
      });
      setMessage("User updated");
      setEditId("");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page section">
      <div className="container">
        <AdminTabs />
        <p className="kicker">Admin</p>
        <h1 className="section-title">Manage Users</h1>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        {editId && (
          <form
            className="form"
            style={{ maxWidth: 420 }}
            onSubmit={(e) => {
              e.preventDefault();
              const user = users.find((item) => item._id === editId);
              if (user) save(user, { name, email });
            }}
          >
            <label htmlFor="user-name">Edit name</label>
            <input
              id="user-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="user-email">Edit email</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Save user</Button>
          </form>
        )}

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Customer"}</td>
                <td>
                  <span className="badge">{user.isActive ? "Active" : "Inactive"}</span>
                </td>
                <td>
                  <div className="card-actions">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditId(user._id);
                        setName(user.name);
                        setEmail(user.email);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => save(user, { isActive: !user.isActive })}
                    >
                      {user.isActive ? "Set inactive" : "Set active"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
