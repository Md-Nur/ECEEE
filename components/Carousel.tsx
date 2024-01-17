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
      title: "ECEEE",
      slogan: "Electronics Club of Electrical & Electronic Engineering",
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
            className="flex flex-col w-screen h-[100vw] max-h-[600px] items-center justify-center p-5"
            key={index}
            style={{
              backgroundImage: `url('/fadebg.png'),url(${item.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-4xl md:text-8xl text-white font-bold">
              {item.title}
            </h1>
            <p className="text-center md:text-xl my-5 text-white">{item.slogan}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
