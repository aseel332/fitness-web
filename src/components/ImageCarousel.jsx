// ImageCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/gym_1.png",
  "/gym_2.png",
  "/gym_3.png",
];

const cardio =[
  "/gym_1.png",
  "/gym_2.png",
  "/gym_3.png",
];

export default function ImageCarousel({type}) {
  function getImages(){
    if(type === "gym"){
      return images;
    } else if(type === "cardio"){
      return cardio;
    }
  }
  return (
    <div className="h-[80%] md:h-[60%] w-full bg-neutral-300 rounded-t-xl overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        autoplay
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {getImages().map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
