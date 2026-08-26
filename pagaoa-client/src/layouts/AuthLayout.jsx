import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="auth-shell">
      <div className="auth-visual">
        <img
          src="https://images.candymag.com/candy/images/2022/01/24/national-university-ph.jpg"
          alt="National University"
        />
        <div className="auth-visual-copy">
          <p className="kicker">BulldogEx Shop</p>
          <h2>Built for students, by students</h2>
        </div>
      </div>
      <main className="auth-panel">
        <div className="auth-card">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default AuthLayout;
