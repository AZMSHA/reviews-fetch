import { useReducer, useEffect } from "react";
import "./App.scss";

function reducer(state, action) {
  switch (action.type) {
    case "setGoogleReviews":
      return { ...state, googleReviews: action.payload };
    case "setTrustPilotReviews":
      return { ...state, trustPilotReviews: action.payload };
    case "setBoth":
      return {
        ...state,
        googleReviews: action.payload.googleReviews,
        trustPilotReviews: action.payload.trustPilotReviews,
      };
    default:
      throw new Error();
  }
}

function App() {
  const [reviews, setReviews] = useReducer(reducer, {
    googleReviews: [],
    trustPilotReviews: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const googleReviewsUrl = "/google-reviews.json";
      const trustPilotReviewsUrl = "/trustpilot-reviews.json";

      try {
        const [googleRes, trustPilotRes] = await Promise.all([
          fetch(googleReviewsUrl),
          fetch(trustPilotReviewsUrl),
        ]);

        const googleReviews = await googleRes.json();
        const trustPilotReviews = await trustPilotRes.json();

        setReviews({
          type: "setBoth",
          payload: { googleReviews, trustPilotReviews },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <></>;
}

export default App;
