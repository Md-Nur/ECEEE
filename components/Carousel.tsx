"use client";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  const [carousel, setCarousel] = useState([
    {
      title: "ECEEE",
      slogan: "Electronics Club of Electrical & Electronic Engineering",
      image:
        "https://www.ru.ac.bd/eee/wp-content/uploads/sites/79/2023/12/20230824_123927-scaled.jpg",
    },
    {
      title: "Electronics Club",
      slogan: "Electrical & Electronic Engineering",
      image:
        "https://www.ru.ac.bd/eee/wp-content/uploads/sites/79/2023/12/IMG-20230911-WA0001.jpg",
    },
    {
      title: "ECEEE",
      slogan: "Electronics Club of Electrical & Electronic Engineering",
      image:
        "https://www.ru.ac.bd/eee/wp-content/uploads/sites/79/2023/12/53795388_341085076521395_7964072988419031040_n-scaled.jpg",
    },
  ]);

  useEffect(() => {
    fetch("/api/carousel")
      .then((res) => res.json())
      .then((jdata) => {
        if (jdata?.statusCode < 400) setCarousel(jdata.data);
      });
  }, []);
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      pagination={{ clickable: true }}
      navigation
      spaceBetween={50}
      slidesPerView={1}
      autoplay
      loop={true}
    >
      {carousel.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">{item.title}</h1>
                <p className="mb-5">{item.slogan}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
