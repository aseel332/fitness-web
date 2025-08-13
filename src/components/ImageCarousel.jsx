// ImageCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/weight1.jpg",
  "/weight2.jpg",
  "/weight3.jpg",
  "/weight4.jpg",
  "/weight5.jpg",
  "/weight6.jpg",
  "/weight8.jpg",
];

const cardio =[
  "/cardio1.jpg",
  "/cardio2.jpg",
  "/cardio3.jpg",
  "/cardio4.jpg",
  "/cardio5.jpg",
  "/cardio6.jpg",
  "/cardio7.jpg",

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
              className="w-full h-full md:max-h-[320px]  object-center object-cover my-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
