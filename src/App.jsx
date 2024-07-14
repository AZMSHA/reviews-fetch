import GoogleReviews from "./components/GoogleReviews.jsx";
import TrustpilotReviews from "./components/TrustpilotReviews.jsx";
import "./assets/css/bootstrap.min.css";
import "./App.scss";

export default function App() {
  return (
    <>
      <div className="container py-5">
        <GoogleReviews />
      </div>
      <div className="container py-5">
        <TrustpilotReviews />
      </div>
    </>
  );
}
