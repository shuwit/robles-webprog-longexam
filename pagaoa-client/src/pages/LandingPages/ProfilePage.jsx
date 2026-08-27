import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../utils/api";

const ProfilePage = () => {
  const { userInfo, login } = useAuth();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [role, setRole] = useState(userInfo.isAdmin ? "Admin" : "Customer");
  const [isActive, setIsActive] = useState(userInfo.isActive !== false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/api/users/profile", { token: userInfo.token })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setRole(data.isAdmin ? "Admin" : "Customer");
        setIsActive(data.isActive !== false);
        login({ ...userInfo, ...data, token: data.token || userInfo.token });
      })
      .catch((err) => setError(err.message));
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiRequest("/api/users/profile", {
        method: "PUT",
        token: userInfo.token,
        body: { name, email },
      });
      login({ ...userInfo, ...data, token: data.token || userInfo.token });
      setMessage("Profile updated");
    } catch (err) {
      setError(err.message);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiRequest("/api/users/profile/password", {
        method: "PUT",
        token: userInfo.token,
        body: { currentPassword, newPassword },
      });
      setMessage(data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page section">
      <div className="container" style={{ maxWidth: 560 }}>
        <p className="kicker">Account</p>
        <h1 className="section-title">Profile</h1>
        <p className="schema-meta">
          Role: {role} · Status: {isActive ? "Active" : "Inactive"}
        </p>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={saveProfile}>
          <h3>Edit information</h3>
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Save information</Button>
        </form>

        <form className="form" onSubmit={savePassword} style={{ marginTop: 36 }}>
          <h3>Change password</h3>
          <label htmlFor="current">Current password</label>
          <input
            id="current"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label htmlFor="next">New password</label>
          <input
            id="next"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />
          <Button type="submit">Update password</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
