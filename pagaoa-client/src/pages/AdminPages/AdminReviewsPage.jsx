import { useEffect, useState } from "react";
import Button from "../../components/Button";
import AdminTabs from "../../components/AdminTabs";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../utils/api";

const AdminReviewsPage = () => {
  const { userInfo } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = () =>
    apiRequest("/api/reviews")
      .then(setReviews)
      .catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await apiRequest(`/api/reviews/${editId}`, {
        method: "PUT",
        token: userInfo.token,
        body: { comment },
      });
      setMessage("Review updated");
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
        <h1 className="section-title">Reviews</h1>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        {editId && (
          <form className="form" onSubmit={save} style={{ maxWidth: 520 }}>
            <label htmlFor="review-comment">Edit comment</label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <Button type="submit">Save review</Button>
          </form>
        )}

        <div className="review-list">
          {reviews.map((review) => (
            <article key={review._id} className="review-card">
              <strong>{review.name}</strong> on {review.product?.name}{" "}
              <span className="badge">{review.rating}/5</span>
              <p className="muted">{review.comment}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setEditId(review._id);
                  setComment(review.comment);
                }}
              >
                Edit
              </Button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReviewsPage;
