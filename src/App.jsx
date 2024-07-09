import { useReducer, useEffect } from "react";
import "./App.scss";
import Carousel from "./components/Carousel";
import Review from "./components/Review";

function reducer(state, action) {
  switch (action.type) {
    case "setGoogleReviews":
      return { ...state, googleReviews: action.payload };
    case "setTrustPilotReviews":
      return { ...state, trustpilotReviews: action.payload };
    case "setBoth":
      return {
        ...state,
        googleReviews: action.payload.googleReviews,
        trustpilotReviews: action.payload.trustpilotReviews,
      };
    default:
      throw new Error();
  }
}

function App() {
  const [reviews, setReviews] = useReducer(reducer, {
    googleReviews: [],
    trustpilotReviews: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const googleReviewsUrl = "/google-reviews.json";
      const trustpilotReviewsUrl = "/trustpilot-reviews.json";

      try {
        const [googleRes, trustpilotRes] = await Promise.all([
          fetch(googleReviewsUrl),
          fetch(trustpilotReviewsUrl),
        ]);

        const googleReviews = await googleRes.json();
        const trustpilotReviews = await trustpilotRes.json();

        setReviews({
          type: "setBoth",
          payload: { googleReviews, trustpilotReviews },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    //should remove the outer container wrapper as im already using e-con on the wordpress site and wont need bootstrap
    <>
      <section className="container py-5">
        <Carousel
          options={{
            slidesPerView: 4,
            centeredSlides: true,
            loop: true,
            autoplay: {
              pauseOnMouseEnter: true,
              delay: 1500,
            },
            speed: 1000,
            effect: "coverflow",
            coverflowEffect: {
              modifier: 0.5,
              depth: 500,
              rotate: 45,
              slideShadows: true,
            },
          }}
          className="google-reviews-carousel"
        >
          {reviews.googleReviews.map((review) => {
            if (review.review_rating < 4 || review.review_text === null) {
              return null;
            } else
              return (
                <Review
                  key={review.review_id}
                  review_origin={"google"}
                  {...review}
                />
              );
          })}
        </Carousel>
      </section>
      <section className="container py-5">
        <Carousel
          options={{
            slidesPerView: 4,
            centeredSlides: true,
            loop: true,
            autoplay: {
              pauseOnMouseEnter: true,
              delay: 1500,
            },
            speed: 1000,
            effect: "coverflow",
            coverflowEffect: {
              modifier: 0.5,
              depth: 500,
              rotate: 45,
              slideShadows: false,
            },
          }}
          className="trustpilot-reviews-carousel"
        >
          {reviews.trustpilotReviews.map((review) => {
            if (review.review_rating < 4 || review.review_text === null) {
              return null;
            } else
              return (
                <Review
                  key={review.review_id}
                  review_origin={"trustpilot"}
                  {...review}
                />
              );
          })}
        </Carousel>
      </section>
    </>
  );
}

export default App;
