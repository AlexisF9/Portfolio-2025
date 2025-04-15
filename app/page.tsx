import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <h3 className="text-xl md:text-2xl font-gothic dark:text-white">
            Qui suis-je ?
          </h3>
          <p className="dark:text-white">
            Je suis Alexis, j&apos;ai 23 ans et je suis développeur front-end
            depuis 2022. J&apos;ai tout d&apos;abord fait un{" "}
            <span className="font-bold">DUT MMI</span> (Métiers du Multimédia et
            de l&apos;Internet) à Grenoble en 2 ans. A la fin de ce DUT
            j&apos;ai réalisé un stage en tant qu&apos;intégrateur web et
            webdesigner dans l&apos;agence{" "}
            <span className="font-bold">6tematik</span>. Puis je me suis
            spécialisé dans le développement web en faisant la troisième année
            du <span className="font-bold">Bachelor Développeur Web</span> à
            l&apos;école <span className="font-bold">Hetic</span> à Paris, en
            alternance en tant que développeur front-end dans l&apos;agence de
            pub <span className="font-bold">TBWA\Paris</span>.
          </p>
          <p className="dark:text-white">
            À la fin de mes études, j&apos;ai intégré en CDI l&apos;agence{" "}
            <span className="font-bold">Ascanio</span> à Meylan durant 2 mois
            comme développeur front-end{" "}
            <span className="text-react font-bold">React</span>, puis
            l&apos;agence <span className="font-bold">Big Boss Studio</span> en
            full remote durant 1 an comme développeur front-end{" "}
            <span className="text-react font-bold">React</span> et{" "}
            <span className="font-bold">Next</span>. Enfin j&apos;ai intégré
            l&apos;agence <span className="font-bold">Mezcalito</span> à
            Grenoble durant 1 an comme intégrateur web.
          </p>
        </div>

        <div className="flex flex-col md:flex-row mt-9 items-center gap-4 justify-center">
          <Link
            className="block font-gothic w-fit border border-transparent rounded-full py-2 px-4 bg-linear-to-r hover:from-transparent hover:to-transparent hover:dark:text-white hover:border-neutral-600 hover:dark:border-white from-react to-vue transition duration-300 ease-in-out"
            href={"./alexis-flacher-cv.pdf"}
            target="_blank"
          >
            Télécharger mon CV
          </Link>
          <div className="flex gap-4">
            <Link
              className="block font-gothic w-fit border border-neutral-600 rounded-full p-2 dark:text-white dark:border-white"
              href={"https://www.linkedin.com/in/alexis-flacher-772ba7197/"}
            >
              <Linkedin />
            </Link>
            <Link
              className="block font-gothic w-fit border border-neutral-600 rounded-full p-2 dark:text-white dark:border-white"
              href={"https://github.com/AlexisF9"}
            >
              <Github />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
