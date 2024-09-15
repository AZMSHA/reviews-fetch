export default function Review({
  review_origin,
  review_title,
  review_id,
  review_link,
  author_title,
  review_text,
  review_rating,
}) {
  const ratingStars = [];

  for (let ratingCount = 1; ratingCount <= 5; ratingCount++) {
    if (ratingCount <= review_rating) {
      ratingStars.push(
        <i
          key={ratingCount}
          className="fa-sharp fa-solid fa-star-sharp full"
        ></i>
      );
    } else {
      ratingStars.push(
        <i
          key={ratingCount}
          className="fa-sharp fa-solid fa-star-sharp not-full"
        ></i>
      );
    }
  }
  return (
    <article className={`${review_origin}-review`}>
      <h4 className="author_title review-link">
        <a
          href={
            review_link || `https://www.trustpilot.com/reviews/${review_id}`
          }
        >
          {author_title}
        </a>
      </h4>
      <span className="review_rating">{ratingStars}</span>
      {review_title && (
        <h6 className="review_title review-link">
          {" "}
          <a
            href={
              review_link || `https://www.trustpilot.com/reviews/${review_id}`
            }
          >
            {review_title}
          </a>
        </h6>
      )}
      <p className="review_text">{review_text}</p>
    </article>
  );
}
