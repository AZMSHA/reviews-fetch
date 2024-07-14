import { useState, useEffect, useRef } from "react";
import Carousel from "./Carousel";
import Review from "./Review";

function TrustpilotReviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const trustpilotReviewsUrl =
        "/wp-content/uploads/react_reviews/trustpilot-reviews.json";

      try {
        const trustpilotRes = await fetch(trustpilotReviewsUrl);

        const trustpilotReviews = await trustpilotRes.json();

        setReviews(trustpilotReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = useRef({
    slidesPerView: 1,
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
      scale: 0.85,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      575: { slidesPerView: 2 },
    },
  });

  return (
    <>
      {reviews.length === 0 ? null : (
        <Carousel
          options={options.current}
          className="trustpilot-reviews-carousel"
        >
          {reviews.map((review) => {
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
      )}
    </>
  );
}

export default TrustpilotReviews;
