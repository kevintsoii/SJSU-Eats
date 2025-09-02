import "../assets/styles/index.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="flex flex-col sm:flex-col-reverse md:flex-row items-center justify-center text-center md:text-left min-h-screen min-w-screen pt-20 px-5 md:px-20 pb-16 md:pb-0">
      <div className="flex flex-col flex-1 justify-center md:pb-[5%] md:pr-10 xl:pl-10">
        <h1 className="text-5xl lg:text-6xl font-bold">
          <span className="text-blue">Discover</span> your next meal at SJSU
        </h1>

        <h2 className="text-xl lg:text-3xl mt-7">
          View upcoming <span className="text-blue font-medium">menus</span>,
          search for your{" "}
          <span className="text-blue font-medium">favorite foods</span>, and
          track{" "}
          <span className="text-blue font-medium">essential nutrients</span>
        </h2>

        <div className="mt-12">
          <Link to="/menu">
            <button className="inline-flex items-center rounded-full bg-blue shadow-lg text-background text-lg font-medium px-5 py-2 hover:bg-gold hover:text-blue">
              <span>Get Started</span>
              <img src="/click.png" className="w-8 pl-2" />
            </button>
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex flex-1 items-center justify-center xl:mr-10 fade-down">
        <img
          className="border-2 border-gold rounded-lg shadow-lg sm:w-[60%] md:h-auto md:w-[90%]"
          src="/hero.jpg"
          alt="image of SJSU"
        />
      </div>
    </main>
  );
};

export default Hero;
