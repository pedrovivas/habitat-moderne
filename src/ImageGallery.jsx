import { useState } from "react";
import styles from "./ImageGallery.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Thumbs,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ImageGallery({ apartment }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/* Main Large Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#9fcb5a",
          "--swiper-pagination-bullet-inactive-color": "#5c5c5c",
          "--swiper-pagination-bullet-size": "10px",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={{ clickable: true }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className={`${styles.galleryContainer} h-[500px] rounded-3xl overflow-hidden shadow-xl`}
      >
        {apartment.images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              className="w-full h-full object-cover"
              alt={apartment.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <Swiper
        style={{
          "--swiper-scrollbar-bg-color": "rgba(0, 0, 0, 0.05)",
          "--swiper-scrollbar-drag-bg-color": "#9fcb5a",
          "--swiper-scrollbar-size": "4px",
        }}
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        scrollbar={{ draggable: true }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className="h-28 pb-5"
        breakpoints={{
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {apartment.images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className="rounded-xl overflow-hidden border-2 border-transparent cursor-pointer [.swiper-slide-thumb-active_&]:border-primary"
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt="thumbnail"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
