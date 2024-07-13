import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  EffectCards,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";

export default function Carousel({ children, options, className }) {
  return (
    <Swiper
      {...{
        modules: [
          Navigation,
          Pagination,
          EffectCoverflow,
          EffectCards,
          Autoplay,
        ],
        ...options,
        pagination: {
          el: `.${className}-pagination`,
        },
        navigation: {
          nextEl: `.${className}-button-next`,
          prevEl: `.${className}-button-prev`,
        },
      }}
      className={`swiper ${className}`}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <SwiperSlide className="swiper-slide" key={index}>
              {child}
            </SwiperSlide>
          );
        }
      })}
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
    </Swiper>
  );
}
