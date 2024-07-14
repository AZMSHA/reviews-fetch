import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export default function Carousel({ children, options, className }) {
  useEffect(() => {
    const swiper = new Swiper(`.swiper.${className}`, {
      ...options,

      pagination: {
        el: `.${className}-pagination`,
      },
      navigation: {
        nextEl: `.${className}-button-next`,
        prevEl: `.${className}-button-prev`,
      },
    });

    return () => swiper.destroy();
  }, [className, options]);

  return (
    <div className={`swiper ${className}`}>
      <div className="swiper-wrapper">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <div className="swiper-slide" key={index}>
                {child}
              </div>
            );
          }
        })}
      </div>
      {options?.pagination ? (
        <div className={`${className}-pagination`}></div>
      ) : null}

      {options?.navigation ? (
        <div className={`${className}-arrows`}>
          <div className={`${className}-button-next`}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className={`${className}-button-prev`}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
}
