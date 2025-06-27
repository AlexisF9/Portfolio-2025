"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

export function Slider({ pictures }: { pictures: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="relative">
      <div className="shadow-lg">
        <Swiper
          slidesPerView={1}
          modules={[Navigation]}
          loop={true}
          navigation={{
            nextEl: `.custom-next`,
            prevEl: `.custom-prev`,
          }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        >
          {pictures.map((el: string, index) => {
            return (
              <SwiperSlide key={index}>
                <img className="w-full" src={el} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex items-center justify-between pt-4">
        {pictures.length > 1 && (
          <div className="flex gap-2">
            {pictures.map((_, index) => {
              return (
                <span
                  key={index}
                  className={`${
                    currentSlide === index + 1
                      ? "bg-neutral-600 dark:bg-white"
                      : "bg-transparent"
                  } block border border-neutral-600 dark:border-white w-[10px] aspect-square rounded-full`}
                ></span>
              );
            })}
          </div>
        )}

        <div className="dark:text-white">
          <button className="custom-prev absolute z-1 top-[50%] -translate-y-[50%] left-2 md:left-4 cursor-pointer bg-neutral-200 dark:bg-neutral-600 rounded-full p-2">
            <ChevronLeft className="w-[20px] md:w-[30px] h-auto" />
          </button>
          <button className="custom-next absolute z-1 top-[50%] -translate-y-[50%] right-2 md:right-4 cursor-pointer bg-neutral-200 dark:bg-neutral-600 rounded-full p-2">
            <ChevronRight className="w-[20px] md:w-[30px] h-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
