import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

export function Card({
  card,
}: {
  card: {
    id: number;
    title: string;
    pictures: string[];
    shortDescription: string;
  };
}) {
  return (
    <div className="relative">
      <div className="rounded-2xl shadow-lg overflow-hidden">
        <Image
          className="w-full aspect-[4/2] object-cover"
          src={card.pictures[0]}
          width={400}
          height={300}
          alt=""
        />
      </div>

      {/* 
      <Swiper
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            nextEl: `.custom-next-${card.id}`,
            prevEl: `.custom-prev-${card.id}`,
          }}
        >
          {card.pictures.map((el: string) => {
            return (
              <SwiperSlide>
                <Image
                  className="w-full aspect-[4/2] object-cover"
                  src={el}
                  width={400}
                  height={300}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      <div>
              <button className={`custom-prev-${card.id} cursor-pointer`}>
                <ChevronLeft />
              </button>
              <button className={`custom-next-${card.id} cursor-pointer`}>
                <ChevronRight />
              </button>
            </div>
      
      */}

      <div className="flex flex-col mt-4 gap-2 dark:text-white">
        <h2 className="text-lg font-bold">{card.title}</h2>
        <p className="text-sm">{card.shortDescription}</p>
        <Link
          href={"#"}
          className="font-gothic text-sm w-fit flex items-center gap-2"
        >
          En savoir plus <MoveRight />
        </Link>
      </div>
    </div>
  );
}
