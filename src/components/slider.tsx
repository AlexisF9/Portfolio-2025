"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

export function Slider({ pictures }: { pictures: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div>
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
              <Image
                className="w-full aspect-[4/2] object-cover"
                src={el}
                width={600}
                height={500}
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex items-center justify-between pt-4">
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
        <div className="flex items-center dark:text-white">
          <button className="custom-prev cursor-pointer">
            <ChevronLeft className="w-[30px] h-auto" />
          </button>
          <button className="custom-next cursor-pointer">
            <ChevronRight className="w-[30px] h-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
