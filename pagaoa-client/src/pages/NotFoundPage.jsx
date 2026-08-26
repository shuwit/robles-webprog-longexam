import Button from "../components/Button";
import Robot from "../assets/img/robot.png";

const NotFoundPage = () => {
  return (
    <div className="page section">
      <div className="container product-detail">
        <div>
          <p className="kicker">System Error</p>
          <h1 className="section-title">404</h1>
          <h2>Page Not Found</h2>
          <p className="muted">
            The product or page you are looking for is currently unavailable.
          </p>
          <div className="card-actions">
            <Button to="/">Back to Home</Button>
            <Button to="/products" variant="outline">
              View Catalog
            </Button>
          </div>
        </div>
        <img src={Robot} alt="Friendly robot" />
      </div>
    </div>
  );
};

export default NotFoundPage;
