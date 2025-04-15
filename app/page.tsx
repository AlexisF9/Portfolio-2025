import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="h-dvh flex justify-center items-center">
        <Image
          src={"/Alexis.jpg"}
          width={400}
          height={600}
          alt=""
          className="rounded-full absolute aspect-[2/3] w-auto h-[400px] sm:h-[500px] md:h-[600px] max-h-dvh object-cover z-[-1] p-4"
        />
        <div className="flex flex-col dark:text-white w-full gap-9 md:gap-4 h-[440px] sm:h-[540px] md:h-[640px] max-h-dvh justify-between">
          <h1 className="font-gothic text-5xl sm:text-7xl md:text-8xl uppercase flex flex-col items-center text-white mix-blend-difference">
            <span className="self-start">Alexis</span>
            <span className="self-end">Flacher</span>
          </h1>
          <h2 className="text-xl text-center">Développeur Front-end</h2>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-gothic dark:text-white">Qui suis-je ?</h3>
          <p className="dark:text-white">
            Je suis Alexis, j'ai 23 ans je suis développeur front-end depuis
            2022
          </p>
        </div>
      </div>
    </div>
  );
}
