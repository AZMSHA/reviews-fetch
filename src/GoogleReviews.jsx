import { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import Review from "./components/Review";

function App() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const googleReviewsUrl =
        "/wp-content/uploads/react_reviews/google-reviews.json";

      try {
        const googleRes = await fetch(googleReviewsUrl);

        const googleReviews = await googleRes.json();

        setReviews(googleReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    //should remove the outer container wrapper as im already using e-con on the wordpress site and wont need bootstrap
    <>
      {reviews.length === 0 ? null : (
        <Carousel
          options={{
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
              slideShadows: false,
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
          }}
          className="google-reviews-carousel"
        >
          {reviews.map((review) => {
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
      )}
    </>
  );
}

export default App;
