import { useState, useEffect, useRef } from "react";
import Carousel from "./Carousel";
import Review from "./Review";

function AZReviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const azReviewsUrl = "/wp-content/uploads/react_reviews/az-reviews.json";

      try {
        const azRes = await fetch(azReviewsUrl);

        const azReviews = await azRes.json();

        setReviews(azReviews);
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
      {reviews.length > 0 && (
        <Carousel options={options.current} className="az-reviews-carousel">
          {reviews.map((review) => (
            <Review key={review.review_id} review_origin={"az"} {...review} />
          ))}
        </Carousel>
      )}
    </>
  );
}

export default AZReviews;
