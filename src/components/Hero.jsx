import "../assets/styles/index.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center h-screen w-screen pt-[20px] px-5 md:px-20">
      <div className="flex flex-1 flex-col justify-center pb-[5%] pr-10 xl:pl-10">
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
            <button className="inline-flex items-center rounded-full bg-blue px-5 py-2 text-background text-lg font-medium shadow-lg hover:bg-gold hover:text-blue">
              <span>Get Started</span>
              <img src="click.png" className="w-8 pl-2" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex md:flex-1 justify-center fade-down xl:mr-10">
        <img
          className="border-2 border-gold rounded-lg shadow-lg h-[70%] sm:h-[60%] md:h-auto md:w-full xl:w-5/6"
          src="/hero.jpg"
          alt="image of SJSU"
        />
      </div>
    </main>
  );
};

export default Hero;
