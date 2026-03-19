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

// Swiper Styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ImageGallery({ apartment }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // --- DATA FIX: Ensure images is an array and add the backend URL ---
  const images = (() => {
    try {
      const rawImages =
        typeof apartment.images === "string"
          ? JSON.parse(apartment.images)
          : apartment.images;

      const imagesArray = Array.isArray(rawImages) ? rawImages : [];

      // Map filenames to full URLs (assuming your backend is on port 5000)
      return imagesArray.map((img) =>
        img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`,
      );
    } catch {
      return ["/placeholder.jpg"]; // Fallback if parsing fails
    }
  })();

  if (images.length === 0)
    return <div className="h-[500px] bg-slate-200 rounded-3xl animate-pulse" />;

  return (
    <>
      {/* Main Large Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#9fcb5a",
          "--swiper-pagination-bullet-inactive-color": "#5c5c5c",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={{ clickable: true }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="h-[500px] rounded-3xl overflow-hidden shadow-xl mb-4"
      >
        {images.map((imgUrl, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={imgUrl}
              className="w-full h-full object-cover"
              alt={`${apartment.title} - view ${idx + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        scrollbar={{ draggable: true }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className="h-24"
        breakpoints={{
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {images.map((imgUrl, idx) => (
          <SwiperSlide
            key={idx}
            className="rounded-xl overflow-hidden border-2 border-transparent cursor-pointer transition-all active:scale-95"
          >
            <img
              src={imgUrl}
              className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity [.swiper-slide-thumb-active_&]:opacity-100 [.swiper-slide-thumb-active_&]:border-primary"
              alt="thumbnail"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
