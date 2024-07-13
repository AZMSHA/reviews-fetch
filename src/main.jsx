import ReactDOM from "react-dom/client";
import GoogleReviews from "./GoogleReviews.jsx";
import TrustpilotReviews from "./TrustpilotReviews.jsx";
import "./App.scss";

const rootElements = {
  google: document.getElementById("googleReviewsContainer"),
  trustpilot: document.getElementById("trustpilotReviewsContainer"),
};

const roots = {
  google: ReactDOM.createRoot(rootElements.google),
  trustpilot: ReactDOM.createRoot(rootElements.trustpilot),
};

roots.google.render(<GoogleReviews />);
roots.trustpilot.render(<TrustpilotReviews />);
