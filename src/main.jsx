import ReactDOM from "react-dom/client";
import AZReviews from "./components/AZReviews.jsx";
import "./az_reviews.css";

ReactDOM.createRoot(document.getElementById("az-reviews-container")).render(
  <div className="az-reviews-container">
    <AZReviews />
  </div>
);
