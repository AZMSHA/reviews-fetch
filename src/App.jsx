import GoogleReviews from "./components/GoogleReviews.jsx";
import TrustpilotReviews from "./components/TrustpilotReviews.jsx";
import "./App.scss";
import "swiper/css/bundle";

export default function App() {
  return (
    <>
      <div className="google-reviews-container">
        <GoogleReviews />
      </div>
      <div className="trustpilot-reviews-container">
        <TrustpilotReviews />
      </div>
    </>
  );
}
